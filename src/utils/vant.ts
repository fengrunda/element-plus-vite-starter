import {
  Button,
  Checkbox,
  CheckboxGroup,
  NoticeBar,
  Cell,
  Swipe,
  SwipeItem,
  Popup,
  Image,
  Picker,
  Dialog,
  Field,
  Uploader,
  Tab,
  Tabs,
  PullRefresh,
  List,
  Icon
} from 'vant'

const vant = {
  install(Vue: { component: (arg0: string, arg1: any) => void }) {
    Vue.component(Button.name, Button)
    Vue.component(Checkbox.name, Checkbox)
    Vue.component(CheckboxGroup.name, CheckboxGroup)
    Vue.component(NoticeBar.name, NoticeBar)
    Vue.component(Cell.name, Cell)
    Vue.component(Swipe.name, Swipe)
    Vue.component(SwipeItem.name, SwipeItem)
    Vue.component(Popup.name, Popup)
    Vue.component(Image.name, Image)
    Vue.component(Picker.name, Picker)
    Vue.component(Dialog.Component.name, Dialog.Component)
    Vue.component(Field.name, Field)
    Vue.component(Uploader.name, Uploader)
    Vue.component(Tabs.name, Tabs)
    Vue.component(Tab.name, Tab)
    Vue.component(PullRefresh.name, PullRefresh)
    Vue.component(List.name, List)
    Vue.component(Icon.name, Icon)
  }
}

export default vant
