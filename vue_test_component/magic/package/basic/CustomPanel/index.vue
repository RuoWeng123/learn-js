<template>
  <vue-draggable-resizable
    class="magic-custom-panel"
    @dragging="onDragging"
    @resizing="onResizing"
    v-bind="currentProps"
    v-on="$listeners">
    <slot/>
  </vue-draggable-resizable>
</template>

<script>
  import VueDraggableResizable from 'vue-draggable-resizable'
  import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

  export default {
    name: 'MgCustomPanel',
    components: { VueDraggableResizable },
    props: {
      value: {
        type: Object,
        default: () => ({})
      },
      handles: {
        type: Array,
        default: () => ['br']
      }
    },
    computed: {
      currentProps () {
        return {
          handles: this.handles,
          ...this.currentStyle,
          ...this.$attrs
        }
      },
      currentStyle: {
        get () {
          return this.value || {}
        },
        set (val) {
          this.$emit('input', val)
        }
      }
    },
    methods: {
      onResizing (x, y, w, h) {
        this.currentStyle = { x, y, w, h }
      },
      onDragging (x, y) {
        this.currentStyle = Object.assign({}, this.currentStyle, { x, y })
      }
    }
  }
</script>
