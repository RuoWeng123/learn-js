/* eslint-disable */
import { decorate } from '../utils'

export default decorate(function (target, name, descriptor) {
  const raw = descriptor.value
  descriptor.value = async function () {
    try {
      return await raw.apply(this, arguments)
    } catch (err) {
      console.log('err', err)
    }
  }
})
