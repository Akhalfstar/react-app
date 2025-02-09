import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
    allowedHosts: "q78898-5173.csb.app",
  },
  plugins: [react() ,  tailwindcss(),],
})
