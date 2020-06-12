<template>
  <el-input
    :disabled="disabled"
    v-model="form.name">
    <i
      v-if="form.url"
      @click="onView"
      slot="suffix"
      class="el-icon-view el-input__icon"
    />
    <el-button
      slot="append"
      @click="onSelect"
      type="primary">
      {{ currentText }}
      <input
        style="display: none;"
        :disabled="disabled"
        @change="onChange"
        type="file"
        ref="file"
      />
    </el-button>
  </el-input>
</template>

<script>
  import { fileUtils } from '../../utils/fileUtils'
  import { tools as Tools, config as Config } from '../../global'

  export default {
    name: 'MgInputFile',
    props: {
      disabled: {},
      value: {},
      upload: {
        type: Function,
        default () {
          const { upload = {} } = require('../../global.js').config
          return upload.handler
        }
      }
    },
    data () {
      return {
        loading: false,
        form: {
          name: '',
          url: ''
        }
      }
    },
    computed: {
      currentText () {
        return this.loading ? '上传中...' : this.form.url ? '重新选择' : '选择文件'
      }
    },
    methods: {
      onView () {
        Config.preview && Config.preview(this.form)
      },
      onSelect () {
        this.$refs.file.click()
      },
      onChange (e) {
        if (this.loading) return
        const [file] = [...e.target.files]
        this.form.name = fileUtils.name(file.name)
        if (this.upload) {
          this.loading = true
          this.upload()(file)
            .then(res => (this.form.url = res.url))
            .catch(e => Tools.Notification({ type: 'error', title: '提示', message: e.message }))
            .then(() => (this.loading = false))
        }
      }
    },
    watch: {
      value: {
        immediate: true,
        handler (val) {
          if (JSON.stringify(val) === JSON.stringify(this.form) || !val) return
          this.form = val
        }
      },
      form: {
        deep: true,
        handler (val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>
