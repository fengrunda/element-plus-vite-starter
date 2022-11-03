import axios, { AxiosRequestConfig, Method, AxiosResponse, AxiosPromise, AxiosRequestHeaders } from 'axios'

const axiosInstance = axios.create({
  baseURL: '../',
  headers: {
    'content-type': 'application/json'
  },
  timeout: 15 * 1000
})
axiosInstance.interceptors.response.use(
  (response): AxiosResponse => {
    // Do something with response data
    return response
  },
  (error) => {
    // Do something with response error
    if (error.message.match('Network Error')) {
      error.message = '网络不给力！'
    }
    return Promise.reject(error)
  }
)
export interface XhrParams<D> {
  url?: string
  method?: Method
  headers?: AxiosRequestHeaders
  params?: D
  options?: AxiosRequestConfig<D>
}
function xhrService<T = any, D = any>({ url, method, params, headers, ...options }: XhrParams<D>) {
  const userRequestData = !!['PUT', 'POST', 'PATCH'].find((methodName) => method?.toUpperCase() === methodName)
  const axiosParams: AxiosRequestConfig<D> = Object.assign(
    {
      method,
      url,
      data: userRequestData ? params : undefined,
      params: userRequestData ? undefined : params,
      headers,
      transformRequest: []
    },
    options
  )
  const contentTypeKey = Object.keys(axiosParams.headers || {}).find((key) => key.toLowerCase() === 'content-type') || ''
  const contentType = (contentTypeKey ? axiosParams?.headers?.[contentTypeKey] : '') || ''
  if (!contentType.toString().toLowerCase().match('application/json')) {
    axiosParams.transformRequest = [(data) => new URLSearchParams(data).toString()]
  }
  return axiosInstance.request<T, AxiosResponse<T>, D>(axiosParams)
}

export default xhrService
