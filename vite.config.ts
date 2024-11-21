import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const CWD = process.cwd()

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [resolve(CWD, 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'svg-icon-[dir]-[name]'
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.198.59:9000/',
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
