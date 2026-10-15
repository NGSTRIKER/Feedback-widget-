import { execSync } from 'child_process';
import { cleanDist } from './clean-dist.js';

console.log('[Build] 1/2 Cleaning and building web application demo...');
cleanDist();

// 1. Build index.html app
execSync('npx vite build --config vite.config.ts', { stdio: 'inherit' });

// 2. Build standalone component library bundles
console.log('[Build] 2/2 Building standalone component library bundle...');
execSync('npx vite build --config vite.config.lib.ts', { stdio: 'inherit' });

console.log('[Build] Complete! dist/ contains both index.html and signal-feedback.js');
