import Vue from 'vue'
import Router from 'vue-router'
import SplashPage from '../pages/SplashPage.vue'
import Home from '../pages/Home.vue'
import PrivacyPolicy from '../pages/PrivacyPolicy.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SplashPage',
      component: SplashPage,
      props: true,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: PrivacyPolicy,
      props: true,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
