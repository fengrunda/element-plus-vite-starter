import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'

import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default ({ mode }) => {
  const VITE_ENV = loadEnv(mode, './viteEnv')
  console.log('VITE_ENV :>> ', mode, VITE_ENV)
  return defineConfig({
    envDir: './viteEnv', // 这里使用相对路径，绝对路径其实也可以
    resolve: {
      alias: {
        '@/': `${pathSrc}/`
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    },
    plugins: [
      vue(),
      // AutoImport({
      //   resolvers: [ElementPlusResolver()]
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()]
      // }),
      ElementPlus({
        useSource: true
      }),
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ],
        dts: 'src/components.d.ts'
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss({
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons({
            scale: 1.2,
            warn: true
          })
        ],
        transformers: [transformerDirectives(), transformerVariantGroup()]
        // rules: [
        //   ['m-1', { margin: '0.25rem' }],
        // ]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            injectScript:
              mode === 'development'
                ? `
              <script>
                window.__VUE_DEVTOOLS_PORT__ = 8081
              </script>
              <script src="http://localhost:8081"></script>
              `
                : ''
          }
        }
      })
    ],
    server: {
      // https: true,
      port: 4500, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      host: '0.0.0.0',

      // 设置代理，根据我们项目实际情况配置
      proxy: {
        [VITE_ENV.VITE_PROXY_PATH]: {
          target: VITE_ENV.VITE_PROXY_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(VITE_ENV.VITE_PROXY_PATH, '/')
        }
      },
      hmr: {
        // protocol: 'ws',
        // host: VITE_ENV.VITE_HMR_HOST
        // path: '/ddh5/'
      }
      // hmr: false
    }
  })
}
