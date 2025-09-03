const fs = require('fs');
const path = require('path');
const https = require('https');

// Protocol logo URLs from various sources
const protocolLogos = {
  aave: [
    'https://cryptologos.cc/logos/aave-aave-logo.svg',
    'https://assets.coingecko.com/coins/images/12645/large/AAVE.png',
  ],
  pendle: [
    'https://cryptologos.cc/logos/pendle-pendle-logo.svg',
    'https://assets.coingecko.com/coins/images/21460/large/pendle_logo.png',
  ],
  gearbox: [
    'https://cryptologos.cc/logos/gearbox-protocol-gearbox-logo.svg',
    'https://assets.coingecko.com/coins/images/20163/large/gearbox.png',
  ],
  stargate: [
    'https://cryptologos.cc/logos/stargate-finance-stg-logo.svg',
    'https://assets.coingecko.com/coins/images/24413/large/STG_LOGO.png',
  ],
  spark: [
    'https://cryptologos.cc/logos/spark-protocol-spark-logo.svg',
    'https://assets.coingecko.com/coins/images/25160/large/spark.png',
  ],
  compound: [
    'https://cryptologos.cc/logos/compound-comp-logo.svg',
    'https://assets.coingecko.com/coins/images/10775/large/COMP.png',
  ],
  maker: [
    'https://cryptologos.cc/logos/maker-mkr-logo.svg',
    'https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png',
  ],
  uniswap: [
    'https://cryptologos.cc/logos/uniswap-uni-logo.svg',
    'https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png',
  ],
  curve: [
    'https://cryptologos.cc/logos/curve-dao-token-crv-logo.svg',
    'https://assets.coingecko.com/coins/images/12124/large/Curve.png',
  ],
  balancer: [
    'https://cryptologos.cc/logos/balancer-bal-logo.svg',
    'https://assets.coingecko.com/coins/images/11683/large/Balancer.png',
  ],
};

// Create logos directory if it doesn't exist
const logosDir = path.join(__dirname, '..', 'public', 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

// Function to download a file
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
      .on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file on error
        reject(err);
      });
  });
}

// Download logos
async function downloadLogos() {
  console.log('Starting logo downloads...');

  for (const [protocol, urls] of Object.entries(protocolLogos)) {
    console.log(`\nDownloading ${protocol} logos...`);

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const extension = url.includes('.svg') ? 'svg' : 'png';
      const filename = `${protocol}-logo${
        i > 0 ? `-${i + 1}` : ''
      }.${extension}`;
      const filepath = path.join(logosDir, filename);

      try {
        console.log(`  Downloading ${filename}...`);
        await downloadFile(url, filepath);
        console.log(`  ✅ Downloaded ${filename}`);
      } catch (error) {
        console.log(`  ❌ Failed to download ${filename}: ${error.message}`);
      }
    }
  }

  console.log('\n🎉 Logo download process completed!');
  console.log(`Logos saved to: ${logosDir}`);
}

// Run the download
downloadLogos().catch(console.error);
