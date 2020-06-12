<template>
  <span
    class="magic-tableCell-status"
    :class="currentClass">
    {{ currentValue }}
  </span>
</template>

<script>
  import basic from './basic.js'

  export default {
    mixins: [basic],
    computed: {
      currentClass() {
        const { currentStatus } = this.props
        return currentStatus ? ('is-' + currentStatus.call(this, this.currentValue, this.currentRawValue)) : ''
      }
    }
  }
</script>
