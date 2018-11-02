import Vue from 'vue'
import Vuex from 'vuex'
import user from './moudle/user.js'
import dictionary from './moudle/dictionary.js'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    user,
    dictionary
  },
  state: {
    activeMenu: 'yzy',
    openMenu: [],
    menuArr: [],
    userInfo: {}
  }
})

export default store
