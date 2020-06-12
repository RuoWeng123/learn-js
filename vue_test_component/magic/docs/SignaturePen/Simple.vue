<template>
  <div>
    <mg-signature-pen
      style="width: 700px; height:300px;"
      @saveImage="saveSignaturePen"/>
  </div>
</template>

<script>
  export default {
    name: 'simple',
    methods: {
      saveSignaturePen (data) {
        console.log(data)
      }
    }
  }
</script>
