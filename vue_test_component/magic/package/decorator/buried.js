import { decorate } from '../utils'

export default decorate(function (target, name, descriptor, params = {}) {
  const raw = descriptor.value
  if (typeof raw === 'function') {
    descriptor.value = function (...args) {
      try {
        return raw.apply(this, args)
      } finally {
        const options = {
          context: this,
          handler: name,
          time: Date.now(),
          params: params,
          args: args
        }
        window.dispatchEvent(new CustomEvent('buried-emit', { detail: options }))
      }
    }
  }
})
