<template>
  <div class="wrap">
    <mg-auto-loading
      position="center"
      type="lines"
      color="red"
      @load="init">
      <div
        class="item"
        v-for="i in count"
        :key="i">
        这里是第 {{ i }} 条
      </div>
    </mg-auto-loading>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      init(done) {
        setTimeout(() => {
          this.count = 100
          done()
        }, 1000)
      }
    }
  }
</script>

<style scoped>
  .wrap {
    height: 300px;
  }

  .item {
    line-height: 45px;
  }
</style>
