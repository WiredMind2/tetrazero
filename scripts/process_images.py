import os
from PIL import Image, ImageFilter
import math

# Paths
downloaded_images_dir = 'downloaded_images'
output_dir = 'public/projects/astronauts'

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

# Process images
files = [f for f in os.listdir(downloaded_images_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
files.sort(key=lambda f: int(f.split('_')[1].split('.')[0]))

for file in files:
        input_path = os.path.join(downloaded_images_dir, file)
        base_name = os.path.splitext(file)[0]
        output_path = os.path.join(output_dir, base_name + '.webp')
        
        if not os.path.exists(output_path):
            try:
                with Image.open(input_path) as img:
                    img = img.convert('RGBA')
                    
                    # Create hard mask
                    bg_color = img.getpixel((0, 0))
                    mask = Image.new('L', img.size, 0)
                    threshold = 30  # Adjust threshold for color similarity
                    for y in range(img.size[1]):
                        for x in range(img.size[0]):
                            pixel = img.getpixel((x, y))
                            r, g, b, a = pixel
                            bg_r, bg_g, bg_b, bg_a = bg_color
                            dist = math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
                            if dist < threshold:
                                mask.putpixel((x, y), 0)
                            else:
                                mask.putpixel((x, y), 255)
                    
                    # Feather the mask
                    feathered_mask = mask.filter(ImageFilter.GaussianBlur(5))
                    
                    # Create image with soft edges
                    new_img = Image.new('RGBA', img.size)
                    for y in range(img.size[1]):
                        for x in range(img.size[0]):
                            r, g, b, a = img.getpixel((x, y))
                            alpha = feathered_mask.getpixel((x, y))
                            new_img.putpixel((x, y), (r, g, b, alpha))
                    
                    new_img.save(output_path, 'WEBP')
                print(f"Processed: {file} -> {base_name}.webp")
            except Exception as e:
                print(f"Error processing {file}: {e}")

print("Processing complete.")