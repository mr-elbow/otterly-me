import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base so the app works identically on the custom domain
  // (app.getotterlyme.com) and the legacy subdirectory URL
  // (mr-elbow.github.io/otterly-me/) — asset paths resolve under either.
  base: './',
})
