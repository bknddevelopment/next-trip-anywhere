const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  
  try {
    // Optimize ocean-hero.png
    console.log('Optimizing ocean-hero.png...');
    
    // Create WebP version (high quality for hero)
    await sharp(path.join(imagesDir, 'ocean-hero.png'))
      .resize(1920, 1080, { 
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 85 })
      .toFile(path.join(imagesDir, 'ocean-hero-optimized.webp'));
    
    // Create JPEG fallback
    await sharp(path.join(imagesDir, 'ocean-hero.png'))
      .resize(1920, 1080, { 
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 85, progressive: true })
      .toFile(path.join(imagesDir, 'ocean-hero-optimized.jpg'));
    
    // Create mobile version
    await sharp(path.join(imagesDir, 'ocean-hero.png'))
      .resize(768, 1024, { 
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 80 })
      .toFile(path.join(imagesDir, 'ocean-hero-mobile.webp'));
    
    // Create placeholder (tiny base64)
    const placeholder = await sharp(path.join(imagesDir, 'ocean-hero.png'))
      .resize(20, 20, { fit: 'cover' })
      .blur(10)
      .webp({ quality: 20 })
      .toBuffer();
    
    const base64 = `data:image/webp;base64,${placeholder.toString('base64')}`;
    console.log('Placeholder base64 created (for blur-up effect)');
    
    // Optimize other images
    const otherImages = ['mexico-destination.jpg', 'paris-destination.jpg'];
    
    for (const img of otherImages) {
      if (await fs.access(path.join(imagesDir, img)).then(() => true).catch(() => false)) {
        console.log(`Optimizing ${img}...`);
        const name = path.parse(img).name;
        
        // WebP version
        await sharp(path.join(imagesDir, img))
          .resize(800, 600, { 
            fit: 'cover',
            withoutEnlargement: true 
          })
          .webp({ quality: 80 })
          .toFile(path.join(imagesDir, `${name}-optimized.webp`));
        
        // Optimized JPEG
        await sharp(path.join(imagesDir, img))
          .resize(800, 600, { 
            fit: 'cover',
            withoutEnlargement: true 
          })
          .jpeg({ quality: 80, progressive: true })
          .toFile(path.join(imagesDir, `${name}-optimized.jpg`));
      }
    }
    
    // Get file sizes for comparison
    const originalSize = (await fs.stat(path.join(imagesDir, 'ocean-hero.png'))).size;
    const webpSize = (await fs.stat(path.join(imagesDir, 'ocean-hero-optimized.webp'))).size;
    const jpegSize = (await fs.stat(path.join(imagesDir, 'ocean-hero-optimized.jpg'))).size;
    
    console.log('\n=== Optimization Results ===');
    console.log(`Original PNG: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Optimized WebP: ${(webpSize / 1024).toFixed(0)} KB (${((1 - webpSize/originalSize) * 100).toFixed(0)}% reduction)`);
    console.log(`Optimized JPEG: ${(jpegSize / 1024).toFixed(0)} KB (${((1 - jpegSize/originalSize) * 100).toFixed(0)}% reduction)`);
    
    console.log('\nImage optimization complete!');
    
  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
}

optimizeImages();