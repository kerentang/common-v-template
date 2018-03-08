import Vue from 'vue'
import Vuex from 'vuex'
import  * as types from './mutation-types'

import config from './modules/config'
import user from './modules/user'

Vue.use(Vuex);

const state = {
  indexData:'index data'
};
const getters = {
  getIndexData: state => state.indexData
};
const mutations = {
  [types.SET_INDEX_DATA](state,product){
    state.indexData = product
  }
};
const actions = {
  setIndexData({commit},product){
    commit(types.SET_INDEX_DATA,product)
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    config,
    user,
  }
})
