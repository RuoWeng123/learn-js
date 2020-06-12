<template>
  <el-switch
    :disabled="!editable"
    v-model="currentValue"
  />
</template>

<script>
  import basic from './basic'

  export default {
    mixins: [basic],
    computed: {
      currentProps () {
        return {
          clearable: true,
          ...this.props
        }
      }
    }
  }
</script>
