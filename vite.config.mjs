import { defineConfig } from 'vite';

// This is the smart config that uses the correct base path for dev vs. production
export default defineConfig(({ command }) => {
  const base = command === 'serve' ? '/' : '/YouthBank-pwa/';
  return {
    base: base,
    server: {
      open: true,
    },
    build: {
      outDir: 'dist',
    },
  };
});