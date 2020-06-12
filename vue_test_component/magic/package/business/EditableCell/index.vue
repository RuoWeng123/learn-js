<template>
  <component
    :props="props"
    :events="events"
    :source="source"
    :is="currentLayout"
    :editable="editable"
    v-model="currentValue"
  />
</template>

<script>
  import components from './index.js'
  export default {
    name: 'MgTableCell',
    props: {
      props: {},
      events: {},
      source: {},
      layout: {},
      value: {},
      editable: {}
    },
    computed: {
      currentLayout () {
        return typeof this.layout === 'string' ? (components['Column' + this.layout] || components.default) : this.layout
      },
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
