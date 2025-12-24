const fs = require('fs');
const path = require('path');

/**
 * Script to copy background images from assets/images/backgrounds to public/backgrounds
 * This ensures all background images are available for the Next.js app
 */

const sourceDirs = {
  main: path.join(__dirname, '..', 'assets', 'images', 'backgrounds', 'main'),
  alternate: path.join(__dirname, '..', 'assets', 'images', 'backgrounds', 'alternate'),
  screens: path.join(__dirname, '..', 'assets', 'images', 'backgrounds', 'screens'),
};

const destDir = path.join(__dirname, '..', 'public', 'backgrounds');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Image extensions to copy
const imageExtensions = ['.PNG', '.png', '.jpg', '.JPG', '.jpeg', '.JPEG'];

let copiedCount = 0;
let skippedCount = 0;

// Function to copy a file
function copyFile(sourcePath, destPath, fileName) {
  try {
    // Check if destination file exists and is newer (skip if so)
    if (fs.existsSync(destPath)) {
      const sourceStats = fs.statSync(sourcePath);
      const destStats = fs.statSync(destPath);
      
      // Skip if destination is newer or same age
      if (destStats.mtime >= sourceStats.mtime) {
        skippedCount++;
        return;
      }
    }
    
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✓ Copied: ${fileName}`);
    copiedCount++;
  } catch (error) {
    console.error(`✗ Error copying ${fileName}:`, error.message);
  }
}

// Process each source directory
Object.entries(sourceDirs).forEach(([folderName, sourceDir]) => {
  if (!fs.existsSync(sourceDir)) {
    console.warn(`Warning: Source directory not found: ${sourceDir}`);
    return;
  }

  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    const ext = path.extname(file);
    
    // Only copy image files, skip .import files
    if (imageExtensions.includes(ext) && !file.endsWith('.import')) {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);
      
      copyFile(sourcePath, destPath, file);
    }
  });
});

// Also check for any images directly in the backgrounds folder (like alt_timewarpUPSCALED.PNG)
const rootBackgroundsDir = path.join(__dirname, '..', 'assets', 'images', 'backgrounds');
if (fs.existsSync(rootBackgroundsDir)) {
  const rootFiles = fs.readdirSync(rootBackgroundsDir);
  rootFiles.forEach(file => {
    const filePath = path.join(rootBackgroundsDir, file);
    const stat = fs.statSync(filePath);
    
    // Only process files (not directories)
    if (stat.isFile()) {
      const ext = path.extname(file);
      if (imageExtensions.includes(ext) && !file.endsWith('.import')) {
        const destPath = path.join(destDir, file);
        copyFile(filePath, destPath, file);
      }
    }
  });
}

console.log('\n--- Summary ---');
console.log(`Copied: ${copiedCount} files`);
console.log(`Skipped: ${skippedCount} files (already up to date)`);
console.log(`Total processed: ${copiedCount + skippedCount} files`);



