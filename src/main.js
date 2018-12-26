import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import animate from 'animate.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import moment from 'moment'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import Router from 'vue-router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.prototype.$moment = moment;

Vue.use(ElementUI, {locale})
Vue.use(Router)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  data(){
    return {}
  },
  render: h => h(App)
})
