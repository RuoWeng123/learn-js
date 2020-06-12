<script type="text/jsx">
  import basic from './basic.js'

  export default {
    mixins: [basic],
    computed: {
      currentIcon () {
        switch (this.currentValue) {
          case true:
            return 'el-icon-check'
          case false:
            return 'el-icon-close'
          default:
            return 'el-icon-minus'
        }
      }
    },
    render () {
      return (
        <i
          style={ { fontSize: '20px' } }
          class={ this.currentIcon }
        />
      )
    }
  }
</script>
