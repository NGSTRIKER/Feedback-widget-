import fs from 'fs';
import path from 'path';

const distDir = path.resolve(import.meta.dirname, '../dist');

export function cleanDist(retries = 3, delayMs = 150) {
  if (!fs.existsSync(distDir)) return;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      fs.rmSync(distDir, { recursive: true, force: true });
      return;
    } catch (err) {
      if (attempt === retries) {
        console.warn(`[Clean] Notice: Could not completely remove ${distDir} (may be locked by OneDrive). Proceeding...`);
      } else {
        // Sleep briefly to let OneDrive or file system release lock
        const start = Date.now();
        while (Date.now() - start < delayMs) {
          /* wait */
        }
      }
    }
  }
}

cleanDist();
