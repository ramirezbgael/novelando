import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/eb': {
        target: 'https://api.easybroker.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/eb/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            const key = process.env.VITE_EASYBROKER_API_KEY
            if (key) proxyReq.setHeader('X-Authorization', key)
          })
        },
      },
    },
  },
})
