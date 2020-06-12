import { Notification } from 'element-ui'
import { decorate } from '../utils'

export default decorate(function (target, name, descriptor, { success, error } = {}) {
  const raw = descriptor.value
  descriptor.value = async function () {
    try {
      const ret = await raw.apply(this, arguments)
      success && Notification.success({ title: '温馨提示', message: success })
      return ret
    } catch (err) {
      error && Notification.error({ title: '错误提示', message: err.message || error })
      throw err
    }
  }
})
