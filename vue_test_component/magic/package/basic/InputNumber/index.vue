<template>
  <div
    @dragstart.prevent
    :class="[
      'el-input-number',
      inputNumberSize ? 'el-input-number--' + inputNumberSize : '',
      { 'is-disabled': inputNumberDisabled },
      { 'is-without-controls': !controls },
      { 'is-controls-right': controlsAtRight },
      { 'is-align-left': alignLeft || ((controlsAtRight || !controls) && unit) },
      { 'is-with-prefix': prefix }
    ]">
    <span
      class="el-input-number__decrease"
      role="button"
      v-if="controls && !readonly"
      v-repeat-click="decrease"
      :class="{'is-disabled': minDisabled}"
      @keydown.enter="decrease">
      <i :class="`el-icon-${controlsAtRight ? 'arrow-down' : 'minus'}`"></i>
    </span>
    <span
      class="el-input-number__increase"
      role="button"
      v-if="controls && !readonly"
      v-repeat-click="increase"
      :class="{'is-disabled': maxDisabled}"
      @keydown.enter="increase">
      <i :class="`el-icon-${controlsAtRight ? 'arrow-up' : 'plus'}`"></i>
    </span>
    <el-input
      style="text-align: left"
      ref="input"
      :value="displayValue"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="inputNumberDisabled"
      :size="inputNumberSize"
      :max="max"
      :min="min"
      :name="name"
      :label="label"
      @keydown.up.native.prevent="increase"
      @keydown.down.native.prevent="decrease"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @change="handleInputChange">
      <span
        class="el-input-number__unit"
        slot="suffix"
        v-if="unit">
        {{ unit }}
      </span>
      <slot
        name="prefix"
        slot="prefix"
        v-if="prefix">
        <span class="el-input-number__prefix">{{ prefix }}</span>
      </slot>
    </el-input>
  </div>
</template>

<script>
  import { InputNumber } from 'element-ui'

  export default {
    name: 'mg-input-number',
    extends: InputNumber,
    props: {
      unit: {
        type: [String, Number]
      },
      prefix: {
        type: [String, Number]
      },
      readonly: {
        type: Boolean
      },
      alignLeft: {
        type: Boolean
      }
    }
  }
</script>
