<script>
  import basic from './basic.js'

  export default {
    mixins: [basic],
    render(h) {
      const c = this.currentValue
      if (!c || c.length === 0 || !this.source || this.source.length === 0) return ''
      const { props = { label: 'label', value: 'value', children: 'children' }, showAllLevels = true } = this.props
      let results = []
      c.reduce((next, item) => {
        let o = next.find(v => v[props.value] === item)
        let text = ''
        if (o) {
          next = o[props.children] || []
          text = o[props.label]
        } else {
          next = []
          text = ''
        }
        results.push(text)
        return next
      }, this.source)
      const result = showAllLevels ? results.join('/') : results[results.length - 1]
      return h('span', result)
    }
  }
</script>
