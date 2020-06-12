/* eslint-disable */
import { decorate } from '../utils'

let count = 0
export default decorate(function (target, name, descriptor, prefix = null) {
  prefix = prefix || `[timeAsync]-${ target.constructor.name }.${ name }`
  const raw = descriptor.value
  descriptor.value = async function () {
    const label = `${ prefix }-${ count }`
    count++
    console.time(label)
    try {
      return await raw.apply(this, arguments)
    } finally {
      console.timeEnd(label)
    }
  }
})
