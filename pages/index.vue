<template>
  <div class="wrapper">
    <!-- header -->
    <div class="header normal" id="navbar">
      <new-navbar />
    </div>
    <div class="header mobile">
      <mobile-nav />
    </div>
    <!-- main-content -->
    <div class="hero-section">
      <heroSection />
    </div>
    <div class="properties">
      <new-properties />
    </div>
    <div class="ingredient">
      <new-ingredient />
    </div>
    <!-- footer -->
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import NewIngredient from "~/components/newIngredient.vue";
import newNavbar from "~/components/newNavbar.vue";

export default {
  components: { newNavbar, NewIngredient },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: max-content;
  height: max-content;
  display: flex;
  flex-direction: column;
  .header {
    z-index: 999;
    transition: top 0.3s;
    position: fixed;
    &.mobile {
      visibility: hidden;
    }
  }
  .hero-section {
    width: max-content;
    height: max-content;
  }
  .properties {
    width: max-content;
    height: max-content;
  }
  .ingredient {
    width: max-content;
  }
}
@media only screen and (max-width: 768px) {
  .wrapper {
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
