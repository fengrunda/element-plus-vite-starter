import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store, createLogger } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

import user from './modules/user'
import sys from './modules/sys'

const debug = import.meta.env.VITE_APP_BUILD_TYPE !== 'production'

export interface RootState {
  user: typeof user.state
  sys: typeof sys.state
}

export const key: InjectionKey<Store<RootState>> = Symbol('vuex')

const store = createStore<RootState>({
  modules: {
    user,
    sys
  },
  plugins: debug
    ? [
        createLogger({
          collapsed: true,
          logger: console
        })
      ]
    : []
})
export default store

// define your own `useStore` composition function
export function useStore(): Store<RootState> {
  return baseUseStore<RootState>(key)
}
