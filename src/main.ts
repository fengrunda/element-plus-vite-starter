import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store, { key } from '@/store'
import { getUrlParams, ToastInterface, LoadingInterface, sleep } from '@/utils/util'
// import "@/styles/element/index.scss";

// import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import '@/styles/index.scss'
import 'uno.css'

// If you want to use ElMessage, import it.
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/loading.scss'

let firstVisit = true
router.beforeEach(async (to, from, next) => {
  try {
    if (firstVisit) {
      firstVisit = false
      // LoadingInterface.open('firstVisit')
      // await sleep(2000)
      // LoadingInterface.close()
      // ToastInterface('啊啊啊啊')
    }
    next()
  } catch (error: any) {}
})
router.afterEach((to, from, next) => {
  //
})

const app = createApp(App)
// app.use(ElementPlus);
app.use(store, key).use(router).mount('#app')
