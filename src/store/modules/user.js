import  * as types from '../mutation-types'

const state = {
  curUser:'keren'
};
const getters = {
  getCurUser: state => state.curUser
};
const mutations = {
  [types.SET_CUR_USER](state,product){
    state.curUser = product
  }
};
const actions = {
  setCurUsr({commit},product){
    commit(types.SET_CUR_USER,product)
  }
};


export default {
  namespaced : true,
  state,
  getters,
  mutations,
  actions
}
