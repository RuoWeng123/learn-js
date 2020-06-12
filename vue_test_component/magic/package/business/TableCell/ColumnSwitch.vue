<script type="text/jsx">
  import basic from './basic.js'

  export default {
    mixins: [basic],
    render() {
      return (
        <el-switch value={ this.currentValue }/>
      )
    }
  }
</script>
