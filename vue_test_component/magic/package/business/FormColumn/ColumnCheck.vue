<template>
  <el-checkbox
    class="magic-formColumn-check"
    v-bind="currentProps"
    v-on="currentEvents"
    v-model="currentValue">
    {{ currentProps.title }}
  </el-checkbox>
</template>

<script>
  import basic from './basic.js'

  export default {
    mixins: [basic],
    computed: {
      currentValue: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>
