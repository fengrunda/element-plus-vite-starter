import { AxiosRequestConfig } from 'axios'
declare module '@vue/runtime-core' {
  // export interface ComponentCustomProperties {
  //   $dd: typeof dd
  // }
}
declare global {
  interface Window {
    __wxjs_environment?: string
  }
  interface RequestConfig<D = any> extends AxiosRequestConfig<D> {
    retried?: boolean
    checkAuth?: boolean
    showToast?: boolean
    showLoading?: boolean
  }
  interface RequestParams<D = any> {
    params?: D
    config?: RequestConfig<D>
  }
  interface ResponseData<T = any> {
    serveTime: string
    result: {
      resultCode: number
      resultDesc: string
      newToken: null
    }
    data: T
  }
}
