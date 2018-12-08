<template>
  <div class="parentContent">
    <page-image :title="title"/>

    <div class="mainContent">
      <div v-if="boxes" v-for="(box, i) in boxes" :key="i">
        <pageBox :box="box"/>
      </div>

      <ion-button @click="logout">Logout</ion-button>
    </div>
  </div>
</template>

<script>
import BasePage from './BasePage.vue'
import PageImage from '../components/PageImage.vue'
import PageBox from '../components/PageBox.vue'
import { alerter } from '../util/alert.js'
import _ from 'lodash'

const PAGE = 'homePage'
const DELAY = 2000

export default {
  name: PAGE,
  extends: BasePage,
  components: {
    pageImage: PageImage,
    pageBox: PageBox
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    },
    getClassDetails: _.debounce(function () {
      let details = this.$store.getters.getCurrentUserDetails
      if (!details || !details.class) {
        alerter.customAlerter({
          header: 'Tell Us About Yourself!',
          inputs: [
            {
              name: 'class',
              type: 'radio',
              label: 'I\'m a Student',
              value: 's',
              checked: !details || details.class === 's'
            },
            {
              name: 'class',
              type: 'radio',
              label: 'I\'m a Parent',
              value: 'p',
              checked: details && details.class === 'p'
            },
            {
              name: 'class',
              type: 'radio',
              label: 'I\'m a Squad Leader',
              value: 'l',
              checked: details && details.class === 'l'
            },
            {
              name: 'class',
              type: 'radio',
              label: 'I Just Want More Info',
              value: 'v',
              checked: details && details.class === 'v'
            }
          ],
          buttons: [
            {
              text: 'Ok',
              handler: (clazz) => {
                this.$store.dispatch('upsertUserDetails', { class: clazz })
              }
            }
          ]
        })
      }
    }, DELAY)
  },
  created () {
    this.$store.dispatch('loadPage', PAGE)
    this.getClassDetails()
  }
}
</script>
