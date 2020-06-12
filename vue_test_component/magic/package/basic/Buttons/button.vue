<template>
  <div class="magic-buttons">
    <component
      v-for="(button, index) in currentButtons"
      @click.stop="onClick(button, $event)"
      v-bind="button"
      :disabled="getDisabled(button)"
      :is="getLayout(button)"
      :key="index">
      {{ button.text }}
    </component>
    <slot/>
  </div>
</template>

<script>
  import Buttons from './buttons.js'

  export default {
    props: {
      disabled: {},
      buttons: {},
      data: {}
    },
    computed: {
      currentButtons () {
        const buttons = []
        for (let key in this.buttons) {
          const [action, ...attrs] = key.split(':')
          const button = Object.assign({}, Buttons[action] || Buttons.default)
          const val = this.buttons[key]
          Object.assign(button, this.getButton(attrs, action), { action }, typeof val === 'function' ? { click: val } : val)
          buttons.push(button)
        }
        return buttons
      }
    },
    methods: {
      onClick (button, event) {
        button.click && button.click({ ...button, event }, this.data)
      },
      getLayout (button) {
        return button.layout || 'el-button'
      },
      getDisabled (button) {
        return this.disabled && this.disabled.indexOf(button.action) > -1
      },
      getButton (array, action) {
        if (['space', 'divider'].indexOf(action) > -1) {
          return array.reduce((results, item) => {
            results.style = {
              margin: `0 ${ item }px`
            }
            return results
          }, {})
        } else {
          return array.reduce((results, item) => {
            if (['medium', 'small', 'mini'].indexOf(item) > -1) {
              results.size = item
            } else if (['primary', 'success', 'warning', 'danger', 'info', 'text'].indexOf(item) > -1) {
              results.type = item
            } else if (item === 'true' || item === true || item === 'false' || item === false) {
              results.plain = item === 'true' || item === true
            } else if (item.indexOf('el-icon') > -1) {
              results.icon = item
            } else {
              results.text = item
            }
            return results
          }, {})
        }
      }
    }
  }
</script>
