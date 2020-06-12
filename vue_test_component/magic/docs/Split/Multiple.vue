<template>
  <div class="demo-split">
    <mg-split v-model="split3">
      <div slot="left" class="demo-split-pane no-padding">
        <mg-split v-model="split4" mode="vertical">
          <div slot="top" class="demo-split-pane">
            Top Pane
          </div>
          <div slot="bottom" class="demo-split-pane">
            Bottom Pane
          </div>
        </mg-split>
      </div>
      <div slot="right" class="demo-split-pane">
        Right Pane
      </div>
    </mg-split>
  </div>
</template>

<script>
  export default {
    name: 'Multiple',
    data () {
      return {
        split3: 0.5,
        split4: 0.5
      }
    }
  }
</script>

<style type="text/css" lang="stylus" scoped>
  .demo-split{
    height: 200px;
    border: 1px solid #dcdee2;
  }
  .demo-split-pane{
    padding: 10px;
  }
  .demo-split-pane.no-padding{
    height: 200px;
    padding: 0;
  }
</style>
