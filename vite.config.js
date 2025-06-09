import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path';



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
  ],
  resolve: {
    alias: {
      // Add global to window
      global: resolve(__dirname, 'node_modules/global/')
    }
  },
  define: {
    // Define global
    'global': 'globalThis'
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: {
      overlay: false, // Disable the HMR overlay
    },
    allowedHosts: [
      'mensvitaminshop.com', 'shop.mensvitaminshop.com'// Add your host here
    ],
  }
})
