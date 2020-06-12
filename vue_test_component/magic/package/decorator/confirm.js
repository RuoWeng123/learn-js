import { MessageBox } from 'element-ui'
import { decorate } from '../utils'

export default decorate(function (target, name, descriptor, options = {}) {
  const { title = '提示', message = '此操作将永久删除该文件, 是否继续?', confirmButtonText, cancelButtonText } = options
  const raw = descriptor.value
  descriptor.value = async function () {
    let flag = true
    try {
      const content = typeof message === 'function' ? message.apply(this, arguments) : message
      await MessageBox.confirm(content, title, {
        dangerouslyUseHTMLString: true,
        confirmButtonText: confirmButtonText || '确 定',
        cancelButtonText: cancelButtonText || '取 消',
        type: 'warning'
      })
      flag = true
    } catch (e) {
      flag = false
    }
    return flag ? raw.apply(this, arguments) : null
  }
})
