import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://back.sovchilar.net',
        changeOrigin: true,
        secure: false, // Agar HTTPS bilan ishlasangiz va SSL sertifikatingiz bo'lmasa
        ws: true, // WebSocket uchun
      },
    },
  },
})

