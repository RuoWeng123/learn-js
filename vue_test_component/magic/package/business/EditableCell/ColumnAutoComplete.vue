<template>
  <div>
    <el-autocomplete
      v-if="editable"
      v-model="currentValue"
      v-bind="currentProps"
      v-on="currentEvents"
    />
    <span
      v-else>
      {{ currentValue }}
    </span>
  </div>
</template>

<script>
  import basic from './basic.js'
  import get from 'lodash/get'

  export default {
    mixins: [basic],
    computed: {
      currentProps () {
        return {
          fetchSuggestions: this.filter,
          valueKey: 'value',
          suffixIcon: 'el-icon-caret-bottom',
          filterable: false,
          ...this.props
        }
      }
    },
    methods: {
      filter (query, cb) {
        const { filterable, valueKey } = this.currentProps
        query = filterable ? query : ''
        const source = query ? this.source.filter(v => {
          const label = get(v, valueKey) || ''
          return label.indexOf(query) > -1
        }) : this.source
        cb(source)
      }
    }
  }
</script>
