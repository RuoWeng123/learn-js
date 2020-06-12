<script type="text/jsx">
  import basic from './basic.js'

  export default {
    mixins: [basic],
    render() {
      return (
        <el-rate
          disabled={ true }
          value={ this.currentValue }
        />
      )
    }
  }
</script>
