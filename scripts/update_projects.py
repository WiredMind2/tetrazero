#!/usr/bin/env python3
"""
Project Updater for TetraZero Portfolio
Automatically fetches GitHub repos and updates the portfolio projects
"""

import os
import requests
import json
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
OPENROUTER_MODEL = "tngtech/deepseek-r1t2-chimera:free"  # Change this to your preferred model
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

EXCLUDE_REPOS = []  # Add repository names to exclude from the portfolio

def fetch_github_repos(username):
    """Fetch public repositories from GitHub API"""
    url = f"https://api.github.com/users/{username}/repos"
    params = {
        'sort': 'updated',
        'direction': 'desc',
        'per_page': 30  # Get top 30 most recent
    }

    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching repos: {response.status_code}")
        return []

def fetch_readme(owner, repo):
    """Fetch README content from GitHub API"""
    url = f"https://api.github.com/repos/{owner}/{repo}/readme"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        import base64
        content = base64.b64decode(data['content']).decode('utf-8')
        return content
    else:
        print(f"Error fetching README for {owner}/{repo}: {response.status_code}")
        return ""

def generate_description(repo):
    """Generate a description for the repo using OpenRouter"""
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
                return desc
    except Exception as e:
        print(f"Error generating description with OpenRouter: {e}")
    
    # Fallback to original logic
    if repo.get('description'):
        return repo['description']

    # Fallback descriptions based on name
    name = repo['name'].lower()
    if 'game' in name or 'chess' in name or 'awale' in name:
        return f"A {repo['language']} implementation of the {repo['name'].replace('-', ' ')} game"
    elif 'client' in name or 'api' in name:
        return f"A {repo['language']} client library for {repo['name'].replace('-', ' ')}"
    elif 'tracker' in name or 'manager' in name:
        return f"A {repo['language']} application for managing {repo['name'].replace('-', ' ').lower()}"
    elif 'reader' in name:
        return f"A {repo['language']} application for reading {repo['name'].replace('-', ' ').lower()}"
    else:
        return f"A {repo['language']} project: {repo['name'].replace('-', ' ')}"

def generate_long_description(repo):
    """Generate a longer description using OpenRouter"""
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
                return desc
    except Exception as e:
        print(f"Error generating long description with OpenRouter: {e}")
    
    # Fallback to original logic
    desc = generate_description(repo)
    if repo.get('description'):
        return repo['description']

    # Enhanced descriptions
    name = repo['name'].lower()
    if 'game' in name:
        return f"{desc}. Features strategic gameplay and optimized performance in {repo['language']}."
    elif 'client' in name:
        return f"{desc}. Provides a simple interface for API integration and data handling."
    elif 'tracker' in name:
        return f"{desc}. Helps users track and manage their {repo['name'].replace('-', ' ').lower()} with an intuitive interface."
    elif 'manager' in name:
        return f"{desc}. Comprehensive tool for organizing and managing collections with advanced features."
    elif 'reader' in name:
        return f"{desc}. User-friendly application with features for downloading, organizing, and reading content."
    else:
        return f"{desc}. Developed using {repo['language']} with focus on clean code and functionality."

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

def update_projects_json(repos):
    """Update the projects.json file with new projects"""
    projects = []

    for i, repo in enumerate(repos[:6]):  # Top 6 repos
        print(f"Processing {i+1}/6: {repo['name']} - Generating descriptions...")
        project = {
            'id': i + 1,
            'title': repo['name'].replace('-', ' ').title(),
            'description': generate_description(repo),
            'longDescription': generate_long_description(repo),
            'techStack': [repo['language']] if repo['language'] else ['Various'],
            'image': f"/projects/{repo['name'].lower().replace('-', '')}.jpg",
            'githubUrl': repo['html_url'],
            'featured': repo['stargazers_count'] > 0,
            'category': get_category(repo['language'])
        }
        projects.append(project)

    # Write to projects.json
    with open('src/projects.json', 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=2)

    print("Updated projects.json")

def main():
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

    # Exclude specified repos
    public_repos = [r for r in public_repos if r['name'] not in EXCLUDE_REPOS]
    print(f"After excluding: {len(public_repos)} repositories")

    update_projects_json(public_repos)

    print("Portfolio update complete!")

if __name__ == "__main__":
    main()