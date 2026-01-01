#!/usr/bin/env python3
"""
Project Updater for TetraZero Portfolio
Automatically fetches GitHub repos and updates the portfolio projects
"""

import os
import requests
import json
import sqlite3
import time
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
# OPENROUTER_MODEL = "tngtech/deepseek-r1t2-chimera:free"  # Change this to your preferred model
OPENROUTER_MODEL = "xiaomi/mimo-v2-flash:free"
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

# Cache settings
CACHE_DB = "cache.db"
CACHE_TTL = 86400  # 24 hours

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

MAX_REPOS = 50

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

def update_projects_json(repos, pinned_repos=[]):
    """Update the projects.json file with new projects"""
    projects = []
    
    # Initialize with existing tags
    all_tags = set(get_existing_tags())
    print(f"Loaded {len(all_tags)} existing tags.")

    for i, repo in enumerate(repos[:MAX_REPOS]):  # Top MAX_REPOS repos
        print(f"Processing {i+1}/{MAX_REPOS}: {repo['name']} - Generating descriptions...")
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
    username = "WiredMind2"
    print(f"Fetching repositories for {username}...")

    repos = fetch_github_repos(username)
    if not repos:
        print("No repositories found")
        return

    print(f"Found {len(repos)} repositories")

    # Filter public repos
    public_repos = [r for r in repos if not r.get('private', False)]
    print(f"Using {len(public_repos)} public repositories")

    pinned_repos = fetch_pinned_repos(username)
    update_projects_json(public_repos, pinned_repos)

    print("Portfolio update complete!")

if __name__ == "__main__":
    main()