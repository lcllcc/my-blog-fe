import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const env = loadEnv(process.cwd(), '');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 请求代理
  server: {
    proxy: {
      // /api打头的请求会被代理到target指定的host，并且整个请求path会按照rewrite规则重写
      '/api': {
        target: env.VITE_APP_ENV === 'prod' ? 'http://liuchanglei.com':'http://localhost:9999',
        changeOrigin: true
      }
    }
  }
})
