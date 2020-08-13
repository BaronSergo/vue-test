<template>
  <div class="block-wrap" ref="wrapItems">
    <drag-it-dude
      v-for="(item, index) in blocksData"
      :key="index"
      class="block"
      ref="dragItem"
      v-bind:class="{ focus: isFocus }"
      v-on:mousedown.native="focusBlock"
      v-on:mouseup.native="unFocusBlock"
    >
      <span class="block__title" v-on:click="openModal(item)">{{ item.id }}. {{ item.title }}</span>
    </drag-it-dude>
  </div>
</template>

<script>
import DragItDude from 'vue-drag-it-dude'
export default {
  name: 'ViewBlock',
  components: {
    DragItDude,
  },
  props: {
    blocksData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isFocus: false,
    }
  },
  methods: {
    focusBlock() {
      this.isFocus = true
    },
    unFocusBlock() {
      this.isFocus = false
    },
    openModal(item) {
      this.$modal.show('blockInfo', item)
    },
  },
}
</script>

<style lang="scss">
.block {
  border: 1px solid black;
  border-radius: 5px;
  padding: 30px 0;
  min-width: 105px;

  &.focus {
    cursor: move;
  }

  &__title {
    padding: 0 15px;
    font-size: 14px;
    line-height: 1.4;
    cursor: pointer;
  }

  &-wrap {
    width: 500px;
    height: 500px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: 1px solid gray;
  }
}
</style>
