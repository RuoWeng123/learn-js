<template>
  <el-table-column
    :label="column.config.label"
    :prop="column.config.field"
    v-bind="column.props">
    <table-cell
      slot-scope="scope"
      :scope="scope"
      :layout="column.config.layout"
      :props="column.props"
      :events="column.events"
      :source="currentSource"
    />
  </el-table-column>
</template>

<script>
  import TableCell from '../TableCell/index.vue'

  export default {
    components: { TableCell },
    props: {
      options: {},
      column: {}
    },
    computed: {
      currentSource() {
        return this.options.getSource(this.column.config.source)
      }
    }
  }
</script>
