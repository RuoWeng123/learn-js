<template>
  <div>
    <mg-print type="html" print-dom="printInstance">
      <div id="printInstance">
        <table name="print-table">
          <thead>
          <tr>
            <th>名字</th>
            <th>年龄</th>
            <th>性别</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>弱翁</td>
            <td>100</td>
            <td>男</td>
          </tr>
          <tr>
            <td>孙悟空</td>
            <td>500</td>
            <td>男</td>
          </tr>
          <tr>
            <td>妲己</td>
            <td>1000</td>
            <td>女</td>
          </tr>
          </tbody>
        </table>
        <el-input type="text" value="内容内容"></el-input>
      </div>

    </mg-print>
  </div>
</template>

<script>
  export default {
    name: 'PrintDom'
  }
</script>

<style scoped>

</style>
