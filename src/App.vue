<template>
  <ion-app id="spa">
    <ion-header>
      <nav-header/>
    </ion-header>
    <ion-content>
      <router-view />
    </ion-content>
    <ion-footer>
      <nav-footer/>
    </ion-footer>
    <ion-alert-controller></ion-alert-controller>
  </ion-app>
</template>

<script>
import NavHeader from './components/NavHeader.vue'
import NavFooter from './components/NavFooter.vue'

export default {
  name: 'spa',
  components: {
    navHeader: NavHeader,
    navFooter: NavFooter
  }
}
</script>

<style>
#spa {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.parentContent {
  width: auto;
  min-height: 100%;
  margin: 0;
  padding: 0;
  background-color: #F5F5F5;
}

.mainContent {
  max-width: 750px;
  text-align: center;
  margin: auto;
  padding: 20px;
  display: block;
  line-height: 24px;
  background-color: white;
}

.decorated {
  border-style: solid;
  border-left-color: #F25232;
  border-top: none;
  border-bottom: none;
  border-right: none;
  text-align: left;
}

.padded {
  padding: 20px;
}

.primary {
   background-color: #F25232;
}

.light {
  background-color: rgba(300, 300, 300, 0.75);
}

.dark {
  background-color: rgba(24, 24, 24, 0.75);
}
</style>
