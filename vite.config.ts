import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://0d1e-96-250-79-68.ngrok-free.app',
        changeOrigin: true,
        secure: false, // Set to true if the server has proper SSL
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});

