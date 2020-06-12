<template>
  <div
    class="magic-title"
    :class="{'has-describe': describe}">
    <div
      class="magic-title-text"
      v-text="title"
    />
    <div
      class="magic-title-describe"
      v-html="describe"
      v-if="describe"
    />
  </div>
</template>

<script>
  export default {
    name: 'MgTitle',
    props: {
      title: {},
      describe: {}
    }
  }
</script>
