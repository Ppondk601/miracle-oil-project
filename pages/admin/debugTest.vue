<template>
  <div>
    <div class="hee" v-if="!$fetchState.pending">
      <div class="hello" v-for="item in $store.state.products" :key="item.id">
        <img :src="item.image.url" />
      </div>
    </div>
    <h2>DEBUG</h2>
  </div>
</template>

<script>
import { db, storage } from "~/plugins/firebase";
export default {
  mounted() {
    console.log(storage, db);
  },
  async fetch() {
    try {
      this.$store.dispatch("fetchProduct");
    } catch (error) {
      alert("error");
    }
  },
};
</script>

<style lang="scss" scoped></style>
