import { decorate, throttle } from '../utils'

export default decorate(function (target, name, descriptor, { delay = 300, mustRunDelay = 3000 } = {}) {
    const raw = descriptor.value
    descriptor.value = throttle(raw, delay, mustRunDelay)
  }
)
