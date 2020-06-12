<template>
  <div>
    <el-input-number
      style="width: 100%"
      v-if="editable"
      v-model="currentValue"
      v-bind="currentProps"
      v-on="currentEvents"
    />
    <span
      v-else>
      {{ currentText }}
    </span>
  </div>
</template>

<script>
  import basic from './basic'

  export default {
    mixins: [basic],
    computed: {
      currentProps () {
        return {
          controlsPosition: 'right',
          ...this.props
        }
      },
      currentText () {
        const precision = this.props.precision
        return precision ? parseFloat(this.value).toFixed(precision) : this.value
      }
    }
  }
</script>
