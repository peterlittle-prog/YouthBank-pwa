import { defineConfig } from 'vite';

export default defineConfig({
  // We only define the base path for the production build.
  // The dev server will handle the root path correctly by default.
  base: process.env.NODE_ENV === 'production' ? '/YouthBank-pwa/' : '/',
  
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        sessions: 'sessions.html',
        login: 'login.html',
        auth: 'auth.html',
      },
    },
  },
});