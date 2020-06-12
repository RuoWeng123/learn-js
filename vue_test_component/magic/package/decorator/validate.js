import { Notification } from 'element-ui'
import { decorate } from '../utils'

export default decorate(function (target, name, descriptor, { handle } = {}) {
  const raw = descriptor.value
  descriptor.value = async function () {
    let flag = true
    if (this[handle]) {
      try {
        flag = await this[handle].apply(this, arguments)
      } catch (err) {
        flag = false
        Notification.error({ title: '错误提示', message: err.message })
      }
    }
    return flag ? raw.apply(this, arguments) : null
  }
})
