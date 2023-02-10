<template>
  <div class="modal" ref="remove-modal">
    <button
      class="button close"
      @click="$refs['remove-modal'].classList.remove('active')"
    >
      <icon>close</icon>
    </button>
    <div class="modal-content">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: 999;
  pointer-events: none;
  .modal-content {
    max-height: 80vh;
  }
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
    opacity: 1;
    display: flex;
    pointer-events: all;
  }
}
</style>
