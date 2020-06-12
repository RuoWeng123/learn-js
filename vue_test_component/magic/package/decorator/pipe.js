import { decorate } from '../utils'

export default decorate(function (target, name, descriptor, pipes = []) {
  pipes.reverse().forEach(handle => handle(target, name, descriptor))
  const raw = descriptor.value
  descriptor.value = function () {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await raw.apply(this, arguments))
      } catch (err) {
        reject(err)
      }
    })
  }
})
