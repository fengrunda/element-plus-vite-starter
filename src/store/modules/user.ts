import { ActionContext, MutationTree, ActionTree } from 'vuex'
import { RootState } from '../index'

const state = {
  userId: '',
  dingTalkId: '',
  userName: '',
  zentaoUserName: ''
}
const mutations: MutationTree<typeof state> = {
  SET_USER_INFO: (state, payload: typeof state): void => {
    state.userId = payload.userId
    state.dingTalkId = payload.dingTalkId
    state.userName = payload.userName
    state.zentaoUserName = payload.zentaoUserName
  }
}

const actions: ActionTree<typeof state, RootState> = {
  updateUserInfo: (CONTEXT: ActionContext<typeof state, RootState>, payload: typeof state): void => {
    CONTEXT.commit('SET_USER_INFO', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
