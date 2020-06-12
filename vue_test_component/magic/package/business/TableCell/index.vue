<template>
  <component
    :scope="scope"
    :props="props"
    :events="events"
    :source="source"
    :is="currentLayout"
  />
</template>

<script>
  import components from './index.js'

  export default {
    name: 'MgTableCell',
    props: {
      scope: {},
      props: {},
      events: {},
      source: {},
      layout: {}
    },
    computed: {
      currentLayout() {
        return typeof this.layout === 'string' ? (components['Column' + this.layout] || components.default) : this.layout
      }
    }
  }
</script>
