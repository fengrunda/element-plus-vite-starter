import request from '@/api/network'

export function getSourceList({ params, config } = {} as RequestParams<any>) {
  return request<{ source: string }[], typeof params>({
    url: '/getSourceList/',
    method: 'GET',
    ...config,
    checkAuth: false,
    data: params
  })
}
export function getReport(
  { params, config } = {} as RequestParams<{
    source: string
    status?: number
  }>
) {
  return request<{ source: string }[], typeof params>({
    url: '/getreport/',
    method: 'POST',
    ...config,
    checkAuth: false,
    data: params
  })
}
export function changeIDStatus(
  { params, config } = {} as RequestParams<{
    id: string
    status: string
  }>
) {
  return request<{ message: string }, typeof params>({
    url: '/changeIDStatus/',
    method: 'POST',
    ...config,
    checkAuth: false,
    data: params
  })
}
