<template>
  <div class="magic-import-table">
    <mg-table
      :options="table"
      v-if="table"
    />
  </div>
</template>

<script>
  import model from '../../model'

  export default {
    props: {
      options: {},
      source: {}
    },
    computed: {
      currentSelections () {
        return this.table.getValue('selection') || []
      }
    },
    data () {
      const { columns, config = {} } = this.options
      const { selection, pagination } = config
      return {
        table: new model.Table({
          config: {
            size: 'mini',
            selection,
            pagination,
            localPagination: pagination,
            paginationOptions: { small: true }
          },
          columns: columns
        })
      }
    },
    watch: {
      source: {
        immediate: true,
        handler (val) {
          this.table.setSource('rows', val)
          this.table.setSource('total', val.length)
          this.$nextTick(() => this.table.callTable('toggleAllSelection', true))
        }
      },
      currentSelections: {
        immediate: true,
        handler (val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>
