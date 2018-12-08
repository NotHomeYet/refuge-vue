
<template>
  <div class="dark">
    <div class="dark padded">
      <div>
        <span class="small padded"><a class="footerLink" href="https://goo.gl/maps/Eam2VzSTqYt" target="_blank">311 Castle Pines Pkwy, Castle Pines, CO 80108</a></span>
        <span class="small padded"><a class="footerLink" href="mailto:brandon@foundry.church"><strong>Email:</strong>brandon@foundry.church</a></span>
        <span class="small padded"><strong>Phone:</strong> 303.663.9755</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NavFooter'
}
</script>

<style>
  .footerImg {
    height: 35px;
    padding: 2px;
  }

  .small {
    font-size: 12px;
    color: white;
  }

  .footerLink {
    color: white;
    text-decoration: none;
  }

  .footerLink:visited {
    color: white;
  }
</style>
