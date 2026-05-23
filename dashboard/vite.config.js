import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Manually create a valid __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 5173,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../backend/api.ecommerce.test+2-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../backend/api.ecommerce.test+2.pem'))
    },
    host: 'ecommerce.test'
  }
})