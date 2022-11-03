import { ElLoading, ElMessage } from 'element-plus'
// import { getCurrentInstance } from 'vue'
// import { useStore } from '@/store'

// const store = useStore()
// const internalInstance = getCurrentInstance()
// const $dd = internalInstance?.proxy?.$dd
/**
 * 错误信息字符化
 * @param {*} error 错误对象
 * @param {String} methodName 方法名称
 */
export const errorFormatter = (error: any, methodName = '') => {
  let msg = ''
  if (error?.config && error.request) {
    console.error('AxiosError config', error?.config)
    console.error('AxiosError request', error?.request)
    console.error('AxiosError response', error?.response)
    console.error('AxiosError toJSON', error?.toJSON ? error?.toJSON() : '')
    msg = error?.data?.result?.resultDesc
  } else {
    msg = error?.message || (error instanceof Error ? error.toString() : JSON.stringify(error))
  }
  // 开发测试环境显示错误方法名
  // console.log('errorFormatter', store.state.loudongType)
  if (import.meta.env.VITE_APP_BUILD_TYPE !== 'production') {
    msg = methodName + ':' + msg + (error?.data?.result?.resultCode ? `(${error?.data?.result?.resultCode})` : '')
  }
  console.log('errorFormatter msg :>> ', msg)
  return msg
}
/**
 * 获取url上全部参数
 * @param url
 * @returns
 */
export const getUrlParams = (url: string): any => {
  const pattern = /(\w+)=((\w|\.|-|%)+)/gi
  const params: any = {}
  url.replace(pattern, (str, key, value): any => {
    params[key] = value
  })
  return params
}
/**
 * Toast接口
 * @param {*} options 错误信息或者配置对象
 */
export const ToastInterface = (text: string): void => {
  // console.log('ToastInterface :>> ', text)
  // Toast(text)
  ElMessage({
    message: text,
    grouping: true,
    type: 'error'
  })
}
/**
 * loading 类
 */
class Loading {
  methodQqueue: Array<string> = [] // 调用loading的方法队列
  loadingTarget: any = null
  open(methodName?: string) {
    this.methodQqueue.push(methodName || Math.round(Math.random() * 1000000000).toString())
    // console.log(`loading show ${this.methodQqueue.join(',')}`)
    // TODO show loading
    if (this.methodQqueue.length === 1) {
      // 引用第三方loading 开始
      this.loadingTarget = ElLoading.service({
        fullscreen: true,
        lock: true,
        text: '加载中...'
      })
      // console.log('loadingTarget :>> ', this.loadingTarget)
      // try { this.loadingTarget.instance.$el.parentElement._isLoading = false } catch (e) { }
      // console.log(this.loadingTarget)
      // 引用第三方loading 结束
    }
  }

  close() {
    // 使用同一个loading实例无缝衔接下一个loading
    const timer = setTimeout(() => {
      this.methodQqueue.shift()
      clearTimeout(timer)
      if (this.methodQqueue.length === 0) {
        // TODO show loading
        // console.log('loading close')
        // 引用第三方loading 开始
        try {
          this.loadingTarget.close()
        } catch (e) {}
        // 引用第三方loading 结束
      }
    }, 0)
  }
}
export const LoadingInterface = new Loading()

// 解决原生键盘导致页面错位
const DOMRectArr: Array<Event> = []
/**
 * 聚焦事件
 */
export const handleInputFocus = (e: Event) => {
  if (DOMRectArr.length > 0) {
    const { timeStamp = 0 } = DOMRectArr[DOMRectArr.length - 1] || {}
    if (e.timeStamp - timeStamp > 500) {
      DOMRectArr.push(e) // 存储事件对象
    } else {
      DOMRectArr[DOMRectArr.length - 1] = e // 短时间内切换输入对象则替换原来的事件
    }
  } else {
    DOMRectArr.push(e) // 存储事件对象
  }
}
/**
 * 失焦事件
 */
export const handleInputBlur = (e: Event) => {
  const event: any = DOMRectArr.shift() // 移除计数标识，并获取事件对象
  // const { target } = event
  let y = 1
  try {
    if (event && event.getBoundingClientRect) {
      const boundingClientRect = event.getBoundingClientRect() || {} // 获取事件元素位置
      y = boundingClientRect.y || 1
    }
  } catch (error) {}
  const timer = setTimeout(() => {
    // 延迟判断，以防切换下一个输入框时触发滚动
    clearTimeout(timer)
    if (DOMRectArr.length === 0) {
      // 最后一个输入框失焦时触发滚动
      // window.scrollTo(0, 1) // 滚回顶部
      window.scrollTo(0, window.scrollY + y) // 滚到当前元素位置（未经测试）
    }
  }, 200)
}

// 获取app浏览器版本
export const BROWSER_VERSION = (() => {
  const u = navigator.userAgent
  return {
    // 移动终端浏览器版本信息
    IE: u.indexOf('MSIE') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    weChat: !!u.match(/MicroMessenger/i), // 是否微信
    miniprogram: window.__wxjs_environment === 'miniprogram', // 是否小程序
    aliPay: !!u.match(/Alipay/i) // 是否支付宝
  }
})()

/**
 * 金额格式化
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
 * @param {*} amount
 * @param {String} style 格式化时使用的样式 decimal currency percent
 * @param {String} currency 在货币格式化中使用的货币符号 CNY USD EUR
 */
export function formatAmount(amount: any = 0, style = 'currency', currency = 'CNY', decimal = 2): string {
  const amountNum = Number(amount)
  // amountNum = amountNum >= 0 ? amountNum : 0
  let text = ''
  const params = {
    minimumFractionDigits: decimal,
    maximumFractionDigits: 8,
    style,
    currency
  }
  // params = Object.assign({}, ...Object.keys(params).filter(key => params[key] !== undefined && params[key] !== null).map(key => Object.assign({ [key]: params[key] })))
  try {
    text = amountNum.toLocaleString('zh', params)
  } catch (error) {
    console.error(error)
  }
  if (!text) {
    const len = amountNum.toString().split('.')[1] ? amountNum.toString().split('.')[1].length : decimal
    // const fixedNum = len > decimal ? (len > 8 ? 8 : len) : decimal
    const fixedNum = Math.pow(10, len > decimal ? (len > 8 ? 8 : len) : decimal)
    text = (style === 'currency' && currency === 'CNY' ? '￥' : '') + Math.round(amountNum * fixedNum) / fixedNum
  }
  return text
}
/**
 * 删除空属性
 * @param {any} obj - 输入对象
 * @param {boolean} [checkString=fasle] - 是否检查空字符
 * @returns {any}
 */
export function removeEmpty(obj: any, checkString = false): any {
  Object.keys(obj).forEach((key) => (obj[key] === null || obj[key] === undefined || (checkString && obj[key] === '')) && delete obj[key])
  return obj
}

/**
 * 暂停
 * @param {number} ms - 毫秒
 * @returns {any}
 */
export function sleep(ms: number): any {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 将base64转换为blob
 * @param {string} dataurl - base64
 * @returns {any}
 */
export function dataURLtoBlob(dataurl: string): any {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
