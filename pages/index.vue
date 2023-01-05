<template>
  <div class="wrapper" id="contain">
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
  </div>
</template>

<script>
import NewIngredient from "~/components/newIngredient.vue";
import newNavbar from "~/components/newNavbar.vue";

export default {
  layout: "site",
  components: { newNavbar, NewIngredient },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: max-content;
  height: max-content;
  display: flex;
  flex-direction: column;
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
</style>
