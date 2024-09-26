<script>
export default {
  props: {
    isVisible: Boolean

  }
}
</script>

<template>
  <div v-if="isVisible" class="modal">
    <div class="content">
      <slot></slot>
    </div>
  </div>

</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}

.content {
  background: #1A171E;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  position: relative;
}

</style>