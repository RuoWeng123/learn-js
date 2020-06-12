<template>
  <div>
    <mg-full-screen :target="target"/>
    <div
      style="background: aqua;"
      ref="target">
      <p>全屏目标Dom,一般用在视频,目标dom没有设置背景色，会渲染为黑色，如有需求请为目标dom设置颜色以及样式</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        target: document.body
      }
    },
    mounted() {
      this.target = this.$refs.target
    }
  }
</script>
