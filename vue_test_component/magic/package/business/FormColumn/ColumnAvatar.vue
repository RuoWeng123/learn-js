<template>
  <div>
    <mg-avatar
      v-model="currentValue"
      v-bind="currentProps"
      v-on="currentEvents"
    />
  </div>
</template>

<script>
  import MgAvatar from '../../basic/Avatar/index.vue'
  import basic from './basic.js'

  export default {
    components: { MgAvatar },
    mixins: [basic],
    computed: {
      currentProps() {
        return {
          upload: this.currentHandler && this.onUpload,
          ...this.props
        }
      },
      currentHandler() {
        const { upload = {} } = require('../../global.js').config
        return upload.handler
      }
    },
    methods: {
      onUpload(file) {
        return this.currentHandler(file).then(res => res.url)
      }
    }
  }
</script>
