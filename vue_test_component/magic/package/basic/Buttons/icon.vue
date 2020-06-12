<template>
  <div class="magic-buttons">
    <el-tooltip
      v-for="(button, index) in currentButtons"
      :content="button.text"
      :disabled="!button.tooltip"
      placement="top"
      effect="dark"
      :key="index">
      <i
        class="magic-buttons-icon"
        @click.stop="onClick(button, $event)"
        :disabled="getDisabled(button)"
        :class="button.icon"
      />
    </el-tooltip>
  </div>
</template>

<script>
  import Buttons from './icons.js'

  export default {
    props: {
      disabled: {},
      buttons: {},
      data: {}
    },
    computed: {
      currentButtons() {
        const buttons = []
        for (let key in this.buttons) {
          const [action, ...attrs] = key.split(':')
          const button = Object.assign({}, Buttons[action] || Buttons.default)
          const val = this.buttons[key]
          Object.assign(button, this.getButton(attrs), { action }, typeof val === 'function' ? { click: val } : val)
          buttons.push(button)
        }
        return buttons
      }
    },
    methods: {
      onClick(button, event) {
        button.click && button.click({ ...button, event }, this.data)
      },
      getDisabled(button) {
        return this.disabled && this.disabled.indexOf(button.action) > -1
      },
      getButton(array) {
        return array.reduce((results, item) => {
          if (item.indexOf('el-icon') > -1 || item.indexOf('iconfont') > -1) {
            results.icon = item
          } else if (item === 'true' || item === true || item === 'false' || item === false) {
            results.tooltip = item
          } else {
            results.text = item
          }
          return results
        }, {})
      }
    }
  }
</script>
