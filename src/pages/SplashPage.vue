<template>
  <div class="parentContent">
    <page-image :title="'Want More?'" src="/static/bg3.jpg"/>

    <div class="mainContent" v-if="!loaded">
      <h4>Please Wait..</h4>
      <ion-spinner class="spinner"/>
    </div>

    <div class="mainContent" v-if="loaded">
      <ion-text :color="pageMessage.variant" v-if="pageMessage.message">
        <h4>{{ pageMessage.message }}</h4>
      </ion-text>
      <ion-grid>
        <ion-row>
          <ion-col>
            <strong>Sign-in Using</strong>
            <thirdPartyLogin />
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <strong>- or -</strong>
            <form @submit="handleUserPass">
              <ion-item class="decorated">
                <ion-label floating>Email Address:</ion-label>
                <ion-input type="email" :value="user.email" @ionChange="userEvent('email', $event)"></ion-input>
              </ion-item>
              <ion-item class="decorated">
                <ion-label floating>Password:</ion-label>
                <ion-input type="password" :value="user.password" @ionChange="userEvent('password', $event)"></ion-input>
              </ion-item>
            </form>
            <br/>
            <ion-button color="secondary" @click="sendRecoveryEmail">Passwory Recovery Email</ion-button>
            <ion-button color="primary" @click="handleUserPass">Login / Signup</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>

      <br/>
      <br/>
      <div>
        <!-- todo move this to the menu when logged out -->
        <a href="https://foundry.church" target="_blank">Foundry.Church</a>&nbsp;&nbsp;&nbsp;
        <a href="https://itunes.apple.com/us/app/refuge-connect/id1207512076?ls=1&mt=8" target="_blank">Refuge Connect Privacy Policy</a>
      </div>

      <ion-hide-when platform="android,ios">
        <br/>
        <br/>
        <br/>
        <div>
          <a href="https://play.google.com/store/apps/details?id=church.foundry.refuge.connect" target="_blank"><img src="/static/playStore.png" height="50"></a>
          <a href="https://itunes.apple.com/us/app/refuge-connect/id1207512076" target="_blank"><img src="/static/apple.png" height="50"></a>
        </div>
      </ion-hide-when>

      <div class="dark padded">
        <div>
          <span class="small padded"><a class="footerLink" href="https://goo.gl/maps/Eam2VzSTqYt" target="_blank">311 Castle Pines Pkwy, Castle Pines, CO 80108</a></span>
          <span class="small padded"><a class="footerLink" href="mailto:brandon@foundry.church"><strong>Email:</strong>brandon@foundry.church</a></span>
          <span class="small padded"><strong>Phone:</strong> 303.663.9755</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BasePage from './BasePage.vue'
import PageImage from '../components/PageImage.vue'
import ThirdPartyLogin from '../components/login/ThirdPartyLogin.vue'

const PAGE = 'splashPage'

export default {
  name: PAGE,
  extends: BasePage,
  components: {
    pageImage: PageImage,
    thirdPartyLogin: ThirdPartyLogin
  },
  props: {
    useLoadTimer: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      user: {},
      loaded: !this.useLoadTimer
    }
  },
  methods: {
    // This is only needed as a work-around as the v-model:binding is only going one way currently (Ionic4.0.0-beta7)
    userEvent (member, $event) {
      Vue.set(this.user, member, $event.target.value)
    },
    handleUserPass () {
      if (!this.loaded) {
        this.setMessage('Login Failed: Please try again later')
        return
      }
      if (!this.user.email) {
        this.setMessage('Login Failed: Please provide a valid email')
        return
      }
      if (!this.user.password) {
        this.setMessage('Login Failed: Please provide a valid password')
        return
      }
      this.$store.dispatch('loginWithEmail', this.user)
        .catch(error => {
          if (error.message) {
            this.setMessage('Login Error: ' + error.message)
          }
        })
    },
    sendRecoveryEmail () {
      if (!this.loaded) {
        this.setMessage('Password Recovery Failed: Please try again in a moment')
        return
      }
      if (!this.user.email) {
        this.setMessage('Password Recovery Failed: Please provide a valid email address')
        return
      }
      this.$store.dispatch('sendRecoveryEmail', this.user)
        .then(() => {
          this.setMessage('Password recovery email sent to the provided user account', 'success')
        })
        .catch(error => {
          console.error('Password Recovery Error: ' + JSON.stringify(error))
          this.setMessage('Password Recovery Error: ' + (error.message || 'Unexpected error'))
        })
    }
  },
  created () {
    const self = this
    this.$store.dispatch('handleRedirectAuth')
      .then(() => {
        self.loaded = true
      })
      .catch(error => {
        console.error('Redirect Error: ' + JSON.stringify(error))
        self.setMessage('Redirect Error: ' + error.message)
        self.loaded = true
      })
  }
}
</script>

<style>
.loginImg {
  width: 75px;
}

.spinner {
  width: 80px;
  height: 80px;
  padding: 20px;
}
</style>
