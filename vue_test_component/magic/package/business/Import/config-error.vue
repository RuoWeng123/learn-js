<template>
  <div class="magic-import-error" v-if="error">
    <div class="magic-import-error-title">
      <i class="el-icon-warning"/>
      {{ error.title }}
    </div>
    <div class="magic-import-error-message">
      {{ error.message }}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      error: {}
    }
  }
</script>
