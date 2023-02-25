<template>
  <div class="container-auth">
    <alertbox ref="show-alertbox">
        <icon>check_circle</icon>
        <p>ส่งข้อมูลสำเร็จ</p>
    </alertbox>
    <button @click="toggleAlertbox">กดๆ</button>
  </div>
</template>

<script>
export default {
  data() {},
  methods: {
    toggleAlertbox() {
      this.$refs["show-alertbox"].$el.classList.add("active");

      setTimeout(() => {
        this.$refs["show-alertbox"].$el.classList.remove("active");
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
.container-auth {
  display: flex;
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  width: 100vw;
  height: 100vh;
}
</style>
