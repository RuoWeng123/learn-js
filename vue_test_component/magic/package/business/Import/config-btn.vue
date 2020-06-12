<template>
  <div class="magic-import-btn">
    <el-button
      @click="onReload"
      size="small"
      type="primary">
      <i class="el-icon-refresh-left"/> 重新导入
    </el-button>
    <span>
      <el-button
        size="small"
        @click="onCancel">
        取 消
      </el-button>
      <el-button
        @click="onConfirm"
        style="margin-left: 15px"
        size="small"
        :loading="loading"
        :disabled="disabled"
        type="primary">
        提 交
      </el-button>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      loading: Boolean,
      disabled: Boolean
    },
    methods: {
      onReload () {
        this.$emit('reload')
      },
      onCancel () {
        this.$emit('cancel')
      },
      onConfirm () {
        this.$emit('confirm')
      }
    }
  }
</script>
