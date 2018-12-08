import Vue from 'vue'
import Vuex from 'vuex'
import { firebase } from './modules/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    firebase
  }
})
