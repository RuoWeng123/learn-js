<template>
  <div class="magic-editableColumn-text">
    <el-input
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

  export default {
    mixins: [basic],
    computed: {
      currentValue: {
        get () {
          return this.value
        },
        set (val) {
          if (this.currentProps.type === 'number') {
            val = parseFloat(val)
            val = isNaN(val) ? null : val
          }
          this.$emit('input', val)
        }
      }
    }
  }
</script>
