<script>
  import basic from './basic.js'
  import get from 'lodash/get'

  export default {
    mixins: [basic],
    render (h) {
      const c = this.currentValue
      if (c === null || c === undefined) return ''
      if (!this.source) return c
      let { labelKey: label = 'label', outputKey: value = 'value' } = this.props
      const fn = (val) => {
        if (typeof val === 'object') {
          return get(val, label)
        } else {
          let obj = this.source.find(v => get(v, value) === val)
          return obj ? get(obj, label) : val
        }
      }
      const result = Array.isArray(c) ? c.map(fn).join(',') : fn(c)
      return h('span', result)
    }
  }
</script>
