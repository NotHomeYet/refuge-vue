<template>
  <ion-toolbar>
    <ion-buttons slot="start" menuToggle>
      <ion-button color="primary">
        <ion-icon slot="icon-only" name="more"></ion-icon>
      </ion-button>
      <ion-title><strong>{{ title }}</strong></ion-title>
    </ion-buttons>
    <ion-buttons slot="end" v-if="user">
      <ion-button>
        <ion-icon slot="icon-only" name="contact" style="padding: 2px"></ion-icon>{{ userName }}
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
  <!-- todo: build the menu (both logged in and logged out) -->
</template>

<script>
import { consts } from '../util/consts.js'

export default {
  name: 'NavHeader',
  computed: {
    title () {
      return consts.title
    },
    user () {
      return this.$store.getters.getCurrentUser
    },
    userName () {
      if (!this.user) return null
      return this.user.displayName || this.user.email
    }
  }
}
</script>
