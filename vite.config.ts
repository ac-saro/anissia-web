import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
const env = require('dotenv').config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '^/api/.*': {
        target: env.VUE_APP_API_HOST,
        ws: true,
        changeOrigin: true
      },
      '^/anitime/list_img': {
        target: env.VUE_APP_API_HOST,
        ws: true,
        changeOrigin: true
      },
      // this path will not work on production server
      '^/data/.*': {
        target: env.VUE_APP_API_HOST,
        ws: true,
        changeOrigin: true
      },
    }
  }
})
