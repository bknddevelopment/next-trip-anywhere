#!/usr/bin/env python3
"""Generate favicon.ico from PNG logo"""

from PIL import Image
import os

# Input and output paths
input_path = "public/NextTripAnywhere.PNG"
output_ico = "public/favicon.ico"

# Open the PNG image
img = Image.open(input_path)

# Create multiple sizes for the ICO file
sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
ico_images = []

for size in sizes:
    # Resize image using LANCZOS for high quality
    resized = img.resize(size, Image.Resampling.LANCZOS)
    ico_images.append(resized)

# Save as ICO with multiple sizes
ico_images[0].save(output_ico, format='ICO', sizes=[(s[0], s[1]) for s in sizes], append_images=ico_images[1:])

print(f"Successfully created {output_ico} with sizes: {sizes}")