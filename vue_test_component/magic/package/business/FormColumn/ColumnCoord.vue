<template>
  <div class="magic-formColumn-coord">
    <el-input
      class="magic-formColumn-coord-item"
      v-for="column in currentColumns"
      @input="val => setValue(column, val)"
      :value="getValue(column)"
      :style="currentStyle"
      :key="column">
      <span
        class="magic-formColumn-coord-suffix"
        slot="suffix">
        {{ column }}
      </span>
    </el-input>
  </div>
</template>

<script>
  import basic from './basic.js'

  export default {
    mixins: [basic],
    computed: {
      currentValue: {
        get () {
          return this.value || {}
        },
        set (val) {
          this.$emit('input', val)
        }
      },
      currentStyle () {
        const width = this.currentProps.inputWidth
        return { width }
      },
      currentColumns () {
        return this.currentProps.columns || ['x', 'y', 'z']
      }
    },
    methods: {
      getValue (field) {
        return this.currentValue[field]
      },
      setValue (field, val) {
        val = parseFloat(val)
        val = isNaN(val) ? 0 : val
        this.currentValue = { ...this.currentValue, [field]: val }
      }
    }
  }
</script>
