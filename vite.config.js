import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './dist',
    assetsDir: './',
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-router',
      '@redux-devtools/extension'
    ]
  },
})
