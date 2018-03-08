import  * as types from '../mutation-types'

const state = {
  baseData:0
};
const getters = {
  getBaseData: state => state.baseData
};
const mutations = {
  [types.SET_BASE_CONFIG](state,product){
    state.baseData = product
  }
};
const actions = {
  setBaseData({commit},product){
    commit(types.SET_BASE_CONFIG,product)
  }
};


export default {
  namespaced : true,
  state,
  getters,
  mutations,
  actions
}
