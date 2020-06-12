<template>
  <el-input
    class="magic-formColumn-text"
    @blur="onBlur"
    v-model="currentValue"
    v-bind="currentProps"
    v-on="currentEvents">
    <template
      v-if="currentPrefix"
      slot="prefix">
      <i
        v-if="currentPrefix.category === Category.icon"
        :class="currentPrefix.value"
        @click="onPrefixClick"
      />
      <span
        v-if="currentPrefix.category === Category.text"
        @click="onPrefixClick">
        {{ currentPrefix.value }}
      </span>
    </template>
    <template
      v-if="currentSuffix"
      slot="suffix">
      <i
        v-if="currentSuffix.category === Category.icon"
        :class="currentSuffix.value"
        @click="onSuffixClick"
      />
      <span
        v-if="currentSuffix.category === Category.text"
        @click="onSuffixClick">
        {{ currentSuffix.value }}
      </span>
    </template>
    <template
      v-if="currentAppend"
      slot="append">
      <i
        v-if="currentAppend.category === Category.icon"
        :class="currentAppend.value"
        @click="onAppendClick"
      />
      <el-button
        v-if="currentAppend.category === Category.text"
        @click="onAppendClick">
        {{ currentAppend.value }}
      </el-button>
    </template>
    <template
      v-if="currentPrepend"
      slot="prepend">
      <i
        v-if="currentPrepend.category === Category.icon"
        :class="currentPrepend.value"
        @click="onPrependClick"
      />
      <el-button
        v-if="currentPrepend.category === Category.text"
        @click="onPrependClick">
        {{ currentPrepend.value }}
      </el-button>
    </template>
  </el-input>
</template>

<script>
  import basic from './basic.js'
  import { emitEvent } from '../../utils/emitEvent.js'

  const Category = {
    text: 'text',
    icon: 'icon'
  }

  const Reg = /el-icon|iconfont/

  export default {
    mixins: [basic],
    computed: {
      currentProps () {
        return {
          clearable: !(this.props.suffix || this.props.append),
          placeholder: `请输入${ this.currentLabel }`,
          ...this.props
        }
      },
      currentPrefix () {
        const { prefix } = this.currentProps
        if (!prefix) return null
        return {
          category: prefix.match(Reg) ? Category.icon : Category.text,
          value: prefix
        }
      },
      currentSuffix () {
        const { suffix } = this.currentProps
        if (!suffix) return null
        return {
          category: suffix.match(Reg) ? Category.icon : Category.text,
          value: suffix
        }
      },
      currentAppend () {
        const { append } = this.currentProps
        if (!append) return null
        return {
          category: append.match(Reg) ? Category.icon : Category.text,
          value: append
        }
      },
      currentPrepend () {
        const { prepend } = this.currentProps
        if (!prepend) return null
        return {
          category: prepend.match(Reg) ? Category.icon : Category.text,
          value: prepend
        }
      }
    },
    data () {
      return {
        Category
      }
    },
    methods: {
      onBlur () {
        if (this.currentProps.type === 'number') {
          const val = parseFloat(this.currentValue)
          this.currentValue = isNaN(val) ? null : val
        }
      },
      onPrefixClick (e) {
        emitEvent(this.currentEvents, 'prefix-click', e)
      },
      onSuffixClick (e) {
        emitEvent(this.currentEvents, 'suffix-click', e)
      },
      onAppendClick (e) {
        emitEvent(this.currentEvents, 'append-click', e)
      },
      onPrependClick (e) {
        emitEvent(this.currentEvents, 'prepend-click', e)
      }
    }
  }
</script>
