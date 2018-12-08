<template>
  <form>
    <ion-item class="decorated">
      <ion-label>I am a</ion-label>
      <ion-select placeholder="Student/Parent/Etc" :value="user.class" @ionChange="userEvent('class', $event)">
        <ion-select-option value='s'>Student</ion-select-option>
        <ion-select-option value='p'>Parent</ion-select-option>
        <ion-select-option value='l'>Small Group Leader</ion-select-option>
        <ion-select-option value='v'>Visitor (More Info)</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-item class="decorated" v-if="needsTeam">
      <ion-label>My Crew</ion-label>
      <ion-select placeholder="Which Crew?" :value="user.team" @ionChange="userEvent('team', $event)">
        <ion-select-option v-for="(team, i) in userTeams" :key="i">
          {{team.name}}
        </ion-select-option>
      </ion-select>
    </ion-item>

    <ion-item class="decorated" v-if="user.class && (!needsTeam || user.team)">
      <ion-label floating>My Name</ion-label>
      <ion-input type="text" :value="user.displayName" @ionChange="userEvent('displayName', $event)"
       placeholder="First and Last"></ion-input>
    </ion-item>

    <br/>
    <div v-if="user.displayName">
      <div class="decorated">
        <ion-item>
          <ion-label floating>Email Address</ion-label>
          <ion-input type="email" :value="user.email" @ionChange="userEvent('email', $event)"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label floating>Password</ion-label>
          <ion-input type="password" :value="user.password" @ionChange="userEvent('password', $event)"></ion-input>
        </ion-item>
      </div>
      <p v-if="message" color="danger" font-weight="bold" class="padded">{{message}}</p>
    </div>

  </form>
</template>

<script>
export default {
  name: 'MoreInfo',
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
