#!/usr/bin/env python3
"""
Project Updater for TetraZero Portfolio
Automatically fetches GitHub repos and updates the portfolio projects
"""

import os
import sys
import requests
import json
import sqlite3
import time
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
# OPENROUTER_MODEL = "tngtech/deepseek-r1t2-chimera:free"  # Change this to your preferred model
OPENROUTER_MODEL = "tngtech/deepseek-r1t2-chimera:free"
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

# Cache settings
CACHE_DB = "cache.db"
CACHE_TTL = 86400  # 24 hours
MAX_REPOS = 70

def init_db():
    """Initialize the SQLite cache database"""
    conn = sqlite3.connect(CACHE_DB)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS cache
                 (key TEXT PRIMARY KEY, value TEXT, timestamp REAL)''')
    conn.commit()
    conn.close()

def get_from_cache(key):
    """Retrieve value from cache if it exists and hasn't expired"""
    try:
        conn = sqlite3.connect(CACHE_DB)
        c = conn.cursor()
        c.execute("SELECT value, timestamp FROM cache WHERE key=?", (key,))
        row = c.fetchone()
        conn.close()
        
        if row:
            value, timestamp = row
            if time.time() - timestamp < CACHE_TTL:
                return json.loads(value)
    except Exception as e:
        print(f"Cache read error: {e}")
    return None

def save_to_cache(key, value):
    """Save value to cache with current timestamp"""
    try:
        conn = sqlite3.connect(CACHE_DB)
        c = conn.cursor()
        c.execute("INSERT OR REPLACE INTO cache (key, value, timestamp) VALUES (?, ?, ?)",
                  (key, json.dumps(value), time.time()))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Cache write error: {e}")


def fetch_github_repos(username):
    """Fetch public repositories from GitHub API"""
    cache_key = f"repos_{username}"
    cached = get_from_cache(cache_key)
    if cached:
        print(f"Using cached repos for {username}")
        return cached

    url = f"https://api.github.com/users/{username}/repos"
    params = {
        'sort': 'updated',
        'direction': 'desc',
        'per_page': 30  # Get top 30 most recent
    }
    headers = {"Authorization": f"token {GITHUB_TOKEN}"} if GITHUB_TOKEN else {}

    response = requests.get(url, params=params, headers=headers)
    if response.status_code == 200:
        data = response.json()
        save_to_cache(cache_key, data)
        return data
    else:
        print(f"Error fetching repos: {response.status_code}")
        return []

def fetch_contributed_repos(username):
    """Fetch repositories the user has contributed to (via PRs) excluding their own"""
    cache_key = f"contributed_repos_{username}"
    cached = get_from_cache(cache_key)
    if cached:
        print(f"Using cached contributed repos for {username}")
        return cached

    print(f"Searching for contributed repositories for {username}...")
    url = "https://api.github.com/search/issues"
    # Search for PRs authored by user, excluding user's own repos
    # We use type:pr to find pull requests, and -user:{username} to exclude repos owned by the user
    query = f"type:pr author:{username} -user:{username}"
    params = {
        'q': query,
        'sort': 'updated',
        'order': 'desc',
        'per_page': 50  # Check last 50 PRs to find repositories
    }
    headers = {"Authorization": f"token {GITHUB_TOKEN}"} if GITHUB_TOKEN else {}

    try:
        response = requests.get(url, params=params, headers=headers)
        if response.status_code == 200:
            data = response.json()
            items = data.get('items', [])
            
            repo_urls = set()
            for item in items:
                # The search result provides the repository API URL
                repo_urls.add(item['repository_url'])
            
            repos = []
            print(f"Found {len(repo_urls)} external repositories with contributions")
            
            for r_url in repo_urls:
                try:
                    # Fetch repo details needed for the portfolio
                    r_res = requests.get(r_url, headers=headers)
                    if r_res.status_code == 200:
                        repo_data = r_res.json()
                        # Only include if public
                        if not repo_data.get('private', False):
                            repos.append(repo_data)
                    else:
                        print(f"Failed to fetch repo details for {r_url}: {r_res.status_code}")
                except Exception as e:
                    print(f"Error fetching repo {r_url}: {e}")
            
            save_to_cache(cache_key, repos)
            return repos
        else:
            print(f"Error searching contributed repos: {response.status_code} - {response.text}")
            return []
    except Exception as e:
        print(f"Error in fetch_contributed_repos: {e}")
        return []

def fetch_readme(owner, repo):
    """Fetch README content from GitHub API"""
    cache_key = f"readme_{owner}_{repo}"
    cached = get_from_cache(cache_key)
    if cached:
        return cached

    url = f"https://api.github.com/repos/{owner}/{repo}/readme"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"} if GITHUB_TOKEN else {}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        import base64
        content = base64.b64decode(data['content']).decode('utf-8')
        save_to_cache(cache_key, content)
        return content
    else:
        print(f"Error fetching README for {owner}/{repo}: {response.status_code}")
        raise FileNotFoundError

def generate_description(repo):
    """Generate a description for the repo using OpenRouter"""
    cache_key = f"desc_{repo['name']}"
    cached = get_from_cache(cache_key)
    if cached:
        return cached

    readme = fetch_readme(repo['owner']['login'], repo['name'])

    try:
        prompt = f"Generate a very concise one-sentence description for the GitHub repository '{repo['name']}' written in {repo['language'] or 'various languages'}. Original description: {repo.get('description', 'No description provided')}. README content: {readme[:500]}. Output only the description text, without any introductory phrases or additional commentary."
        headers = {"Authorization": f"Bearer {OPENROUTER_API_KEY}"}
        response = requests.post(OPENROUTER_URL, json={
            'model': OPENROUTER_MODEL,
            'messages': [{'role': 'user', 'content': prompt}]
        }, headers=headers, timeout=30)
        if response.status_code == 200:
            result = response.json()
            desc = result['choices'][0]['message']['content'].strip()
            if desc:
                if desc[0] == desc[-1] and desc[0] in ["'", '"']:
                    # Remove quotes
                    desc = desc[1:-1]
                save_to_cache(cache_key, desc)
                return 
        else:
            print(f"OpenRouter error: {response.status_code} - {response.text}")
            raise Exception("OpenRouter API error")
    except Exception as e:
        print(f"Error generating description with OpenRouter: {e}")
        raise

    raise Exception("Failed to generate description")

def generate_long_description(repo):
    """Generate a longer description using OpenRouter"""
    cache_key = f"long_desc_{repo['name']}"
    cached = get_from_cache(cache_key)
    if cached:
        return cached

    readme = fetch_readme(repo['owner']['login'], repo['name'])

    try:
        prompt = f"Generate a detailed description (2-3 sentences) for a GitHub repository named '{repo['name']}' written in {repo['language'] or 'various languages'}. Original description: {repo.get('description', 'No description provided')}. README content: {readme[:2000]}. Include key features and purpose. Output only the description text, without any introductory phrases or additional commentary."
        headers = {"Authorization": f"Bearer {OPENROUTER_API_KEY}"}
        response = requests.post(OPENROUTER_URL, json={
            'model': OPENROUTER_MODEL,
            'messages': [{'role': 'user', 'content': prompt}]
        }, headers=headers, timeout=30)
        if response.status_code == 200:
            result = response.json()
            desc = result['choices'][0]['message']['content'].strip()
            if desc:
                if desc[0] == desc[-1] and desc[0] in ["'", '"']:
                    # Remove quotes
                    desc = desc[1:-1]
                save_to_cache(cache_key, desc)
                return desc
        else:
            print(f"OpenRouter error: {response.status_code} - {response.text}")
            raise Exception("OpenRouter API error")
    except Exception as e:
        print(f"Error generating long description with OpenRouter: {e}")
        raise

    raise Exception("Failed to generate long description")

def get_existing_tags():
    """Read existing tags from projects.json"""
    try:
        if os.path.exists('src/projects.json'):
            with open('src/projects.json', 'r', encoding='utf-8') as f:
                projects = json.load(f)
                tags = set()
                for project in projects:
                    if 'techStack' in project:
                        tags.update(project['techStack'])
                return list(tags)
    except Exception as e:
        print(f"Error reading existing tags: {e}")
    return []

def generate_tags(repo, existing_tags=None):
    """Generate tags for the repo using OpenRouter"""
    cache_key = f"tags_{repo['name']}"
    cached = get_from_cache(cache_key)
    if cached:
        return cached

    readme = fetch_readme(repo['owner']['login'], repo['name'])
    
    existing_tags_str = ", ".join(existing_tags) if existing_tags else "None"

    try:
        prompt = f"Generate a list of 3-5 technical tags (e.g., React, Python, Machine Learning) for a GitHub repository named '{repo['name']}' written in {repo['language'] or 'various languages'}. README content: {readme[:2000]}. \n\nExisting tags in the system: {existing_tags_str}.\n\nPlease prioritize using existing tags if they are relevant. If the existing tags are not sufficient, create new ones. Output only the tags as a comma-separated list, no other text."
        headers = {"Authorization": f"Bearer {OPENROUTER_API_KEY}"}
        response = requests.post(OPENROUTER_URL, json={
            'model': OPENROUTER_MODEL,
            'messages': [{'role': 'user', 'content': prompt}]
        }, headers=headers, timeout=30)
        if response.status_code == 200:
            result = response.json()
            content = result['choices'][0]['message']['content'].strip()
            # Clean up and split
            tags = [tag.strip() for tag in content.split(',') if tag.strip()]
            # Ensure the main language is included
            if repo['language'] and repo['language'] not in tags:
                tags.insert(0, repo['language'])
            
            if tags:
                save_to_cache(cache_key, tags)
                return tags
        else:
            print(f"OpenRouter error: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Error generating tags with OpenRouter: {e}")
    
    # Fallback
    tags = [repo['language']] if repo['language'] else ['Various']
    save_to_cache(cache_key, tags)
    return tags

def get_category(language):
    """Map language to category"""
    web_langs = ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'PHP']
    if language in web_langs:
        return 'web'
    elif language in ['Python', 'Java', 'C#', 'Go', 'Rust']:
        return 'fullstack'
    else:
        return 'other'

def get_color(index):
    """Get color for project image"""
    colors = [
        (52, 152, 219),   # Blue
        (46, 204, 113),   # Green
        (155, 89, 182),   # Purple
        (230, 126, 34),   # Orange
        (231, 76, 60),    # Red
        (44, 62, 80)      # Dark Blue
    ]
    return colors[index % len(colors)]

def fetch_pinned_repos(username):
    """Fetch pinned repositories using GraphQL"""
    if not GITHUB_TOKEN:
        print("GITHUB_TOKEN not found, cannot fetch pinned repos.")
        return []
    
    cache_key = f"pinned_{username}"
    cached = get_from_cache(cache_key)
    if cached:
        return cached

    url = "https://api.github.com/graphql"
    query = """
    query {
      user(login: "%s") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
            }
          }
        }
      }
    }
    """ % username
    
    headers = {"Authorization": f"bearer {GITHUB_TOKEN}"}
    
    try:
        response = requests.post(url, json={'query': query}, headers=headers)
        if response.status_code == 200:
            data = response.json()
            pinned_nodes = data.get('data', {}).get('user', {}).get('pinnedItems', {}).get('nodes', [])
            pinned_names = [node['name'] for node in pinned_nodes if node]
            save_to_cache(cache_key, pinned_names)
            return pinned_names
        else:
            print(f"Error fetching pinned repos: {response.status_code}")
            return []
    except Exception as e:
        print(f"Error fetching pinned repos: {e}")
        return []

def update_projects_json(repos, pinned_repos=[], skip_existing=False):
    """Update the projects.json file with new projects"""
    projects = []
    existing_projects_map = {}

    # Load existing projects if skipping logic is enabled or just to preserve order/tags
    try:
        if os.path.exists('src/projects.json'):
            with open('src/projects.json', 'r', encoding='utf-8') as f:
                existing_data = json.load(f)
                for p in existing_data:
                    if 'githubUrl' in p:
                        existing_projects_map[p['githubUrl']] = p
    except Exception as e:
        print(f"Error reading existing projects: {e}")
    
    # Initialize with existing tags
    all_tags = set(get_existing_tags())
    print(f"Loaded {len(all_tags)} existing tags.")

    for i, repo in enumerate(repos[:MAX_REPOS]):  # Top MAX_REPOS repos
        print(f"Processing {i+1}/{MAX_REPOS}: {repo['name']}...")
        
        # Check if project exists
        existing_project = existing_projects_map.get(repo['html_url'])

        # Check for ignore flag in existing project
        if existing_project and existing_project.get('ignore') is True:
            print(f"Preserving ignored project: {repo['name']}")
            # Keep the existing data exactly as is, just update ID if needed to maintain order
            existing_project['id'] = i + 1
            projects.append(existing_project)
            # Add its tags to the pool to prevent them from looking like "new" tags if used elsewhere
            if 'techStack' in existing_project:
                all_tags.update(existing_project['techStack'])
            continue

        # Check if project exists and we should skip reprocessing
        if skip_existing and existing_project:
            print(f"Skipping update for existing project: {repo['name']}")
            project = existing_project
            # Optional: Ensure ID is updated to match current sort order if desired, 
            # or keep original ID. Here we align ID with current list position.
            project['id'] = i + 1
            # Still update featured status based on current pins
            project['featured'] = repo['name'] in pinned_repos
            projects.append(project)
            continue

        print(f"Generating data for {repo['name']}...")
        try:
            fetch_readme(repo['owner']['login'], repo['name'])
            
            # Generate tags with awareness of existing tags
            tags = generate_tags(repo, list(all_tags))
            # Update our running list of tags
            all_tags.update(tags)

            project = {
                'id': i + 1,
                'title': repo['name'].replace('-', ' ').title(),
                'description': generate_description(repo),
                'longDescription': generate_long_description(repo),
                'techStack': tags,
                'image': f"/projects/{repo['name'].lower().replace('-', '')}.jpg",
                'githubUrl': repo['html_url'],
                'featured': repo['name'] in pinned_repos,
                'category': get_category(repo['language'])
            }
        except FileNotFoundError:
            # No README found, skip this repo
            print(f"Skipping {repo['name']} due to missing README.")
            continue
        except Exception as e:
            print(f"Skipping {repo['name']} due to: {e}.")
            continue

        projects.append(project)

    # Write to projects.json
    with open('src/projects.json', 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=2)

    print("Updated projects.json")

def main():
    init_db()
    
    skip_existing = "--skip-existing" in sys.argv
    if skip_existing:
        print("Mode: Skipping existing projects in projects.json")

    username = "WiredMind2"
    print(f"Fetching repositories for {username}...")

    own_repos = fetch_github_repos(username) or []
    contributed_repos = fetch_contributed_repos(username) or []
    
    all_repos = own_repos + contributed_repos

    if not all_repos:
        print("No repositories found")
        return

    print(f"Found {len(own_repos)} own repos and {len(contributed_repos)} contributed repos")

    # Combine and deduplicate
    all_repos = own_repos + contributed_repos
    
    # Group by repository name (case-insensitive) to handle forks/duplicates
    repos_by_name = {}
    for r in all_repos:
        # Check if we already processed this specific repo ID (absolute duplicate)
        # But we handle this via the grouping now
        
        name_key = r['name'].lower()
        if name_key not in repos_by_name:
            repos_by_name[name_key] = []
        repos_by_name[name_key].append(r)

    unique_repos = []
    
    for name_key, duplicates in repos_by_name.items():
        if len(duplicates) == 1:
            unique_repos.append(duplicates[0])
        else:
            # Handle duplicates (e.g. fork vs upstream)
            # Strategy:
            # 1. Prefer non-forks (original repos)
            # 2. If fork status same, prefer higher star count
            # 3. If tied, prefer the one owned by 'username'
            
            def sort_key(r):
                is_source = not r.get('fork', False)
                stars = r.get('stargazers_count', 0)
                is_owned = r['owner']['login'].lower() == username.lower()
                return (is_source, stars, is_owned)

            # Sort descending
            duplicates.sort(key=sort_key, reverse=True)
            
            # Pick the winner
            winner = duplicates[0]
            print(f"Duplicate content for '{winner['name']}': Selected {winner['full_name']} over {[d['full_name'] for d in duplicates[1:]]}")
            unique_repos.append(winner)

    # Filter public repos
    public_repos = [r for r in unique_repos if not r.get('private', False)]
    
    # Sort by updated_at descending to mix them naturally
    public_repos.sort(key=lambda x: x.get('updated_at', ''), reverse=True)
    
    print(f"Using {len(public_repos)} total public repositories")

    pinned_repos = fetch_pinned_repos(username)
    update_projects_json(public_repos, pinned_repos, skip_existing)

    print("Portfolio update complete!")

if __name__ == "__main__":
    main()