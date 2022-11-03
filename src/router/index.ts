import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import workHours from './workHours'
// import task from './task'
// import technology from './technology'
// import workLog from './workLog'
declare module 'vue-router' {
  interface RouteMeta {
    // 是可选的
    title?: string
  }
}
const originRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'MainView',
    component: () => import(/* webpackChunkName: "base" */ '@/components/layouts/ContainerHeaderAside.vue'),
    redirect: { name: 'Home' },
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          title: '首页'
        },
        component: () => import(/* webpackChunkName: "base" */ '@/views/Home.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '404'
    },
    component: () => import(/* webpackChunkName: "base" */ '@/views/NotFound.vue')
  },
  {
    path: '/error',
    name: 'Error',
    meta: {
      title: ''
    },
    component: () => import(/* webpackChunkName: "base" */ '@/views/Error.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...originRoutes]
})

export default router
