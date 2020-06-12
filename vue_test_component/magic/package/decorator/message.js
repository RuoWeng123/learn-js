import { Message } from 'element-ui'
import { decorate } from '../utils'

export default decorate(function (target, name, descriptor, { success, error } = {}) {
  const raw = descriptor.value
  descriptor.value = async function () {
    try {
      const ret = await raw.apply(this, arguments)
      success && Message.success(success)
      return ret
    } catch (err) {
      error && Message.error(err.message || error)
      throw err
    }
  }
})
