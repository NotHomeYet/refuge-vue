<template>
  <div>
  </div>
</template>

<script>
import { consts } from '../util/consts.js'

export default {
  name: 'BasePage',
  data () {
    return {
      pageMessage: {
        variant: '',
        message: ''
      }
    }
  },
  methods: {
    setMessage (message, variant) {
      this.pageMessage.message = message
      this.pageMessage.variant = variant || 'danger'
    }
  },
  computed: {
    title () {
      return consts.name
    },
    userTeams () {
      return this.$store.getters.getFirebaseTeams
    },
    users () {
      return this.$store.getters.getFirebaseUsers
    },
    boxes () {
      return this.$store.getters.getPageBoxes
    }
  }
}
</script>
