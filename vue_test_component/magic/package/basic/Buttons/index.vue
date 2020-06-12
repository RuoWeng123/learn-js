<template>
  <component
    :is="currentLayout"
    v-bind="$attrs">
    <slot/>
  </component>
</template>

<script>
  import button from './button.vue'
  import icon from './icon.vue'

  const component = { button, icon }

  export default {
    name: 'MgButtons',
    props: {
      layout: {
        type: String,
        default: 'button'
      }
    },
    computed: {
      currentLayout() {
        return component[this.layout]
      }
    }
  }
</script>
