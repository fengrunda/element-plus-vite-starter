/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
interface ImportMetaEnv {
  readonly VITE_APP_BUILD_TYPE: string
  readonly VITE_PROXY_PATH: string
  readonly VITE_PROXY_URL: string
  readonly VITE_AXIOS_BASE_URL: string
  readonly VITE_HMR_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
