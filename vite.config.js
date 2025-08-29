// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        { src: 'src/assets/images/*', dest: 'images' } // -> dist/images/...
      ]
    })
  ],
  // se pubblichi su sotto-path (GitHub Pages):
  // base: '/nome-repo/'
})
