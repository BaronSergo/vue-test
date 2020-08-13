<template>
  <div>
    <div class="page">
      <ViewBlock :blocks-data="itemsData" />
      <div class="buttons-wrap">
        <Button title="Add block" type-btn="add" v-on:click.native="addBlock" />
      </div>
    </div>
    <BlockInfoModal />
  </div>
</template>

<script>
import ViewBlock from '../components/ViewBlock'
import Button from '../components/Buttons/Button'
import BlockInfoModal from '../components/Modal/Modal'
export default {
  components: { BlockInfoModal, Button, ViewBlock },
  data() {
    return {
      itemsData: [
        {
          id: 1,
          title: 'first block',
        },
      ],
      newTitle: null,
    }
  },
  methods: {
    addBlock() {
      this.$modal.show('blockInfo') // Открытие модального окна для добавления элемента на страницу
    },
  },
  mounted() {
    this.$root.$on('ADD_NEW_BLOCK', (title) => {
      /*
        Прослушивание события на добавление нового элемента на страницу и запись его в существующий массив
       */
      this.itemsData.push({
        id: this.itemsData.length + 1,
        title: title,
      })
    })
    this.$root.$on('SAVE_NEW_TITLE', ({ titleBlock, newItem }) => {
      /*
        Прослушивание события нажатия на кнопку сохранения и запись новых данных в существующий массив
       */
      this.newTitle = titleBlock

      for (let item of this.itemsData) {
        if (item.id === newItem.id) {
          item.title = this.newTitle
        }
      }
    })
  },
  beforeDestroy() {
    /*
      Снятие прослушивания событий
     */
    this.$root.$off('ADD_NEW_BLOCK')
    this.$root.$off('SAVE_NEW_TITLE')
  },
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
