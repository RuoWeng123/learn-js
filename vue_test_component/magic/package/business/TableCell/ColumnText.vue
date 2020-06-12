<script>
  import basic from './basic.js'

  export default {
    mixins: [basic],
    render(h) {
      return h('span', this.currentValue)
    }
  }
</script>
