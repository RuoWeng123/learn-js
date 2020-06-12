<script>
  import basic from './basic.js'
  import { findNodeFromTree } from '../../utils'

  export default {
    mixins: [basic],
    render(h) {
      const c = this.currentValue
      if (!c || !this.source || this.source.length === 0) return ''
      const props = this.props.props || { label: 'label', value: 'value', children: 'children' }
      const nodes = findNodeFromTree(this.source, c instanceof Array ? c : [c], props.value, props.children)
      const result = nodes.reduce((results, item) => {
        if (item) results.push(item[props.label])
        return results
      }, []).join(',')
      return h('span', result)
    }
  }
</script>
