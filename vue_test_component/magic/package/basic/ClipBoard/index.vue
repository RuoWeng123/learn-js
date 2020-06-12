<template>
  <div class="magic-clipboard">
    <item-success
      v-for="(item, index) in items"
      :text="success"
      :key="index"
    />
    <span
      class="magic-clipboard-copy"
      :data-clipboard-text="content"
      ref="copy">
      <slot>
        <i class="el-icon-document-copy"/>
      </slot>
    </span>
  </div>
</template>

<script>
  import { noLibError } from '../../utils/noLibError.js'
  import { clipboard as ClipboardJS } from '../../global.js'
  import ItemSuccess from './success.vue'

  export default {
    name: 'MgClipboard',
    components: { ItemSuccess },
    props: {
      content: {
        type: String,
        default: ''
      },
      success: {
        type: String,
        default: '复制成功！'
      }
    },
    data () {
      return {
        items: []
      }
    },
    mounted () {
      if (!ClipboardJS) return noLibError('clipboard', 'ClipboardJS', 'clipboard')
      this.clipboard = new ClipboardJS(this.$refs.copy)
      this.clipboard.on('success', (e) => {
        this.items.push(e)
        setTimeout(() => this.items.pop(), 400)
      })
    },
    destroyed () {
      this.clipboard && this.clipboard.destroy()
    }
  }
</script>
