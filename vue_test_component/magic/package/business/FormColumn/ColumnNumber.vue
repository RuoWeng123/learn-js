<template>
  <mg-input-number
    class="magic-formColumn-input-number"
    v-model="currentValue"
    v-bind="currentProps"
    v-on="currentEvents"
  />
</template>

<script>
  import basic from './basic.js'

  export default {
    mixins: [basic],
    computed: {
      currentProps () {
        return {
          controlsPosition: 'right',
          ...this.props
        }
      }
    }
  }
</script>
