import type { App } from 'vue'
import {
  Icon as VanIcon,
  Calendar as VanCalendar,
  Picker as VanPicker,
  Popup as VanPopup,
  Field as VanField,
  Form as VanForm,
  Button as VanButton,
  Cell as VanCell,
  CellGroup as VanCellGroup,
  Toast,
  Badge as VanBadge,
  ConfigProvider as VanConfigProvider
} from 'vant'

export function registerGlobComp(app: App) {
  app
    .use(VanIcon)
    .use(VanButton)
    .use(VanPicker)
    .use(VanField)
    .use(VanForm)
    .use(VanCell)
    .use(VanCellGroup)
    .use(VanPopup)
    .use(VanCalendar)
    .use(Toast)
    .use(VanConfigProvider)
    .use(VanBadge)
}
