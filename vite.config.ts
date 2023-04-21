import { defineConfig } from 'vite'
// Install node types before calling below import
import { fileURLToPath } from 'url'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    host: true,
    port: 8000
  },
  resolve: {
    alias: {
      // Two methods available
      // Method 1: using fireURLPath (keep adding other paths as needed)
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // vue-material-design-icons
      icons: path.resolve(__dirname, 'node_modules/vue-material-design-icons'),
      // Method 2: using path
      '@components': path.resolve(__dirname, 'src/components')
    }
  }
})
