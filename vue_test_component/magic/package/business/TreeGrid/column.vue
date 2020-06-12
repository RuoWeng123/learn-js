<template>
  <el-table-column
    :label="column.config.label"
    :prop="column.config.field"
    v-bind="currentProps">
    <template slot-scope="scope">
      <span
        v-if="state"
        :style="getIndentStyle(scope)"
      />
      <i
        v-if="state"
        @click="$emit('toggle', scope)"
        :style="getIconStyle(scope)"
        class="el-icon-caret-right"
      />
      <table-cell
        :scope="scope"
        :layout="column.config.layout"
        :props="column.props"
        :events="column.events"
        :source="currentSource"
      />
    </template>
  </el-table-column>
</template>

<script>
  import TableCell from '../TableCell/index.vue'

  export default {
    components: { TableCell },
    props: {
      options: {},
      column: {},
      state: {}
    },
    computed: {
      currentSource () {
        return this.options.getSource(this.column.config.source)
      },
      currentProps () {
        return {
          headerAlign: 'center',
          align: this.state ? 'left' : 'center',
          ...this.column.props
        }
      }
    },
    methods: {
      getIndentStyle ({ row }) {
        const { idField } = this.options.config
        const state = this.state[row[idField]]
        return state ? { marginLeft: (state.level - 1) * 20 + 'px' } : {}
      },
      getIconStyle ({ row }) {
        const { idField } = this.options.config
        const state = this.state[row[idField]]
        return state ? {
          marginRight: '4px',
          transform: state.isOpen ? 'rotate(90deg)' : '',
          visibility: state.isLeaf ? 'hidden' : 'visible'
        } : {}
      }
    }
  }
</script>
