<template>
  <div style="width: 100%;height: 300px;">
    <Button type="primary">按钮</Button>
    <i-circle :percent="80">
      <span class="demo-Circle-inner" style="font-size:24px">80%</span>
    </i-circle>
    <i-circle :percent="80" stroke-linecap="square">
    </i-circle>
    <i-circle :percent="80" stroke-linecap="round">
      <span class="demo-Circle-inner" style="font-size:24px">80%</span>
    </i-circle>
    <i-circle :percent="80" stroke-linecap="round">
      <span class="demo-Circle-inner" style="font-size:24px">50%</span>
    </i-circle>
    <i-circle :percent="80" :stroke-color="circleColor">
      <span class="demo-Circle-inner" style="font-size:24px">80%</span>
    </i-circle>
    <i-circle :percent="70" :stroke-color="circleColor2" stroke-linecap="square" :dashboard="true">
      <span class="demo-Circle-inner" style="font-size:24px">70%</span>
    </i-circle>

  </div>
</template>
<script>
  export default{
    name:"",
    data(){
      return{
        data:80,
        circleColor:["#FFCB00","#FF9100"],
        circleColor2:["#EF4D68","#9860E4"]
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
