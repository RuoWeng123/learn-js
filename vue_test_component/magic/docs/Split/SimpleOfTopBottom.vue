<template>
  <div class="demo-split">
    <mg-split v-model="splitValue" :mode="'vertical'">
      <div slot="top"
           class="demo-split-pane">顶部内容</div>
      <div slot="bottom"
           class="demo-split-pane">底部内容</div>
    </mg-split>
  </div>
</template>

<script>
  export default {
    name: 'SimpleOfTopBottom',
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
