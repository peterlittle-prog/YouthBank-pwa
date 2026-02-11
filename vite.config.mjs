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
        main: 'index.html',     // Now the Dashboard
        cycle: 'cycle.html',    // Renamed from index
        sessions: 'sessions.html',
        login: 'login.html',
        auth: 'auth.html',
        triad: 'triad.html'     // The new Triad page
      },
    },
  },
});