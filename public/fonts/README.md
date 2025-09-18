# Font Files Directory

This directory contains local font files for the Next Trip Anywhere website.

## Fonts Used:
- **Inter Variable** - Main body font (loaded via Next.js Google Fonts)
- **Montserrat** - Headings and display text (loaded via Next.js Google Fonts)

## Note:
The application primarily uses Google Fonts loaded through Next.js's built-in font optimization. The ResourceHints component references these paths for preloading, but the actual fonts are served by Google Fonts.

If you need to use local fonts instead:
1. Download Inter Variable font from: https://github.com/rsms/inter/releases
2. Download Montserrat from: https://fonts.google.com/specimen/Montserrat
3. Place the .woff2 files in this directory