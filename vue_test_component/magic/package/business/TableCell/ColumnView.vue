<template>
  <el-link
    v-bind="currentProps"
    @click="onClick(scope)">
    {{ currentText }}
  </el-link>
</template>

<script>
  import basic from './basic.js'

  export default {
    mixins: [basic],
    computed: {
      currentProps() {
        return {
          type: 'primary',
          size: 'mini',
          ...this.props
        }
      },
      currentText() {
        return this.props.currentValue ? this.props.currentValue(this.currentValue) : (this.currentValue && this.currentValue.length) ? '编辑' : '添加'
      }
    },
    methods: {
      onClick(scope) {
        const { click } = this.events
        click && click(scope.row, scope)
      }
    }
  }
</script>
