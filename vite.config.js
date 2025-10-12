import { defineConfig } from 'vite';

// This is the smart config that uses the correct base path for dev vs. production
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // --- Configuration for the LOCAL DEVELOPMENT server ('npx vite') ---
    return {
      base: '/', // Use the root base path for local dev
      server: {
        open: true,
      },
    };
  } else {
    // --- Configuration for the PRODUCTION BUILD ('npx vite build') ---
    return {
      base: '/YouthBank-pwa/', // Use the repo name for the live site on GitHub Pages
      build: {
        outDir: 'dist',
      },
    };
  }
});