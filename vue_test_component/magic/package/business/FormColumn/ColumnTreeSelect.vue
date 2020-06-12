<template>
  <mg-treeselect
    :source="source"
    v-model="currentValue"
    v-bind="currentProps"
    v-on="currentEvents"
  />
</template>

<script>
  import MgTreeselect from '../../basic/Treeselect/index.vue'
  import basic from './basic.js'

  export default {
    mixins: [basic],
    components: { MgTreeselect },
    computed: {
      currentProps() {
        return {
          placeholder: `请选择${ this.currentLabel }`,
          ...this.props
        }
      }
    }
  }
</script>
