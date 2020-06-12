<template>
  <component
    v-model="currentValue"
    :is="currentLayout"
    :props="props || prop"
    :events="events"
    :source="source"
  />
</template>

<script>
  import components from './index.js'

  export default {
    name: 'MgFormColumn',
    props: {
      layout: {},
      value: {},
      source: {},
      events: {},
      props: {},
      prop: {}
    },
    computed: {
      currentLayout() {
        return typeof this.layout === 'string' ? components['Column' + this.layout] : this.layout
      },
      currentValue: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>
