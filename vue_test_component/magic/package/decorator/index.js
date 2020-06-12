import throttle from './throttle'
import debounce from './debounce'
import validate from './validate'
import confirm from './confirm'
import message from './message'
import ignore from './ignore'
import notify from './notify'
import buried from './buried'
import time from './time'
import lock from './lock'
import pipe from './pipe'
import log from './log'

window.$throttle = throttle
window.$debounce = debounce
window.$validate = validate
window.$confirm = confirm
window.$message = message
window.$ignore = ignore
window.$notify = notify
window.$buried = buried
window.$time = time
window.$lock = lock
window.$pipe = pipe
window.$log = log

export {
  throttle,
  debounce,
  validate,
  confirm,
  message,
  ignore,
  notify,
  buried,
  time,
  lock,
  pipe,
  log
}
