import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: ["flapp-front-serv.onrender.com"],  // 🔹 Permitir Render
    host: true,  // 🔹 Permitir acceso externo
    port: 5173,  // Asegurar que el puerto es 3000
  }
})
