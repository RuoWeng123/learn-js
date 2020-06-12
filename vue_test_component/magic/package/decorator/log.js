/* eslint-disable */
import { decorate } from '../utils'

export default decorate(function (target, name, descriptor) {
  const raw = descriptor.value
  descriptor.value = async function () {
    console.log(`[log]-${ target.constructor.name }.${ name }:input`, ...arguments)
    const ret = await raw.apply(this, arguments)
    console.log(`[log]-${ target.constructor.name }.${ name }:output`, ret)
    return ret
  }
})
