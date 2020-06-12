<script>
  import basic from './basic.js'

  export default {
    mixins: [basic],
    render (h) {
      const { x = 0, y = 0, z = 0 } = this.currentValue || {}
      return h('span', `(${ x }, ${ y }, ${ z })`)
    }
  }
</script>
