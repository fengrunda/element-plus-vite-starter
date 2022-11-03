import request from '@/api/network'
export interface LoginParams {
  code: string
}
export function login(payload?: RequestParams<LoginParams>) {
  return request<ResponseData<string>, LoginParams>({
    url: '/dingTalk/h5App/login',
    method: 'POST',
    ...payload?.config,
    checkAuth: false,
    data: payload?.params
  })
}
export interface GetDingTalkSdkSignParams {
  url: string
}
export interface GetDingTalkSdkSignData {
  signature: string
  nonceStr: string
  timeStamp: string
  agentId: string
  corpId: string
}
export function getDingTalkSdkSign(payload?: RequestParams<GetDingTalkSdkSignParams>) {
  return request<ResponseData<GetDingTalkSdkSignData>, GetDingTalkSdkSignParams>({
    url: '/dingTalk/h5App/getDingTalkSdkSign',
    method: 'POST',
    ...payload?.config,
    checkAuth: false,
    data: payload?.params
  })
}

export interface GetUserAccountData {
  userId: string
  userName: string
  dingTalkId: string
  zentaoUserId: string
  zentaoUserName: string
  zentaoAccountStatus: string
}
export function getUserAccount(payload?: RequestParams<any>) {
  return request<ResponseData<GetUserAccountData>, any>({
    url: '/dingTalk/h5App/getUserAccount',
    method: 'POST',
    ...payload?.config
  })
}
export function sendTestMsg() {
  return request<ResponseData<GetUserAccountData>, any>({
    url: '/dingTalk/robot/testSendMsg',
    method: 'GET'
  })
}
