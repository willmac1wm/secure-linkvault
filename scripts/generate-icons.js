// Generate PNG icons from SVG using sharp
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

async function generateIcons() {
  const svgPath = join(publicDir, 'icon.svg');
  const svgBuffer = readFileSync(svgPath);
  
  const sizes = [192, 512];
  
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(publicDir, `icon-${size}.png`));
    
    console.log(`✓ Generated icon-${size}.png`);
  }
  
  console.log('\nAll icons generated successfully!');
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
