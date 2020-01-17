import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import ElementUI from 'element-ui'
import "./styles/index.less"
import 'view-design/dist/styles/iview.css'
import {Button, Circle} from 'view-design'
Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.component('Button',Button)
Vue.component('i-circle',Circle)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
