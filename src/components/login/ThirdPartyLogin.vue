<template>
  <ion-grid>
    <ion-row>
      <ion-col>
        <img src="/static/facebook.png" class='loginImg' @click="facebook" tappable/>
        <img src="/static/google-plus.png" class='loginImg' @click="google" tappable/>
        <img src="/static/twitter.png" class='loginImg' @click="twitter" tappable/>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
export default {
  name: 'ThirdPartyLogin',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  methods: {
    facebook () {
      this.$store.dispatch('loginWithFacebook')
        .then(user => console.log('facebook user: ' + JSON.stringify(user)))
        .catch(e => this.setMessage(e.message))
    },
    google () {
      this.$store.dispatch('loginWithGoogle')
        .then(user => console.log('google user: ' + JSON.stringify(user)))
        .catch(e => this.setMessage(e.message))
    },
    twitter () {
      this.$store.dispatch('loginWithTwitter')
        .then(user => console.log('twitter user: ' + JSON.stringify(user)))
        .catch(e => this.setMessage(e.message))
    }
  }
}
</script>

<style>
.loginImg {
  width: 75px;
}
</style>
