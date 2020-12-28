import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// services 发起ajax的实例
import services from './services/index'
Vue.prototype.$axios = services

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
