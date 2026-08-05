import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function compressLogo() {
  const logoPath = path.resolve('public/shiksharthi-logo.jpg');
  const tempPath = path.resolve('public/shiksharthi-logo.jpg.tmp');

  const stat = fs.statSync(logoPath);
  console.log(`Original logo size: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);

  try {
    const pipeline = sharp(logoPath, { limitInputPixels: false });
    const metadata = await pipeline.metadata();
    console.log(`Logo metadata: ${metadata.width}x${metadata.height}, format: ${metadata.format}`);

    await pipeline
      .resize({ width: 1200, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 88, progressive: true, mozjpeg: true })
      .toFile(tempPath);

    const newStat = fs.statSync(tempPath);
    console.log(`Compressed logo size: ${(newStat.size / 1024).toFixed(1)} KB`);

    fs.renameSync(tempPath, logoPath);
    console.log('Successfully replaced shiksharthi-logo.jpg with optimized compressed image!');
  } catch (err) {
    console.error('Error compressing logo:', err);
  }
}

compressLogo();
