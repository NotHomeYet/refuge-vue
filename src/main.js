// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Firebase from 'firebase'
import App from './App'
import router from './router'
import store from './store'
import {FIREBASE_CONFIG} from './store/modules/config.js'

Vue.use(Firebase)
Vue.config.productionTip = false
Vue.config.ignoredElements = [/^ion-/]

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    if (!store.getters.getCurrentUser) {
      next('/')
    } else {
      next()
    }
  } else {
    if (store.getters.getCurrentUser) {
      next('/home')
    } else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  beforeMount () {
    Firebase.initializeApp(FIREBASE_CONFIG)

    // Load up the store
    store.dispatch('loadFirebaseModule')
  }
})
