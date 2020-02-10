import Vue from 'vue'
import App from './App.vue'
import Icon from 'vue-svg-icon/Icon.vue'
import router from './router/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "./styles/index.less"
import iView from 'iview'
//import 'iview/dist/styles/iview.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(iView)


Vue.component('icon', Icon)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
