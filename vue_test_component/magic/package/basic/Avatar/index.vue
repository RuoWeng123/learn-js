<template>
  <div class="magic-avatar">
    <input
      @change="onChange"
      style="display: none;"
      :multiple="false"
      type="file"
      ref="file"
    />
    <el-image
      class="magic-avatar-img"
      v-if="currentValue"
      :src="currentValue"
    />
    <i
      class="magic-avatar-icon el-icon-user-solid"
      v-else
    />
    <div
      v-if="!_disabled"
      class="magic-avatar-edit"
      @click="onEdit">
      修改头像
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MgAvatar',
    inject: ['elForm'],
    props: {
      value: String,
      prefix: {
        type: String,
        default() {
          const { upload = {} } = require('../../global.js').config
          return upload.prefix
        }
      },
      upload: Function,
      disabled: Boolean
    },
    computed: {
      _disabled() {
        return this.disabled || (this.elForm && this.elForm.disabled)
      },
      currentValue() {
        return this.value ? this.prefix + this.value : this.value
      }
    },
    methods: {
      onEdit() {
        this.$refs.file.click()
      },
      onChange(e) {
        const file = e.target.files[0]
        file && this.upload && this.upload(file).then(path => (this.$emit('input', path)))
      }
    }
  }
</script>
