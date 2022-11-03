import { ActionContext, MutationTree, ActionTree } from 'vuex'
import { RootState } from '../index'

const state = {
  agentId: '',
  corpId: ''
}
const mutations: MutationTree<typeof state> = {
  SET_APP_INFO: (state, { agentId = '', corpId = '' } = {}): void => {
    state.agentId = agentId
    state.corpId = corpId
  }
}

const actions: ActionTree<typeof state, RootState> = {
  updateAppInfo: (CONTEXT: ActionContext<typeof state, RootState>, { agentId = '', corpId = '' } = {}): void => {
    CONTEXT.commit('SET_APP_INFO', { agentId, corpId })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
