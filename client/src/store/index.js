import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => {
    return {
      tabsList: state.tabsList,
      defaultActive: state.defaultActive
    }
  }
})
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  plugins: [vuexLocal.plugin]
})
