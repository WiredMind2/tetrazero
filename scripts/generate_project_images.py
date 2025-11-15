#!/usr/bin/env python3
"""
Project Image Generator for TetraZero Portfolio
Generates professional placeholder images for portfolio projects
"""

import os
from PIL import Image, ImageDraw, ImageFont
import random

# Project data matching the Projects.tsx component
projects = [
    {
        'filename': 'awalegame.jpg',
        'title': 'Awale Game',
        'tech': ['C'],
        'color': (52, 152, 219)
    },
    {
        'filename': 'openrouterclient.jpg',
        'title': 'Openrouterclient',
        'tech': ['Python'],
        'color': (46, 204, 113)
    },
    {
        'filename': 'pldagile.jpg',
        'title': 'Pld Agile',
        'tech': ['Python'],
        'color': (155, 89, 182)
    },
    {
        'filename': 'gymtracker.jpg',
        'title': 'Gymtracker',
        'tech': ['JavaScript'],
        'color': (230, 126, 34)
    },
    {
        'filename': 'animemanager.jpg',
        'title': 'Animemanager',
        'tech': ['Python'],
        'color': (231, 76, 60)
    },
    {
        'filename': 'mangareader.jpg',
        'title': 'Manga Reader',
        'tech': ['Python'],
        'color': (44, 62, 80)
    },
]

def create_gradient_background(width, height, color):
    """Create a gradient background"""
    base_img = Image.new('RGB', (width, height), color)
    draw = ImageDraw.Draw(base_img)

    # Create gradient effect
    for y in range(height):
        # Calculate gradient intensity
        intensity = 1 - (y / height) * 0.3
        gradient_color = tuple(int(c * intensity) for c in color)
        draw.line([(0, y), (width, y)], fill=gradient_color)

    return base_img

def draw_rounded_rectangle(draw, xy, corner_radius, fill):
    """Draw a rounded rectangle"""
    x1, y1, x2, y2 = xy
    draw.rectangle([x1 + corner_radius, y1, x2 - corner_radius, y2], fill=fill)
    draw.rectangle([x1, y1 + corner_radius, x2, y2 - corner_radius], fill=fill)
    draw.ellipse([x1, y1, x1 + 2*corner_radius, y1 + 2*corner_radius], fill=fill)
    draw.ellipse([x2 - 2*corner_radius, y1, x2, y1 + 2*corner_radius], fill=fill)
    draw.ellipse([x1, y2 - 2*corner_radius, x1 + 2*corner_radius, y2], fill=fill)
    draw.ellipse([x2 - 2*corner_radius, y2 - 2*corner_radius, x2, y2], fill=fill)

def generate_project_image(project_data, output_path):
    """Generate a professional project image"""
    width, height = 800, 600

    # Create gradient background
    img = create_gradient_background(width, height, project_data['color'])
    draw = ImageDraw.Draw(img, 'RGBA')

    # Try to load fonts, fallback to default if not available
    try:
        title_font = ImageFont.truetype("arial.ttf", 48)
        tech_font = ImageFont.truetype("arial.ttf", 24)
    except:
        title_font = ImageFont.load_default()
        tech_font = ImageFont.load_default()

    # Draw title with shadow effect
    title = project_data['title']
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (width - title_width) // 2
    title_y = height // 3

    # Shadow
    draw.text((title_x + 2, title_y + 2), title, font=title_font, fill=(0, 0, 0, 128))
    # Main text
    draw.text((title_x, title_y), title, font=title_font, fill=(255, 255, 255))

    # Draw tech stack badges
    tech_stack = project_data['tech']
    badge_height = 40
    badge_margin = 10
    badges_per_row = 3
    badge_width = (width - (badges_per_row + 1) * badge_margin) // badges_per_row

    start_y = title_y + 100

    for i, tech in enumerate(tech_stack):
        row = i // badges_per_row
        col = i % badges_per_row

        badge_x = badge_margin + col * (badge_width + badge_margin)
        badge_y = start_y + row * (badge_height + badge_margin)

        # Draw badge background with rounded corners
        badge_color = (255, 255, 255, 180)  # Semi-transparent white
        draw_rounded_rectangle(draw,
                             (badge_x, badge_y, badge_x + badge_width, badge_y + badge_height),
                             8, badge_color)

        # Center tech text in badge
        tech_bbox = draw.textbbox((0, 0), tech, font=tech_font)
        tech_width = tech_bbox[2] - tech_bbox[0]
        tech_x = badge_x + (badge_width - tech_width) // 2
        tech_y = badge_y + (badge_height - (tech_bbox[3] - tech_bbox[1])) // 2

        draw.text((tech_x, tech_y), tech, font=tech_font, fill=(0, 0, 0))

    # Add some decorative elements
    # Draw some geometric shapes in corners
    for _ in range(5):
        x = random.randint(50, width - 50)
        y = random.randint(50, height - 50)
        size = random.randint(20, 40)
        shape_color = (255, 255, 255, 50)  # Very transparent white

        if random.choice([True, False]):
            # Circle
            draw.ellipse([x-size, y-size, x+size, y+size], fill=shape_color)
        else:
            # Rectangle
            draw.rectangle([x-size, y-size, x+size, y+size], fill=shape_color)

    return img

def main():
    """Main function to generate all project images"""
    # Create projects directory if it doesn't exist
    projects_dir = os.path.join('public', 'projects')
    os.makedirs(projects_dir, exist_ok=True)

    print("Generating project placeholder images...")

    for project in projects:
        output_path = os.path.join(projects_dir, project['filename'])
        print(f"Creating {project['filename']}...")

        # Generate the image
        img = generate_project_image(project, output_path)

        # Save the image
        img.save(output_path, 'JPEG', quality=90)
        print(f"✓ Saved {output_path}")

    print("\nAll project images generated successfully!")
    print(f"Images saved to: {os.path.abspath(projects_dir)}")

if __name__ == "__main__":
    main()