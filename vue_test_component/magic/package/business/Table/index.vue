<script type="text/jsx">
  import Column from '../../model/Column.js'
  import TableColumn from './column.vue'
  import Table from '../../model/Table'
  import { mergeEvents, ContextMenu } from '../../utils'
  import { noLibError } from '../../utils/noLibError.js'
  import { sortablejs as Sortable } from '../../global.js'

  export default {
    name: 'MgTable',
    components: { TableColumn },
    props: {
      options: {}
    },
    data () {
      return {
        row: null,
        selection: [],
        sort: [],
        currentPage: 1,
        pageSize: null
      }
    },
    render (h) {
      return (
        <div class={ `magic-table ${ this.currentPagination ? 'is-pagination' : '' }` }>
          <div class="magic-table-main">
            { this.renderTable(h) }
          </div>
          <div class="magic-table-pagination">
            { this.renderPagination(h) }
          </div>
        </div>
      )
    },
    computed: {
      currentConfig () {
        return this.options.config
      },
      currentColumns () {
        return this.options.columns
      },
      currentStore () {
        return this.options
      },
      currentAction () {
        return this.currentConfig.action
      },
      currentActions () {
        return this.currentConfig.actions
      },
      currentPanels () {
        return this.currentConfig.panels
      },
      currentSerial () {
        return this.currentConfig.serial
      },
      currentSelection () {
        return this.currentConfig.selection
      },
      currentDropable () {
        return this.currentConfig.dropable
      },
      currentPagination () {
        return this.currentConfig.pagination
      },
      currentLocalPagination () {
        return this.currentConfig.localPagination
      },
      currentRows () {
        const key = this.currentConfig.rowsKey
        let rows = this.currentStore.getSource(key) || []
        if (this.currentLocalPagination) {
          const { pageSize, currentPage } = this.currentParams
          const start = (currentPage - 1) * pageSize
          const end = start + pageSize
          rows = rows.slice(start, end)
        }
        return rows
      },
      currentTotal () {
        const key = this.currentConfig.totalKey
        return this.currentStore.getSource(key)
      },
      currentCheckOnClickRow () {
        return this.currentConfig.checkOnClickRow
      },
      currentListenScrollBottom () {
        return this.currentConfig.listenScrollBottom
      },
      currentTableOptions () {
        return {
          size: 'medium',
          fit: true,
          border: true,
          stripe: true,
          height: '100%',
          emptyText: '暂无数据！！！',
          highlightCurrentRow: true,
          data: this.currentRows,
          ...this.currentConfig.props
        }
      },
      currentPaginationOptions () {
        const options = this.currentConfig.paginationOptions || {}
        const pageSizes = options.pageSizes || [25, 50, 100, 200, 500, 1000]
        return {
          total: this.currentTotal,
          currentPage: this.currentPage,
          pageSize: this.pageSize || pageSizes[0],
          pageSizes: pageSizes,
          layout: 'total, -> ,sizes, -> , prev, pager, next',
          ...options
        }
      },
      currentTableEvents () {
        const events = {
          'current-change': this.onCurrentChange,
          'selection-change': this.onSelectionChange,
          'sort-change': this.onSortChange,
          'row-click': this.onClickRow,
          'row-contextmenu': this.onContextMenu
        }
        return mergeEvents(events, this.currentConfig.events)
      },
      currentPaginationEvents () {
        return {
          'update:pageSize': this.onPageSizeChange,
          'update:currentPage': this.onCurrentPageChange
        }
      },
      currentParams () {
        const pagination = this.currentPagination
          ? {
            pageSize: this.pageSize || this.currentPaginationOptions.pageSizes[0],
            currentPage: this.currentPage
          }
          : {}
        return Object.assign(pagination, { sort: this.sort })
      }
    },
    methods: {
      renderTable (h) {
        return h('el-table', {
          props: this.currentTableOptions,
          on: this.currentTableEvents,
          ref: 'table'
        }, [
          this.renderColumns(h)
        ])
      },
      renderPagination (h) {
        if (!this.currentPagination) return
        return h('el-pagination', {
          props: this.currentPaginationOptions,
          on: this.currentPaginationEvents
        })
      },
      renderColumns (h) {
        const columns = this.getColumns(h)
        columns.unshift(this.getSerialColumn(h))
        columns.unshift(this.getSelectionColumn(h))
        columns.push(this.getActionsColumn(h))
        return columns
      },
      getColumns (h) {
        const slots = Column.GetColumnsFormSlots(this.$slots.default, Column.POSITION.table)
        const columns = this.currentColumns.map(column => {
          return {
            field: column.config.field,
            vNode: (
              <table-column
                options={ this.currentStore }
                column={ column }
              />
            )
          }
        })
        slots.forEach((column) => {
          const index = columns.findIndex(item => item.field === column.field)
          index === -1 ? columns.unshift(column) : columns.splice(index + 1, 0, column)
        })
        if (this.currentPanels && this.currentPanels.length > 0) {
          const findNodes = (panels) => {
            return panels.reduce((results, item) => {
              if (typeof item === 'string') {
                const obj = columns.find(v => v.field === item)
                obj && (results.push(obj.vNode))
              } else {
                const { children, ...props } = item
                const vNode = h('el-table-column', { props: Object.assign({ align: 'center' }, props) }, findNodes(children))
                results.push(vNode)
              }
              return results
            }, [])
          }
          return findNodes(this.currentPanels)
        } else {
          return columns.map(item => item.vNode)
        }
      },
      getSelectionColumn () {
        if (!this.currentSelection) return
        const selectable = typeof this.currentSelection === 'function' ? this.currentSelection : undefined
        const options = {
          width: 55,
          align: 'center',
          type: 'selection',
          selectable: selectable
        }
        if (typeof this.currentSelection === 'object') {
          Object.assign(options, this.currentSelection)
        }
        return (
          <el-table-column
            type={ options.type }
            width={ options.width }
            align={ options.align }
            selectable={ options.selectable }
          />
        )
      },
      getSerialColumn () {
        if (!this.currentSerial) return
        const options = {
          type: 'index',
          label: '序号',
          width: '50px',
          align: 'center',
          index: index => index + 1
        }
        if (typeof this.currentSerial === 'object') {
          Object.assign(options, this.currentSerial)
        }
        return (
          <el-table-column
            type={ options.type }
            label={ options.label }
            width={ options.width }
            align={ options.align }
            index={ options.index }
          />
        )
      },
      getActionsColumn (h) {
        if (!Object.keys(this.currentActions).length || this.currentAction.hide) return
        const props = Object.assign({
          align: 'center',
          minWidth: '120px',
          label: '操作'
        }, this.currentAction)
        return h('el-table-column', {
          props: props,
          scopedSlots: {
            default: (scope) => (
              <mg-buttons
                layout="icon"
                data={ scope }
                buttons={ this.currentActions }
              />
            )
          }
        })
      },
      onCurrentChange (row) {
        this.row = row
      },
      onSelectionChange (selection) {
        this.selection = selection
      },
      onSortChange ({ order, prop }) {
        this.sort = order ? [prop, order] : []
      },
      onCurrentPageChange (val) {
        this.currentPage = val
      },
      onClickRow (row) {
        if (!this.currentCheckOnClickRow) return
        const selectable = typeof this.currentSelection === 'function' ? this.currentSelection(row) : true
        selectable && this.$refs.table.toggleRowSelection(row)
      },
      onContextMenu (row, column, event) {
        if (Object.keys(this.currentActions).length === 0) return
        this.$refs.table.setCurrentRow(row)
        ContextMenu.show({ menus: this.currentActions, event: event, args: [{ row }] })
        event.stopPropagation()
        event.preventDefault()
      },
      onPageSizeChange (val) {
        this.pageSize = val
      },
      onRefresh () {
        this.currentStore.emitEvent(Table.Events.search, this.currentParams)
      },
      onDropRow () {
        if (!this.currentDropable) return
        if (!Sortable) return noLibError('sortablejs', 'Sortable', 'sortablejs')
        const tbody = this.$el.querySelector('.el-table__body-wrapper tbody')
        Sortable.create(tbody, {
          onEnd: event => {
            const options = {
              event: event,
              rows: [].concat(this.currentRows)
            }
            const callback = (rows) => {
              this.currentStore.setSource('rows', [])
              this.$nextTick(() => {
                this.currentStore.setSource('rows', rows)
              })
            }
            this.currentStore.emitEvent(Table.Events.drop, options, callback)
          }
        })
      },
      onScrollBottom () {
        if (!this.currentListenScrollBottom) return
        this._dom = this.$refs.table.bodyWrapper
        this._handler = () => {
          const scrollTop = this._dom.scrollTop
          const windowHeight = this._dom.clientHeight || this._dom.clientHeight
          const scrollHeight = this._dom.scrollHeight || this._dom.scrollHeight
          if (scrollTop + windowHeight === scrollHeight) {
            this.currentStore.emitEvent(Table.Events.scrollBottom, this.currentRows)
          }
        }
        this._dom.addEventListener('scroll', this._handler)
      },
      destroyScrollBottom () {
        if (!this.currentListenScrollBottom) return
        this._dom.removeEventListener('scroll', this._handler)
      }
    },
    created () {
      this.currentStore.create(this)
      this.onRefresh()
    },
    mounted () {
      this.onDropRow()
      this.onScrollBottom()
    },
    destroyed () {
      this.destroyScrollBottom()
    },
    watch: {
      row: {
        immediate: true,
        handler (val) {
          this.currentStore.setValue('row', val)
        }
      },
      selection: {
        immediate: true,
        handler (val) {
          this.currentStore.setValue('selection', val)
        }
      },
      currentParams: {
        immediate: true,
        handler (val) {
          this.currentStore.setValue('params', val)
        }
      },
      currentPage () {
        this.onRefresh()
      },
      pageSize () {
        this.onRefresh()
      },
      sort () {
        this.onRefresh()
      }
    }
  }
</script>
