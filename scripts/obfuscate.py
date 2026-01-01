#!/usr/bin/env python3
import base64
import sys
import os

if len(sys.argv) != 2:
    print("Usage: python obfuscate.py <webhook_url>")
    sys.exit(1)

url = sys.argv[1]
encoded = base64.b64encode(url.encode('utf-8')).decode('utf-8')

# Ensure the config directory exists
os.makedirs('src/config', exist_ok=True)

# Write the encoded URL to the file
with open('src/config/settings.js', 'w') as f:
    f.write(f'export const configData = "{encoded}";\n')

print(f"URL encoded and written to src/config/settings.js")