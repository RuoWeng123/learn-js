<template>
  <div class="magic-file">
    <input
      class="el-upload__input"
      @change="onChoose"
      :multiple="multiple"
      name="file"
      type="file"
      ref="input"
    />
    <component
      @open="onStart"
      @remove="onRemove"
      @preview="onPreview"
      :currentList="currentFileList"
      :loadingList="loadingFiles"
      :disabled="disabled"
      :is="currentLayout"
    />
  </div>
</template>

<script>
  import text from './text.vue'
  import picture from './picture.vue'
  import { tools as Tools } from '../../global'

  export default {
    name: 'MgFile',
    inject: ['elForm'],
    props: {
      value: {
        type: Array,
        default: () => ([])
      },
      disabled: {
        type: Boolean,
        default: false
      },
      fileTypes: {
        type: Array,
        default: () => (['.jpg', '.png', '.gif', '.jpeg', '.pdf', '.doc', '.docx', '.mp4', '.zip', '.apk', '.dwg'])
      },
      validate: {
        type: Boolean,
        default: false
      },
      max: {
        type: Number,
        default: 99
      },
      multiple: {
        type: Boolean,
        default: true
      },
      category: {
        type: String,
        default: 'text'
      },
      upload: {
        type: Function,
        default () {
          const { upload = {} } = require('../../global.js').config
          return upload.handler
        }
      },
      prefix: {
        type: String,
        default () {
          const { upload = {} } = require('../../global.js').config
          return upload.prefix
        }
      }
    },
    computed: {
      _disabled () {
        return this.disabled || (this.elForm && this.elForm.disabled)
      },
      currentFileList () {
        return this.fileList.map(file => {
          return {
            name: file.name,
            url: this.prefix + file.url
          }
        })
      },
      currentLayout () {
        const components = { picture, text }
        return components[this.category]
      }
    },
    data () {
      return {
        fileList: [],
        loadingFiles: []
      }
    },
    methods: {
      onValidate (file) {
        if (!this.validate) return true
        if (!this.multiple && this.fileList.length > 0) {
          Tools.Notification({ type: 'error', title: '提示', message: '不允许选择多个文件' })
          return false
        }
        if (this.multiple && this.fileList && this.fileList.length >= this.max) {
          Tools.Notification({ type: 'error', title: '提示', message: '超出文件数量限制' })
          return false
        }
        let fileTypes = [].concat(this.fileTypes)
        if (fileTypes && fileTypes.length && file) {
          let fileName = file.name
          let matched = fileName.match(new RegExp(fileTypes.join('|') + '$/i'))
          if (!matched) {
            Tools.Notification({ type: 'error', title: '提示', message: '请选择符合要求的格式：' + fileTypes.join('、') })
          }
          return matched
        }
        return true
      },
      onChoose () {
        let files = [...this.$refs.input.files]
        if (files.length === 0) return
        if (files.length + this.fileList.length > this.max) {
          this.$refs.input.value = ''
          Tools.Notification({ type: 'error', title: '提示', message: `超出文件数量限制，最多上传${ this.max }个` })
          return
        }
        files.forEach(this.onUpload.bind(this))
      },
      async onUpload (file) {
        if (!this.upload || !this.onValidate(file)) return
        let uuid = Date.now() + Math.random()
        this.loadingFiles.push({ name: file.name, id: uuid })
        this.upload()(file)
          .then(res => {
            this.fileList.push({ name: res.name, url: res.url })
            this.$emit('input', this.fileList)
          })
          .catch(e => {
            Tools.Notification({ type: 'error', title: '提示', message: e.message })
          })
          .then(() => {
            let index = this.loadingFiles.findIndex(item => item.id === uuid)
            this.loadingFiles.splice(index, 1)
            if (this.loadingFiles.length === 0) this.$refs.input.value = ''
          })
      },
      onRemove (item, index) {
        Tools
          .MessageBox
          .confirm('是否要删除 ' + (item.name || '') + ' ？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.fileList.splice(index, 1)
            this.$emit('input', this.fileList)
          })
      },
      onStart () {
        this.$refs.input.click()
      },
      onPreview (file) {
        /* eslint-disable */
      }
    },
    watch: {
      value: {
        immediate: true,
        handler (val = []) {
          this.fileList = [].concat(val)
        }
      }
    }
  }
</script>
