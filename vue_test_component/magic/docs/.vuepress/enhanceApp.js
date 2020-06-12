import './fit.js'
import ElementUI from 'element-ui'
import VueHighlightJS from 'vue-highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import 'vue-highlight.js/lib/allLanguages.js'
import 'element-ui/lib/theme-chalk/index.css'
import magic from '../../package/index.js'
import '../../package/style.scss'
import printjs from 'print-js'
import ClipboardJS from 'clipboard'
import QRCode from 'qrcodejs2'

export default ({ Vue }) => {
  Vue.use(VueHighlightJS)
  Vue.use(ElementUI)
  Vue.use(magic, {
    printjs: printjs,
    clipboard: ClipboardJS,
    qrcodejs2: QRCode
  })
}
