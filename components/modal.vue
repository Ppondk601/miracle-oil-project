<template>
  <div class="modal" ref="remove-modal">
    <button
      class="button close"
      @click="$refs['remove-modal'].classList.remove('active')"
    >
      <icon>close</icon>
    </button>
    <slot> </slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: lighten($secondary-color, 5%);
  opacity: 0.8;
  position: fixed;
  justify-content: center;
  align-items: center;
  display: none;
  z-index: 999;
  button.close {
    position: fixed;
    top: 0;
    right: 0;
    margin: 1rem;
    background-color: transparent;
    width: 2rem;
    height: 2rem;
    aspect-ratio: 1/1;
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
  }
  &.active {
    display: flex;
  }
}
</style>
