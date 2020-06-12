<template>
  <div ref="printInstance">
   <mg-print type="json" :json-data="tableData" :json-header="tableHeader"></mg-print>
  </div>
</template>

<script>

  export default {
    name: 'Simple',
    data () {
      return {
        tableData: [
          { name: 'ruoweng', age: 24, phone: 18334705074 }
        ],
        tableHeader: ['name', 'age', 'phone']
      }
    }
  }
</script>

<style scoped>

</style>
