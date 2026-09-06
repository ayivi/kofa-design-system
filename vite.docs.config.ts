import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: resolve(import.meta.dirname, 'docs'),
  plugins: [react()],
  build: {
    outDir: resolve(import.meta.dirname, 'docs-dist'),
    emptyOutDir: true,
  },
});
