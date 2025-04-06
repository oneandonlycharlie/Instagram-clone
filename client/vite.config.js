import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
        "/api": {
          target:"https://instagram-clone-backend-production.up.railway.app",
          changeOrigin: true,
        },
        "/account": {
          target:"https://instagram-clone-backend-production.up.railway.app",
          changeOrigin: true,
        }
      },
    },
})