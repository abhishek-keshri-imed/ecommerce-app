import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl' // 🔥 FIXED: Added missing import statement

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    basicSsl() // Generates the trusted local SSL certificate
  ],
  server: {
    https: true, // Forces Vite to boot up in a secure context
    port: 5173   // Keeps your standard port alignment
  }
})