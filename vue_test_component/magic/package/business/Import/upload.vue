<template>
  <div class="magic-import-upload">
    <input
      class="magic-import-upload-input"
      :accept="currentAccept"
      @change="handleClick"
      type="file"
      ref="input"
    />
    <div
      class="magic-import-upload-drop"
      @drop="handleDrop"
      @click="handleUpload"
      @dragover="handleDragover"
      @dragenter="handleDragover">
      <span>
        <i class="el-icon-upload"/>
        <span style="vertical-align: middle;">将文件拖拽至此, 或</span>
        <el-link type="primary">&nbsp;点击上传</el-link>
      </span>
    </div>
  </div>
</template>

<script>
  import { tools as Tools } from '../../global'

  export default {
    props: {
      beforeUpload: {
        type: Function,
        default: null
      },
      accept: {
        type: Array,
        default: () => (['xlsx', 'xls', 'txt'])
      }
    },
    computed: {
      currentAccept () {
        return this.accept.map(v => '.' + v).join(',')
      }
    },
    data () {
      return {
        excelData: {}
      }
    },
    methods: {
      handleDragover (e) {
        e.stopPropagation()
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
      },
      handleUpload () {
        this.$refs.input.click()
      },
      handleDrop (e) {
        e.stopPropagation()
        e.preventDefault()
        const files = e.dataTransfer.files
        if (files.length !== 1) {
          Tools.Notification({ type: 'error', title: '错误', message: '只支持单文件!' })
        } else {
          const file = files[0]
          if (!this.isValidate(file)) {
            Tools.Notification({ type: 'error', title: '错误', message: '只支持类型为 xlsx, xls, csv 的文件! ' })
          } else {
            this.onUpload(file)
          }
        }
      },
      handleClick (e) {
        const [file] = e.target.files || []
        if (!file) return
        this.onUpload(file)
      },
      onUpload (file) {
        this.$refs.input.value = null
        if (!this.beforeUpload) {
          this.onReader(file)
        } else {
          const before = this.beforeUpload(file)
          before && this.onReader(file)
        }
      },
      onReader (file) {
        this.$emit('reader', file)
      },
      isValidate (file) {
        const reg = new RegExp(`\\.(${ this.accept.join('|') })$`)
        return reg.test(file.name)
      }
    }
  }
</script>
