<script type="text/jsx">
  import Column from '../../model/Column'

  export default {
    name: 'MgColumn',
    props: {
      position: {
        type: String
      },
      after: {
        type: String
      }
    },
    render () {
      if (Column.POSITION.table.indexOf(this.position) > -1) {
        return this.$slots.default
      } else if (Column.POSITION.editable.indexOf(this.position) > -1) {
        return this.$slots.default
      } else if (Column.POSITION.treeGrid.indexOf(this.position) > -1) {
        return this.$slots.default
      } else if (Column.POSITION.form.indexOf(this.position) > -1) {
        const cols = parseInt(this.$attrs.cols)
        return (
          <el-col span={ isNaN(cols) ? 24 : cols }>
            { this.$slots.default }
          </el-col>
        )
      } else {
        return null
      }
    }
  }
</script>
