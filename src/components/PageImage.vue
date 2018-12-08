<template>
  <div>
    <div class="container">
      <div v-if="title">
        <h1 v-if="white" class="centered white">{{titleFormat}}</h1>
        <h1 v-else class="centered black">{{titleFormat}}</h1>
      </div>
      <img :src="src" class="pageImg"/>
    </div>
    <div class="colorBar primary"/>
  </div>
</template>

<script>
export default {
  name: 'PageImage',
  props: {
    src: {
      type: String,
      default: '/static/worship.jpg'
    },
    title: {
      type: String,
      default: ''
    },
    white: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    titleFormat () {
      return this.title.toUpperCase()
    }
  }
}
</script>

<style>
.container {
  position: relative;
  text-align: center;
  color: white;
  margin: 0;
  padding: 0;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
}

.pageImg {
  object-fit: cover;
  width: fill;
  height: 250px;
}

 .white {
   font-size: 40px;
   font-weight: 700;
   color: white;
   text-shadow: 0 0 15px #000000;
   width: 80%;
 }

 .black {
   font-size: 40px;
   font-weight: 700;
   color: black;
   text-shadow: 0 0 15px #FFFFFF;
   width: 80%;
 }

 .colorBar {
   width: 100%;
   min-height: 5px;
   max-height: 5px;
   margin: 0;
   padding: 0;
   position: relative;
   top: -5px;
 }
</style>
