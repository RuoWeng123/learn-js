<template>
  <div class="demo-split">
    <mg-split v-model="splitValue">
      <div slot="left"
           class="demo-split-pane">左侧内容</div>
      <div slot="right"
           class="demo-split-pane">右侧内容</div>
    </mg-split>
  </div>
</template>

<script>
  export default {
    name: 'SimpleOfLeftRight',
    data () {
      return {
        splitValue: 0.5
      }
    }
  }
</script>

<style type="text/css"
       lang="stylus"
       scoped>
  .demo-split {
    height: 200px;
    border: 1px solid #dcdee2;
  }

  .demo-split-pane {
    padding: 10px;
  }
</style>
