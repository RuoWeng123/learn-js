import { decorate, throttle } from '../utils'

export default decorate(function (target, name, descriptor, delay = 500) {
  const raw = descriptor.value
  descriptor.value = throttle(raw, delay)
})
