<template>
  <mg-file
    v-model="currentValue"
    v-bind="currentProps"
    v-on="currentEvents"
  />
</template>

<script>
  import MgFile from '../../basic/File/index.vue'
  import basic from './basic.js'

  export default {
    components: { MgFile },
    mixins: [basic],
    computed: {
      currentValue: {
        get() {
          return this.value || []
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>
