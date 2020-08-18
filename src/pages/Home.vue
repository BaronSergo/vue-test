<template>
  <div>
    <div class="page">
      <WorkArea />
    </div>
    <BlockInfoModal />
  </div>
</template>

<script>
import WorkArea from '../components/WorkArea'
import BlockInfoModal from '../components/Modal/Modal'
export default {
  components: { WorkArea, BlockInfoModal },
}
</script>

<style lang="scss">
.page {
  display: flex;
  flex-flow: column nowrap;
  place-items: center;
}

.buttons-wrap {
  display: flex;
  flex-flow: row nowrap;
  margin-top: 10px;

  button {
    &:first-child {
      margin-right: 10px;
    }
  }
}
</style>
