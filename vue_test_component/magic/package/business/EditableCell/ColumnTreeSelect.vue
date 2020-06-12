<template>
  <div>
    <mg-treeselect
      v-if="editable"
      :source="source"
      v-model="currentValue"
      v-bind="currentProps"
      v-on="currentEvents"
    />
    <span
      v-else>
      {{ currentMessage }}
    </span>
  </div>
</template>

<script>
  import MgTreeselect from '../../basic/Treeselect/index'
  import { findNodeFromTree } from '../../utils'
  import basic from './basic'

  export default {
    mixins: [basic],
    components: { MgTreeselect },
    computed: {
      currentMessage () {
        const c = this.currentValue
        if (!c || !this.source || this.source.length === 0) return ''
        const props = this.props.props || { label: 'label', value: 'value', children: 'children' }
        const nodes = findNodeFromTree(this.source, c instanceof Array ? c : [c], props.value, props.children)
        return nodes.reduce((results, item) => {
          if (item) results.push(item[props.label])
          return results
        }, []).join(',')
      }
    }
  }
</script>
