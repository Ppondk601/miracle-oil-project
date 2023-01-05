<template>
  <div class="wrap">
    <!-- header -->
    <div class="header normal" id="navbar">
      <new-navbar />
    </div>
    <div class="header mobile">
      <mobile-nav />
    </div>
    <!-- page -->
    <Nuxt />
    <!-- footer -->
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrap {
  .header {
    z-index: 999;
    transition: top 0.3s;
    position: fixed;
    &.mobile {
      visibility: hidden;
    }
  }
}
@media only screen and (max-width: 768px) {
  .wrap {
    .header {
      &.normal {
        visibility: hidden;
      }
      &.mobile {
        visibility: visible;
      }
    }
  }
}
</style>
