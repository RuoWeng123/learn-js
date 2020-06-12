<template>
  <div>
    <mg-print
      :print-file="url"
      type="image">
      url 请填写文件服务器 上的全路径
    </mg-print>
  </div>
</template>

<script>
  export default {
    name: 'PrintFileImage',
    data () {
      return {
        url: 'http://192.168.1.78:4000/xxx.png'
      }
    }
  }
</script>

<style scoped>

</style>
