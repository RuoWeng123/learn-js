<template>
  <el-checkbox-group
    v-model="currentValue"
    v-bind="currentProps"
    v-on="currentEvents">
    <component
      :is="currentLayout"
      v-for="(item, index) in source"
      :label="getValue(item)"
      :key="index">
      {{getLabel(item)}}
    </component>
  </el-checkbox-group>
</template>

<script>
  import basic from './basic.js'
  import get from 'lodash/get'

  export default {
    mixins: [basic],
    computed: {
      currentValue: {
        get() {
          return this.value || []
        },
        set(val) {
          this.$emit('input', val)
        }
      },
      currentLabelKey() {
        return this.props.labelKey || 'label'
      },
      currentValueKey() {
        return this.props.valueKey || 'value'
      },
      currentLayout() {
        const type = this.props.type ? `-${ this.props.type }` : ''
        return 'el-checkbox' + type
      }
    },
    methods: {
      getLabel(val) {
        return get(val, this.currentLabelKey)
      },
      getValue(val) {
        return get(val, this.currentValueKey)
      }
    }
  }
</script>
