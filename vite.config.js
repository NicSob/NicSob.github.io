import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  optimizeDeps: {
    entries: ['index.html']
  },
  server: {
    watch: {
      ignored: ['**/beast@*/**', '**/node_modules.evicted/**']
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
