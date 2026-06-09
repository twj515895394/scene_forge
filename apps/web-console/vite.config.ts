import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 4398,
    proxy: {
      '/api': 'http://localhost:4399',
      '/ws': {
        target: 'ws://localhost:4399',
        ws: true
      }
    }
  }
});
