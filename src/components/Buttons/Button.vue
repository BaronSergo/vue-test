<template>
  <button type="button" :class="['btn', typeBtn !== 'add' ? 'btn-cancel' : '']">
    <span>{{ title }}</span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    title: {
      type: String,
      default: '',
    },
    typeBtn: {
      type: String,
      default: 'add',
    },
  },
}
</script>

<style lang="scss">
.btn {
  border: none;
  box-shadow: none;
  outline: none;
  padding: 8px 16px;
  background-color: #28a745;
  border-radius: 4px;
  cursor: pointer;

  span {
    font-size: 14px;
    line-height: 1.6;
    color: #fff;
  }

  &:focus {
    outline: none;
  }

  &-cancel {
    background-color: #dc3545;
  }
}
</style>
