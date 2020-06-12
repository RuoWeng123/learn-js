import { decorate } from '../utils'

export default decorate(function (target, name, descriptor, sync) {
  const raw = descriptor.value
  let lock = false
  descriptor.value = async function () {
    if (lock) return
    try {
      lock = true
      sync && (this[sync] = true)
      return await raw.apply(this, arguments)
    } finally {
      sync && (this[sync] = false)
      lock = false
    }
  }
})
