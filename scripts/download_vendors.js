/**
 * VENDOR LIBRARIES DOWNLOADER
 * Downloads Three.js, GSAP, ScrollTrigger, Lenis, and Lucide locally for offline zero-latency performance.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const vendorDir = path.join(__dirname, '..', 'src', 'vendor');
if (!fs.existsSync(vendorDir)) {
  fs.mkdirSync(vendorDir, { recursive: true });
}

const libraries = [
  {
    name: 'three.module.js',
    url: 'https://unpkg.com/three@0.160.0/build/three.module.js'
  },
  {
    name: 'gsap.min.js',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
  },
  {
    name: 'ScrollTrigger.min.js',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'
  },
  {
    name: 'lenis.min.js',
    url: 'https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js'
  },
  {
    name: 'lucide.min.js',
    url: 'https://unpkg.com/lucide@0.344.0/dist/umd/lucide.min.js'
  }
];

function download(lib) {
  return new Promise((resolve, reject) => {
    const dest = path.join(vendorDir, lib.name);
    console.log(`Downloading ${lib.name}...`);
    
    function makeRequest(currentUrl) {
      https.get(currentUrl, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = new URL(res.headers.location, currentUrl).toString();
          makeRequest(redirectUrl);
          return;
        }

        if (res.statusCode !== 200) {
          reject(new Error(`Failed to get '${currentUrl}' (${res.statusCode})`));
          return;
        }

        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            console.log(`✓ Successfully downloaded ${lib.name}`);
            resolve();
          });
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }

    makeRequest(lib.url);
  });
}

async function run() {
  for (const lib of libraries) {
    try {
      await download(lib);
    } catch (err) {
      console.error(`Error downloading ${lib.name}:`, err.message);
    }
  }
  console.log('✓ All vendor libraries ready in src/vendor/');
}

run();
