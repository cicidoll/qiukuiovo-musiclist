import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  publicPath:'/public/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "comps": fileURLToPath(new URL('./src/components', import.meta.url)),
      "views": fileURLToPath(new URL('./src/views', import.meta.url)),
      "store": fileURLToPath(new URL('./src/store', import.meta.url)),
      "data": fileURLToPath(new URL('./src/data', import.meta.url))
    }
  }
})
