<template>
  <mg-input-file
    v-model="currentValue"
    v-bind="currentProps"
    v-on="currentEvents"
  />
</template>

<script>
  import basic from './basic'

  export default {
    mixins: [basic]
  }
</script>
