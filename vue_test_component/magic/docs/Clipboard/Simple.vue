<template>
  <div class="copy">
    <mg-clipboard
      class="copy-btn"
      :content="content"
    />
    <el-input
      class="copy-input"
      v-model="content"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        content: '使用默认布局复制'
      }
    }
  }
</script>

<style
  scoped
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus">
  .copy
    display: flex
    align-items: center
    margin-bottom: 16px

    &-btn
      flex: 0 0 100px

    &-input
      flex: 1
</style>
