import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const key = env.VITE_EASYBROKER_API_KEY
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/eb': {
          target: 'https://api.easybroker.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/eb/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (key) proxyReq.setHeader('X-Authorization', key)
            })
          },
        },
      },
    },
  }
})
