<template>
  <transition name="magic-clipboard-transform">
    <span
      class="magic-clipboard-success"
      v-show="show">
      <i class="el-icon-document-checked"/>
      {{ text }}
    </span>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String
      }
    },
    data () {
      return {
        show: false
      }
    },
    mounted () {
      this.show = true
    }
  }
</script>
