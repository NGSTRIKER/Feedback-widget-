import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/component/index.ts'),
      name: 'SignalFeedback',
      fileName: (format) => (format === 'es' ? 'signal-feedback.js' : `signal-feedback.${format}.js`),
      formats: ['es', 'umd', 'iife'],
    },
    rollupOptions: {
      output: {
        exports: 'named',
        extend: true,
      },
    },
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: false,
  },
});
