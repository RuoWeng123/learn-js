<script type="text/jsx">
  import basic from './basic.js'

  export default {
    mixins: [basic],
    render() {
      return (
        <el-color-picker
          size="medium"
          show-alpha={ true }
          value={ this.currentValue }
        />
      )
    }
  }
</script>
