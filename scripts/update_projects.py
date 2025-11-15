#!/usr/bin/env python3
"""
Project Updater for TetraZero Portfolio
Automatically fetches GitHub repos and updates the portfolio projects
"""

import os
import requests
import json
from datetime import datetime

def fetch_github_repos(username):
    """Fetch public repositories from GitHub API"""
    url = f"https://api.github.com/users/{username}/repos"
    params = {
        'sort': 'updated',
        'direction': 'desc',
        'per_page': 10  # Get top 10 most recent
    }

    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching repos: {response.status_code}")
        return []

def generate_description(repo):
    """Generate a description for the repo"""
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
    """Generate a longer description"""
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

def update_projects_file(repos):
    """Update the Projects.tsx file with new projects"""
    projects = []

    for i, repo in enumerate(repos[:6]):  # Top 6 repos
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

    # Generate the TypeScript code
    projects_code = "const projects: Project[] = [\n"
    for project in projects:
        projects_code += f"""  {{
    id: {project['id']},
    title: '{project['title']}',
    description: '{project['description']}',
    longDescription: '{project['longDescription']}',
    techStack: {project['techStack']},
    image: '{project['image']}',
    githubUrl: '{project['githubUrl']}',
    featured: {str(project['featured']).lower()},
    category: '{project['category']}'
  }},\n"""
    projects_code += "];\n"

    # Read the current file
    with open('src/app/components/Projects.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the projects array
    start_marker = "const projects: Project[] = ["
    end_marker = "];"

    start_idx = content.find(start_marker)
    if start_idx == -1:
        print("Could not find projects array in Projects.tsx")
        return

    # Find the end of the array
    bracket_count = 0
    end_idx = start_idx
    for i in range(start_idx, len(content)):
        if content[i] == '[':
            bracket_count += 1
        elif content[i] == ']':
            bracket_count -= 1
            if bracket_count == 0:
                end_idx = i + 1
                break

    new_content = content[:start_idx] + projects_code + content[end_idx:]

    with open('src/app/components/Projects.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("Updated Projects.tsx")

def update_image_script(repos):
    """Update the image generation script"""
    projects_data = []

    for i, repo in enumerate(repos[:6]):
        filename = f"{repo['name'].lower().replace('-', '')}.jpg"
        title = repo['name'].replace('-', ' ').title()
        tech = [repo['language']] if repo['language'] else ['Various']
        color = get_color(i)

        projects_data.append({
            'filename': filename,
            'title': title,
            'tech': tech,
            'color': color
        })

    # Generate the Python code
    projects_code = "# Project data matching the Projects.tsx component\nprojects = [\n"
    for project in projects_data:
        projects_code += f"""    {{
        'filename': '{project['filename']}',
        'title': '{project['title']}',
        'tech': {project['tech']},
        'color': {project['color']}
    }},\n"""
    projects_code += "]\n"

    # Read the current script
    with open('scripts/generate_project_images.py', 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the projects list
    start_marker = "# Project data matching the Projects.tsx component\nprojects = ["
    end_marker = "]\n"

    start_idx = content.find(start_marker)
    if start_idx == -1:
        print("Could not find projects list in generate_project_images.py")
        return

    end_idx = content.find(end_marker, start_idx) + len(end_marker)

    new_content = content[:start_idx] + projects_code + content[end_idx:]

    with open('scripts/generate_project_images.py', 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("Updated generate_project_images.py")

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

    update_projects_file(public_repos)
    update_image_script(public_repos)

    print("Running image generation...")
    os.system("python scripts/generate_project_images.py")

    print("Portfolio update complete!")

if __name__ == "__main__":
    main()