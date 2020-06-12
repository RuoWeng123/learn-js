import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import magic from 'magic'
import 'magic/style.scss'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini' })
Vue.use(magic)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
