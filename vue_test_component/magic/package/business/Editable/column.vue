<template>
  <el-table-column
    :prop="column.config.field"
    :label="column.config.label"
    v-bind="column.config.column">
    <editable-cell
      slot-scope="scope"
      :props="column.props"
      :events="getEvents(scope, column.events)"
      :source="currentSource"
      :layout="column.config.layout"
      :editable="getEditable(scope.$index, column)"
      :value="getValue(scope.row, column.config)"
      @input="val => setValue(scope.row, column.config, val)"
    />
  </el-table-column>
</template>

<script>
  import EditableCell from '../EditableCell/index.vue'
  import get from 'lodash/get'
  import set from 'lodash/set'

  export default {
    components: { EditableCell },
    props: {
      options: {},
      column: {}
    },
    computed: {
      currentSource () {
        return this.options.getSource(this.column.config.source)
      }
    },
    methods: {
      getValue (row, { field }) {
        return get(row, field)
      },
      setValue (row, { field }, val) {
        set(row, field, val)
      },
      getEditable (index, column) {
        if (this.options.config.disabled) return false
        const mode = this.options.config.editMode
        if (mode === 1) {
          return column.config.editable
        } else if (mode === 2) {
          const rowIndex = this.options.getValue('rowIndex')
          return column.config.editable && index === rowIndex
        }
        return false
      },
      getEvents (scope, events) {
        return Object.keys(events).reduce((result, key) => {
          result[key] = (...args) => events[key](scope, ...args)
          return result
        }, {})
      }
    }
  }
</script>
