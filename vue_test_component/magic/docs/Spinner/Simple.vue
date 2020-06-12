<template>
  <div class="list">
    <div
      class="item"
      v-for="(item, index) in list"
      :key="index">
      <mg-spinner :type="item"/>
      <mg-clipboard :content="getContent(item)">
        {{ item }}
      </mg-clipboard>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          'ios',
          'android',
          'ios-small',
          'bubbles',
          'circles',
          'crescent',
          'dots',
          'lines',
          'ripple',
          'spiral'
        ]
      }
    },
    methods: {
      getContent(item) {
        return `<mg-spinner type="${ item }"/>`
      }
    }
  }
</script>

<style scoped>
  .item {
    width: 50%;
    align-items: center;
    display: inline-flex;
    justify-content: space-between;
    padding: 5px 25px;
    box-sizing: border-box;
  }
</style>
