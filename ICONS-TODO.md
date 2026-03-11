# App Icons TODO

## Required Icons for PWA

### 192x192 icon (icon-192.png)
- Brain or neuron design
- Dark background (#0b0f14)
- Light blue/cyan accent (#6ad3ff)
- Simple, recognizable design
- PNG format

### 512x512 icon (icon-512.png)
- Same design as 192x192
- Higher resolution
- PNG format

## Quick Icon Generation Options

### Option 1: Use an online tool
- https://realfavicongenerator.net/
- https://www.favicon-generator.org/

### Option 2: Simple SVG to PNG
Create a simple brain emoji or symbol:
```html
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#0b0f14"/>
  <text x="256" y="350" font-size="300" text-anchor="middle" fill="#6ad3ff">🧠</text>
</svg>
```

### Option 3: Use a stock icon
- Search for "brain icon" on flaticon.com or iconscout.com
- Ensure it's free for commercial use
- Resize to 192x192 and 512x512

## Temporary Workaround
The app will work without icons, but installation prompt may not appear on all browsers.
For testing, you can proceed without icons and add them later.
