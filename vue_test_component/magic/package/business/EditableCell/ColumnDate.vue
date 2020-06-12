<template>
  <div>
    <el-date-picker
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
  import basic from './basic'
  import { ShortCuts } from '../../utils/shortcuts.js'

  export default {
    mixins: [basic],
    computed: {
      currentProps() {
        const { pickerOptions } = this.props
        return {
          align: 'right',
          type: 'date',
          pickerOptions: Object.assign({ shortcuts: ShortCuts.date }, pickerOptions),
          ...this.props
        }
      }
    }
  }
</script>
