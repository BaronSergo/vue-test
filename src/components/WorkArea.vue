<template>
  <div class="wrapper">
    <network
      class="network"
      :nodes="network.nodes"
      :edges="network.edges"
      :options="network.options"
      @select-node="showModalForChangeName"
    />
  </div>
</template>

<script>
let defNodes = [
  { id: 1, label: 'Node 1' },
  { id: 2, label: 'Node 2' },
  {
    id: 3,
    label: 'Node 3',
  },
  {
    id: 4,
    label: 'Node 4',
  },
  {
    id: 5,
    label: 'Node 5',
  },
]

let defEdges = [
  { id: 1, from: 1, to: 3 },
  { id: 2, from: 1, to: 2 },
  { id: 3, from: 2, to: 4 },
  { id: 4, from: 2, to: 5 },
  { id: 5, from: 3, to: 3 },
]

export default {
  name: 'WorkArea',
  data() {
    return {
      network: {
        nodes: defNodes.slice(0),
        edges: defEdges.slice(0),
        options: {
          nodes: {
            shape: 'circle',
            size: 24,
            color: {
              border: 'grey',
              highlight: {
                border: 'black',
                background: 'white',
              },
              hover: {
                border: 'orange',
                background: 'grey',
              },
            },
            font: { color: 'black' },
          },
          manipulation: {
            enabled: true,
            initiallyActive: true,
          }, // Опция активации модуля управления https://visjs.github.io/vis-network/docs/network/manipulation.html
          locale: 'ru', // Опция выбора языка
        },
      },
      selectNode: null,
      newLabel: null,
    }
  },
  mounted() {
    this.$root.$on('SAVE_NEW_TITLE', ({ label, selectItem }) => {
      /*
        Прослушивание события нажатия на кнопку сохранения и запись новых данных в существующий массив
       */
      this.newLabel = label

      for (let node of defNodes) {
        if (node.id === selectItem.id) {
          node.label = this.newLabel
        }
      }
    })
  },
  methods: {
    showModalForChangeName(context) {
      /*
        Функция открывает модальное окно и передает в него данные выбранного узла
       */
      for (let node of defNodes) {
        if (context.nodes[0] === node.id) {
          this.selectNode = node
        }
      }
      this.$modal.show('blockInfo', this.selectNode)
    },
  },
  beforeDestroy() {
    this.$root.$off('SAVE_NEW_TITLE') // Сбрасываем прослушивание события
  },
}
</script>

<style>
.wrapper {
  padding: 20px 50px;
  text-align: center;
}

.network {
  height: 800px;
  width: 600px;
  border: 1px solid #ccc;
  margin: 5px 0;
}
</style>
