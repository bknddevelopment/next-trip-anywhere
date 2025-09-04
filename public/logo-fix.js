// Emergency logo fix for GitHub Pages
(function() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixLogos);
  } else {
    fixLogos();
  }
  
  function fixLogos() {
    // Find all images with the logo source
    const images = document.querySelectorAll('img[src="/NextTripAnywhere.PNG"]');
    
    images.forEach(function(img) {
      // Update to the correct path for GitHub Pages
      img.src = '/next-trip-anywhere/NextTripAnywhere.PNG';
      console.log('Fixed logo path:', img.src);
    });
    
    // Also fix any that might be dynamically added
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeName === 'IMG' && node.src && node.src.includes('/NextTripAnywhere.PNG')) {
              if (!node.src.includes('/next-trip-anywhere/')) {
                node.src = '/next-trip-anywhere/NextTripAnywhere.PNG';
                console.log('Fixed dynamically added logo:', node.src);
              }
            }
          });
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
})();