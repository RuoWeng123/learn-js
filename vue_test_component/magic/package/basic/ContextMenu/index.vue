<template>
  <ul
    @contextmenu.prevent.stop
    class="magic-contextMenu"
    :style="currentStyle"
    v-show="currentEvent"
    v-clickoutside="close">
    <template v-for="(menu, index) in currentMenus">
      <li
        v-if="menu.divider"
        class="magic-contextMenu-divider"
        :key="index"
      />
      <li
        v-else
        @click="click(menu)"
        class="magic-contextMenu-item"
        :key="index">
        <i
          v-if="menu.icon"
          class="magic-contextMenu-icon"
          :class="menu.icon"
        />
        <span
          v-text="menu.text"
        />
      </li>
    </template>
  </ul>
</template>

<script>
  import Menus from './menus.js'
  import { clickoutside } from '../../utils/clickoutside'

  export default {
    name: 'MgContextMenu',
    directives: { clickoutside },
    props: {
      appendToBody: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        currentEvent: null,
        menus: {}
      }
    },
    computed: {
      currentMenus () {
        const menus = []
        for (const key in this.menus) {
          const val = this.menus[key]
          if (val === false) continue
          const [action, ...attrs] = key.split(':')
          const menu = Object.assign({}, Menus[action] || Menus.default)
          Object.assign(menu, this.getButton(attrs), { action }, typeof val === 'function' ? { click: val } : val)
          menus.push(menu)
        }
        return menus
      },
      currentStyle () {
        if (this.currentEvent) {
          let { clientX, clientY } = this.currentEvent
          const right = clientX + 100
          const bottom = clientY + (30 * this.currentMenus.length)
          if (right > window.innerWidth) {
            clientX = clientX - (right - window.innerWidth) - 10
          }
          if (bottom > window.innerHeight) {
            clientY = clientY - (bottom - window.innerHeight) - 10
          }
          return { left: clientX - 20 + 'px', top: clientY + 'px' }
        } else {
          return {}
        }
      }
    },
    methods: {
      show ({ menus, event, args = [] }) {
        if (!menus) {
          this.currentEvent = null
          return
        }
        this.menus = menus
        this.currentArgs = args
        this.currentEvent = event
      },
      close () {
        this.currentEvent = null
        this.currentArgs = null
      },
      click (menu) {
        this.currentEvent = null
        menu && menu.click && menu.click(menu, ...this.currentArgs)
      },
      getButton (array) {
        return array.reduce((results, item) => {
          if (item.indexOf('el-icon') > -1) {
            results.icon = item
          } else if (item.indexOf('iconfont') > -1) {
            results.icon = item
          } else if (item === 'false') {
            results.icon = null
          } else {
            results.text = item
          }
          return results
        }, {})
      }
    },
    mounted () {
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    },
    destroyed () {
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  }
</script>
