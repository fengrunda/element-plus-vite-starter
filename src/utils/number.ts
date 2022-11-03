// 精确计算方法
const floatAdd = (arg1: number, arg2: number) => {
  let r1, r2
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  const m = Math.pow(10, Math.max(r1, r2))

  return Number((arg1 * m + arg2 * m).toFixed(0)) / m
  // return (arg1 * m + arg2 * m) / m;
}

// 减
const floatSub = (arg1: number, arg2: number) => {
  let r1, r2
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  const m = Math.pow(10, Math.max(r1, r2))
  // 动态控制精度长度
  const n = r1 >= r2 ? r1 : r2
  return Number(((arg1 * m - arg2 * m) / m).toFixed(n))
}

// 乘
const floatMul = (arg1: number, arg2: number) => {
  let m = 0
  const s1 = arg1.toString()
  const s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
}

// 除
const floatDiv = (arg1: number, arg2: number) => {
  let t1 = 0
  let t2 = 0
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}

  const max = Math.max(t1, t2)

  const r1 = Number(arg1)
  const r2 = Number(arg2)

  return (r1 * Math.pow(10, max)) / (r2 * Math.pow(10, max))
}

const getFn = (fn: any) => {
  return (arg1: number, arg2: number) => {
    if (isNaN(arg1) || isNaN(arg2)) {
      return NaN
    }
    return fn(arg1, arg2)
  }
}

const add = getFn(floatAdd)
const sub = getFn(floatSub)
const mul = getFn(floatMul)
const div = getFn(floatDiv)

export { add, sub, mul, div }
