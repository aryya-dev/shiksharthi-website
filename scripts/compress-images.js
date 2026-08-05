import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');

async function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = await getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  }

  return arrayOfFiles;
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    return null;
  }

  const stat = fs.statSync(filePath);
  const originalSize = stat.size;

  // Skip tiny files (< 50KB) unless it's logo
  const isLogo = filePath.includes('shiksharthi-logo');
  if (originalSize < 50 * 1024 && !isLogo) {
    return null;
  }

  const tempFilePath = filePath + '.tmp';

  try {
    let pipeline = sharp(filePath);
    const metadata = await pipeline.metadata();

    // Determine max dimension based on location/use
    let maxDim = 1920; // Full HD for gallery
    if (isLogo) {
      maxDim = 1200; // Logo crisp up to 1200px
    } else if (filePath.includes('achievers-img')) {
      maxDim = 800; // Achievers thumbnails / cards
    }

    if (metadata.width && (metadata.width > maxDim || (metadata.height && metadata.height > maxDim))) {
      pipeline = pipeline.resize({
        width: metadata.width >= (metadata.height || 0) ? maxDim : undefined,
        height: metadata.height > (metadata.width || 0) ? maxDim : undefined,
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    if (ext === '.jpg' || ext === '.jpeg') {
      await pipeline
        .jpeg({ quality: isLogo ? 88 : 82, progressive: true, mozjpeg: true })
        .toFile(tempFilePath);
    } else if (ext === '.png') {
      await pipeline
        .png({ quality: 82, progressive: true, compressionLevel: 9 })
        .toFile(tempFilePath);
    } else if (ext === '.webp') {
      await pipeline
        .webp({ quality: 82 })
        .toFile(tempFilePath);
    }

    const newStat = fs.statSync(tempFilePath);
    const newSize = newStat.size;

    if (newSize < originalSize) {
      fs.renameSync(tempFilePath, filePath);
      const savedBytes = originalSize - newSize;
      const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);
      console.log(`[Compressed] ${path.relative(PUBLIC_DIR, filePath)}: ${(originalSize / 1024 / 1024).toFixed(2)} MB -> ${(newSize / 1024).toFixed(1)} KB (-${savedPercent}%)`);
      return { originalSize, newSize, savedBytes };
    } else {
      fs.unlinkSync(tempFilePath);
      console.log(`[Skipped] ${path.relative(PUBLIC_DIR, filePath)}: compression did not reduce size`);
      return null;
    }
  } catch (err) {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
    console.error(`[Error] Failed to compress ${filePath}:`, err.message);
    return null;
  }
}

async function main() {
  console.log('Starting image compression scan...');
  const files = await getAllFiles(PUBLIC_DIR);
  console.log(`Found ${files.length} total files in public directory.`);

  let totalOriginal = 0;
  let totalNew = 0;
  let processedCount = 0;

  for (const file of files) {
    const result = await compressImage(file);
    if (result) {
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
      processedCount++;
    }
  }

  const totalSaved = totalOriginal - totalNew;
  console.log('\n=================== COMPRESSION SUMMARY ===================');
  console.log(`Processed: ${processedCount} images`);
  console.log(`Original total size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`New total size:      ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total saved:         ${(totalSaved / 1024 / 1024).toFixed(2)} MB (${((totalSaved / totalOriginal) * 100).toFixed(1)}% reduction)`);
  console.log('===========================================================');
}

main();
