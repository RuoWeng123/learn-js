<template>
  <el-progress
    :percentage="currentValue"
    v-bind="currentProps"
  />
</template>

<script>
  import basic from './basic.js'

  export default {
    mixins: [basic],
    computed: {
      currentProps() {
        let props = this.props.currentProps
        props = props && props.call(this, this.currentValue, this.currentRawValue)
        return { ...this.props, ...props }
      }
    }
  }
</script>
