import { resolve } from 'path';
import { defineConfig } from 'vite';

// This is the smart config that handles both dev and production
export default defineConfig(({ command }) => {
  const base = command === 'serve' ? '/' : '/YouthBank-pwa/';
  
  return {
    base: base,
    server: {
      open: true,
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        // --- THIS IS THE FIX ---
        // Tell Vite about all your HTML entry points
        input: {
          main: resolve(__dirname, 'index.html'),
          sessions: resolve(__dirname, 'sessions.html'),
          login: resolve(__dirname, 'login.html'),
          auth: resolve(__dirname, 'auth.html'),
        },
      },
    },
  };
});