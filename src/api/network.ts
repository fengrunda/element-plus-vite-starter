import axios, { AxiosResponse } from 'axios'
import { LoadingInterface, ToastInterface, errorFormatter, removeEmpty } from '@/utils/util'
// import * as API_BASE from '@/api/modules/base'
// import store from '@/store'
import Cookies from 'js-cookie'
const axiosInstance = axios.create({
  // baseURL: '../',
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  headers: {
    'content-type': 'application/json'
  },
  timeout: 15 * 1000
})
// 添加请求拦截器
axiosInstance.interceptors.request.use(
  async (config: RequestConfig) => {
    // const accessToken = await this.app.redis.get('accessToken_dingTalk_miniApp')
    const headers = config?.headers || {}
    if (config?.showLoading) {
      LoadingInterface.open(config?.url)
    }
    // TODO登录校验
    if (config?.checkAuth) {
      const accessToken = localStorage.getItem('accessToken')
      headers.authorization = accessToken || ''
    }
    try {
      const csrftoken = Cookies.get('csrfToken')
      headers['x-csrf-token'] = csrftoken || ''
    } catch (error) {}
    // // 将accessToken加到searchParams
    // const urlObj = new URL(config.url || '', config.baseURL)
    // urlObj.searchParams.set('access_token', accessToken || '')
    // config.url = urlObj.href

    // 格式化RequestData
    const contentTypeKey = Object.keys(config?.headers || {}).find((key) => key.toLowerCase() === 'content-type') || ''
    const contentType = (contentTypeKey ? config?.headers?.[contentTypeKey] : '') || ''
    if (!contentType.toString().toLowerCase().match('application/json')) {
      config.transformRequest = [(data) => new URLSearchParams(data).toString()]
    }
    config.headers = headers
    // console.log('config :>> ', config)
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  async (response: AxiosResponse<ResponseData>) => {
    const config = response.config as RequestConfig
    config?.showLoading && LoadingInterface.close()
    const resultCode = response?.data?.result?.resultCode.toString() || '0'
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (config.retried) {
      config.retried = false
      config?.showLoading && LoadingInterface.close()
      return response
    }
    // 判断是否满足请求重试条件
    const filterRegExpList = (Object.keys(beforeRetryRegExpMap) || []).filter((regExp) => new RegExp(regExp).test(resultCode))
    // 不需要重试
    if (filterRegExpList.length === 0) {
      config?.showLoading && LoadingInterface.close()
      if (resultCode === '0') {
        return response
      }
      config?.showToast && ToastInterface(errorFormatter(response, config?.url))
      return Promise.reject(response)
    }
    // 进行请求重试
    config.retried = true
    const configNew = await filterRegExpList.reduce(async (resolveFun, key) => {
      const _CONFIG = await resolveFun
      const CONFIG = await beforeRetryRegExpMap[key](_CONFIG)
      return CONFIG
    }, Promise.resolve(config))
    // 对响应错误做点什么
    config?.showLoading && LoadingInterface.close()
    return axiosInstance.request(configNew)
  },
  async (error) => {
    const config = error.config as RequestConfig
    config?.showLoading && LoadingInterface.close()
    config?.showToast && ToastInterface(errorFormatter(error, config?.url))
    return Promise.reject(error)
  }
)

// 通用错误码 https://open.dingtalk.com/document/orgapp-server/error-code
const beforeRetryRegExpMap: {
  [RegExp: string]: { (config: RequestConfig): Promise<RequestConfig> }
} = {
  // 无效的clientId或者clientSecret
  // invalidClientIdOrSecret:
  // 不合法的access_token
  // '^4010$|^4011$': async (config: RequestConfig) => {
  //   // TODO重新登录
  //   const { code } = await dd.runtime.permission.requestAuthCode({
  //     corpId: store.state.sys.corpId
  //   })
  //   const res = await API_BASE.login({ params: { code } })
  //   const accessToken = res.data.data
  //   localStorage.setItem('accessToken', accessToken)
  //   if (config.headers) {
  //     config.headers.authorization = accessToken || ''
  //   }
  //   // const urlObj = new URL(config.url || '', config.baseURL)
  //   // urlObj.searchParams.set('access_token', accessToken || '')
  //   // config.url = urlObj.href
  //   return config
  // }
}

function request<T = any, D = any>(
  { retried = false, checkAuth = true, showToast = true, showLoading = true, data, params, ...rest } = {} as RequestConfig<D>
) {
  // http://www.axios-js.com/zh-cn/docs/#axios-request-config
  return axiosInstance.request<T, AxiosResponse<T, D>, D>({
    retried,
    checkAuth,
    showToast,
    showLoading,
    data: data ? removeEmpty(data) : undefined,
    params: params ? removeEmpty(params) : undefined,
    ...rest
  } as RequestConfig<D>)
}
export default request
