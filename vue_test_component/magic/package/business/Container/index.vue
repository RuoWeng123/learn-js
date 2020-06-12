<template>
  <div class="magic-container">
    <div
      v-if="$slots.left"
      :style="leftStyle"
      class="magic-container-item">
      <slot name="left"/>
    </div>
    <div
      v-if="$slots.center"
      :style="centerStyle"
      class="magic-container-item is-flex">
      <slot name="center"/>
    </div>
    <div
      v-if="$slots.right"
      :style="rightStyle"
      class="magic-container-item is-flex">
      <slot name="right"/>
    </div>
    <slot
      v-if="$slots.layer"
      name="layer"
    />
  </div>
</template>

<script>
  export default {
    name: 'MgContainer',
    props: {
      leftStyle: { default: 'width: 310px' },
      centerStyle: {},
      rightStyle: {}
    }
  }
</script>
