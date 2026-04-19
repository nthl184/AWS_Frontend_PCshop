import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
  server: {
    proxy: {
      '/api/products': { target: 'http://localhost:3001', changeOrigin: true },
      '/api/orders':   { target: 'http://localhost:3002', changeOrigin: true }
    }
  }
}