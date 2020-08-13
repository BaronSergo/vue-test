<template>
  <modal name="blockInfo" width="300px" height="300px" @before-open="beforeOpen">
    <div class="modal">
      <div class="modal__body">
        <label for="title">Введите название блока</label>
        <input type="text" v-model="titleBlock" id="title" />
      </div>
      <div class="modal__btns">
        <Button
          v-if="editMode"
          type-btn="add"
          title="Сохранить изменение"
          v-on:click.native="saveChange"
        />
        <Button v-else type-btn="add" title="Добавить блок" v-on:click.native="addBlock" />
        <Button type-btn="cancel" title="Отменить" v-on:click.native="closeModal" />
      </div>
      <button type="button" class="modal__close" v-on:click="closeModal">X</button>
    </div>
  </modal>
</template>

<script>
import Button from '../Buttons/Button'
export default {
  name: 'BlockInfoModal',
  components: { Button },
  data() {
    return {
      item: Object(),
      titleBlock: null,
      editMode: false,
    }
  },
  methods: {
    beforeOpen(event) {
      /*
        Если при открытие модального окна есть входящие параметры, то определить это как редактирование эелемента (editMode)
        Обработка входящих параметов
       */
      if (event.params) {
        this.editMode = true
        this.item = event.params
        this.titleBlock = this.item.title
      }
    },
    saveChange() {
      /*
        Функция сохранения новых данных
        При вызове - сбрасываем все переменные, закрываем модальное окно, передаем в root.emit новые значения и выбранный элемент
       */
      this.$root.$emit('SAVE_NEW_TITLE', { titleBlock: this.titleBlock, newItem: this.item })
      this.$modal.hide('blockInfo')
      this.titleBlock = null
      this.editMode = false
    },
    addBlock() {
      /*
        Функция добавления нового элемента на страницу
        При вызове - если не пустое поле заголовка, закрываем мадальное окно, сбрасываем переменные
       */
      if (this.titleBlock) {
        this.$root.$emit('ADD_NEW_BLOCK', this.titleBlock)
        this.$modal.hide('blockInfo')
        this.titleBlock = null
      }
    },
    closeModal() {
      /*
        Функция закрытия модального окна
        При вызове - закрываем модальное окно, сбрасываем все переменные
       */
      this.$modal.hide('blockInfo')
      this.titleBlock = null
      this.editMode = false
    },
  },
}
</script>

<style lang="scss">
.modal {
  background: #fff;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  height: 100%;
  z-index: 100;
  padding: 10px;

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px;
  }

  &__btns {
    display: flex;
    flex-flow: row wrap;
    margin-top: 10px;
    justify-content: space-between;
    width: 100%;
  }

  input {
    padding: 6px;
    border-radius: 5px;
    margin-top: 10px;
  }
}
</style>
