<template>
  <div class="row">
    <div class="left">
      <label class="label">输入地址:</label>
      <el-input
        class="input"
        v-model="code"
      />
    </div>
    <div class="right">
      <mg-QRCode :value="code"/>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        code: 'https://cn.vuejs.org/'
      }
    }
  }
</script>

<style scoped>
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left {
    flex: 0.5;
  }

  .right {
    flex: 1;
    text-align: center;
  }

  .label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
  }
</style>
