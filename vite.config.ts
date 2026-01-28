import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Cloudflare-da joyni tejash va xavfsizlik uchun
    rollupOptions: {
      output: {
        // Vendor kutubxonalarni (React, Lucide) alohida faylga ajratish
        // Bu foydalanuvchi saytga qayta kirganda keshdan tezroq yuklanishini ta'minlaydi
        manualChunks: {
          vendor: ['react', 'react-dom', 'lucide-react'],
        },
      },
    },
    // CSS kodlarni ixchamlashtirish
    cssCodeSplit: true,
    // Katta fayllar haqida ogohlantirish limitini oshirish
    chunkSizeWarningLimit: 1000,
  },
})