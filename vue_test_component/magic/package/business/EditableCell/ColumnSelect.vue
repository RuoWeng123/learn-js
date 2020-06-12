<template>
  <div>
    <mg-select
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
  import MgSelect from '../../basic/Select/index.vue'
  import basic from './basic'
  import get from 'lodash/get'

  export default {
    mixins: [basic],
    components: { MgSelect },
    computed: {
      currentProps () {
        return {
          placeholder: '',
          clearable: true,
          filterable: true,
          ...this.props
        }
      },
      currentMessage () {
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
        return Array.isArray(c) ? c.map(fn).join(',') : fn(c)
      }
    }
  }
</script>
