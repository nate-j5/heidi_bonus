import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [react()],
    build: {
      sourcemap: true
    },
    server: {
      proxy: {
        '/api': {
          target: isProduction 
            ? process.env.VITE_API_URL || 'https://your-production-api.com'
            : 'http://localhost:8000',
          changeOrigin: true,
          secure: isProduction,
        }
      }
    }
  }
})
