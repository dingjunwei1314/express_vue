import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import router from './router/index'
import axios from './common/axios'
import store from './store'
import { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

Vue.config.productionTip = false
Vue.prototype.$http = axios


new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})




