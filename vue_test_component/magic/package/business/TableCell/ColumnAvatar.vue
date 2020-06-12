<template>
  <el-image
    :class="currentClass"
    :style="currentStyle"
    :src="currentSrc">
    <div
      class="magic-tableCell-avatar-error"
      slot="error">
      <i class="el-icon-picture-outline"/>
    </div>
  </el-image>
</template>

<script>
  import basic from './basic.js'

  export default {
    mixins: [basic],
    computed: {
      currentClass () {
        const { circle = true } = this.props
        return [
          'magic-tableCell-avatar',
          { 'is-circle': circle }
        ]
      },
      currentStyle () {
        const { size = 40 } = this.props
        return {
          width: size + 'px',
          height: size + 'px'
        }
      },
      currentPrefix () {
        const { upload = {} } = require('../../global.js').config
        const { prefix = upload.prefix } = this.props
        return prefix
      },
      currentSrc () {
        return this.currentValue ? this.currentPrefix + this.currentValue : ''
      }
    }
  }
</script>
