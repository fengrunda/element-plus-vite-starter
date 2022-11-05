import { ElCol, ElFormItem } from 'element-plus'
import { type Component } from 'vue'
export interface FORM_ITEM {
  value?: boolean | string | string[] | number | number[] | any
  defaultValue?: boolean | string | string[] | number | number[] | any
  visible?: boolean
  remark?: string
  componentMain?: Component
  componentChild?: Component
  content?: string
  optionMap?: {
    [key: string]: string
  }
  attrsFormItem?: InstanceType<typeof ElFormItem> | { [key: string]: any }
  attrs?: { [key: string]: any }
  listeners?: {
    // 'blur': (e) => { console.log('blur', e) }
    [eventName: string]: (e: any) => void | Promise<void>
  }
  attrsCol?: InstanceType<typeof ElCol> | { [key: string]: any }
}
// type a = typeof ElSelect.__defaults
// type a = typeof ElSelect.
// export const FORM_ITEM:FORM_ITEM =
export interface FORM_ITEMS {
  [itemName: string]: FORM_ITEM
}
export function initFormItem(option?: FORM_ITEM): FORM_ITEM {
  return {
    value: '',
    defaultValue: '',
    visible: true,
    remark: '',
    componentMain: undefined,
    componentChild: undefined,
    content: '',
    optionMap: {},
    attrsFormItem: {
      label: '',
      rules: []
    },
    attrs: {
      placeholder: ''
    },
    listeners: {
      // 'blur': (e) => { console.log('blur', e) }
    },
    attrsCol: {
      // xs: 24,
      // sm: 12,
      // md: 8,
      // lg: 6,
      // xl: 4
    },
    ...option
  }
}
