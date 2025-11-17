#!/usr/bin/env python3
import base64
import sys
import os

if len(sys.argv) != 2:
    print("Usage: python encrypt_webhook.py <webhook_url>")
    sys.exit(1)

webhook_url = sys.argv[1]
encoded = base64.b64encode(webhook_url.encode('utf-8')).decode('utf-8')

# Ensure the config directory exists
os.makedirs('src/config', exist_ok=True)

# Write the encoded webhook to the file
with open('src/config/settings.js', 'w') as f:
    f.write(f'export const configData = "{encoded}";\n')

print(f"Webhook URL encoded and written to src/config/settings.js")