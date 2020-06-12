<template>
  <el-alert
    class="em-tip"
    effect="light"
    :closable="false"
    :show-icon="false"
    :style="currentStyle"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
  export default {
    name: 'MgTip',
    props: {
      color: {
        type: String
      },
      backgroundColor: {
        type: String
      }
    },
    computed: {
      currentStyle () {
        return { color: this.color, backgroundColor: this.backgroundColor }
      }
    }
  }
</script>
