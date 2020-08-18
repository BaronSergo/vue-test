import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import './plugins/vue-vis-network'

import VModal from 'vue-js-modal/dist/index.nocss.js'
import 'vue-js-modal/dist/styles.css'

Vue.use(VModal)

Vue.config.productionTip = false

const api = axios.create({
  baseURL: 'http://localhost:3000/',
})

Vue.prototype.$eventBus = new Vue()

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
