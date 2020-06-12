<template>
  <div class="magic-import-card">
    <div class="magic-import-card-title">{{ title }}</div>
    <slot/>
  </div>
</template>

<script>
  export default {
    props: {
      title: {}
    }
  }
</script>
