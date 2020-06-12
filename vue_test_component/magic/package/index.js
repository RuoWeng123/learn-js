import basic from './basic'
import business from './business'
import global from './global.js'
import model from './model'
import * as utils from './utils'
import * as decorator from './decorator'

export {
  model,
  utils,
  decorator
}

export default {
  install (Vue, options) {
    global.use(Vue, options)
    basic.forEach(v => Vue.component(v.name, v))
    business.forEach(v => Vue.component(v.name, v))
    Vue.mixin(utils.mixinOptions(Vue))
  }
}
