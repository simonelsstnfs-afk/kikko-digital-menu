import os
from PIL import Image, ImageFilter

input_dir = r"c:/Users/tnfst/Workspaces/Web builder/kikko/carta-digital-kikko/public"
output_dir = r"C:\Users\tnfst\Desktop\Antigravity\Kikko\CARTA\Desenfoque"

os.makedirs(output_dir, exist_ok=True)

images = [
    "entrantes_1785956033574.jpg",
    "pizzas_1785956040596.jpg",
    "pastas_1785956047802.jpg",
    "risottos_1785956058315.jpg",
    "segundos_1785956066731.jpg",
    "hamburguesas_1785956074332.jpg",
    "postres_1785956082582.jpg",
    "bebidas_1785956091901.jpg"
]

color = (20, 26, 15)
alpha = int(255 * 0.25)

for img_name in images:
    path = os.path.join(input_dir, img_name)
    if os.path.exists(path):
        with Image.open(path) as img:
            img = img.convert("RGBA")
            
            # Apply blur
            blurred = img.filter(ImageFilter.GaussianBlur(radius=8))
            
            # Apply color overlay
            overlay = Image.new('RGBA', blurred.size, color + (alpha,))
            result = Image.alpha_composite(blurred, overlay)
            
            # Convert back to RGB for PNG saving without alpha channel if user doesn't need transparent background, 
            # though PNG with alpha is fine. PNG without alpha is smaller. We'll leave it as RGB since it's fully opaque.
            final_rgb = result.convert("RGB")
            
            out_name = os.path.splitext(img_name)[0] + ".png"
            out_path = os.path.join(output_dir, out_name)
            
            final_rgb.save(out_path, "PNG")
            print(f"Processed {img_name} -> {out_name}")
    else:
        print(f"File not found: {path}")

print("All done!")
