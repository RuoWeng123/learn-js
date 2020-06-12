<template>
  <mg-popover-confirm
    @confirm="onConfirm"
    :validate="onValidate"
    content="您确定要提交吗？">
    <el-button type="primary">提交</el-button>
  </mg-popover-confirm>
</template>

<script>
  export default {
    methods: {
      onValidate(done) {
        // todo 在这里可以进行表单校验，
        // 校验通过后执行done函数，即可打开对话框， 若不执行则不会打开对话框
        setTimeout(done, 300)
      },
      onConfirm(e) {
        console.log('点击了确认', e)
      }
    }
  }
</script>
