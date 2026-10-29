const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

let ffmpegPath = 'ffmpeg';
try {
  const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
  if (ffmpegInstaller && ffmpegInstaller.path && fs.existsSync(ffmpegInstaller.path)) {
    ffmpegPath = ffmpegInstaller.path;
  }
} catch (e) {
  // Use system ffmpeg
}

const rootDir = path.resolve(__dirname, '..');
const inputVideo = path.join(rootDir, 'public', 'video', 'car.mp4');
const desktopDir = path.join(rootDir, 'public', 'frames', 'desktop');
const mobileDir = path.join(rootDir, 'public', 'frames', 'mobile');

if (!fs.existsSync(inputVideo)) {
  console.error(`[ERROR] Input video not found at: ${inputVideo}`);
  process.exit(1);
}

fs.mkdirSync(desktopDir, { recursive: true });
fs.mkdirSync(mobileDir, { recursive: true });

function runCommand(bin, args, label) {
  return new Promise((resolve, reject) => {
    console.log(`\n[START] ${label}...`);
    const proc = spawn(bin, args, { stdio: 'inherit' });
    proc.on('close', (code) => {
      if (code === 0) {
        console.log(`[SUCCESS] ${label} finished.`);
        resolve();
      } else {
        reject(new Error(`${label} failed with exit code ${code}`));
      }
    });
    proc.on('error', (err) => reject(err));
  });
}

async function extract() {
  console.log(`Using ffmpeg binary at: ${ffmpegPath}`);
  console.log(`Input video: ${inputVideo}`);

  // Fast optimized WebP extraction:
  // Desktop: 1600px wide, 24fps WebP, q:v 75, compression_level 1 for high speed
  await runCommand(
    ffmpegPath,
    [
      '-y',
      '-i', inputVideo,
      '-vf', 'fps=24,scale=1600:-1:flags=bicubic',
      '-vcodec', 'libwebp',
      '-lossless', '0',
      '-preset', 'photo',
      '-compression_level', '1',
      '-q:v', '75',
      path.join(desktopDir, 'frame-%04d.webp')
    ],
    'Desktop Frames Extraction (1600px, 24fps WebP)'
  );

  // Mobile: 800px wide, 24fps WebP
  await runCommand(
    ffmpegPath,
    [
      '-y',
      '-i', inputVideo,
      '-vf', 'fps=24,scale=800:-1:flags=bicubic',
      '-vcodec', 'libwebp',
      '-lossless', '0',
      '-preset', 'photo',
      '-compression_level', '1',
      '-q:v', '70',
      path.join(mobileDir, 'frame-%04d.webp')
    ],
    'Mobile Frames Extraction (800px, 24fps WebP)'
  );

  const desktopFrames = fs.readdirSync(desktopDir).filter(f => f.endsWith('.webp'));
  const mobileFrames = fs.readdirSync(mobileDir).filter(f => f.endsWith('.webp'));

  console.log('\n=============================================');
  console.log(`Extraction Complete!`);
  console.log(`Desktop Frames: ${desktopFrames.length} in ${desktopDir}`);
  console.log(`Mobile Frames:  ${mobileFrames.length} in ${mobileDir}`);
  console.log('=============================================\n');
}

extract().catch((err) => {
  console.error('[EXTRACTION FAILED]', err);
  process.exit(1);
});
