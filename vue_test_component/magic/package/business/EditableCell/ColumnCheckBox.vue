<template>
  <div class="magic-editableColumn-text">
    <el-checkbox
      v-if="editable"
      v-model="currentValue"
      v-bind="currentProps"
      v-on="currentEvents"
    />
    <span
      v-else>
      {{ currentValue }}
    </span>
  </div>
</template>

<script>
  import basic from './basic'

  export default {
    mixins: [basic]
  }
</script>
