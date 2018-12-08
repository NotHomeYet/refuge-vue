<template>
  <ion-card class="decorated" v-if="box">
    <ion-card-header>
      <ion-card-subtitle>{{box.date}}</ion-card-subtitle>
      <ion-card-title>{{box.title}}</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <span v-html="cleaned"></span>
    </ion-card-content>
  </ion-card>
</template>

<script>

export default {
  name: 'PageBox',
  props: {
    box: {
      type: Object,
      default: null
    }
  },
  computed: {
    cleaned () {
      return this.box.content.replace(/(?:\r\n|\r|\n)/g, '<br>')
    }
  }
}
</script>
