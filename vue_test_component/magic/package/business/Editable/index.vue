<script type="text/jsx">
  import Column from '../../model/Column.js'
  import EditableColumn from './column.vue'
  import Editable from '../../model/Editable'
  import { mergeEvents, noLibError } from '../../utils'
  import { sortablejs as Sortable } from '../../global.js'

  export default {
    name: 'MgEditable',
    components: { EditableColumn },
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
        <div class={ `magic-editable ${ this.currentPagination ? 'is-pagination' : '' }` }>
          <div class="magic-editable-main">
            { this.renderTable(h) }
          </div>
          <div class="magic-editable-pagination">
            { this.renderPagination(h) }
          </div>
        </div>
      )
    },
    computed: {
      currentStore () {
        return this.options
      },
      currentConfig () {
        return this.currentStore.config
      },
      currentColumns () {
        return this.currentStore.columns
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
      currentUseEmpty () {
        return this.currentConfig.useEmpty
      },
      currentRows () {
        const key = this.currentConfig.rowsKey
        return this.currentStore.getValue(key) || []
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
          emptyText: '点击此处开始新增！',
          highlightCurrentRow: true,
          data: this.currentRows,
          ...this.currentConfig.props
        }
      },
      currentPaginationOptions () {
        const options = this.currentConfig.paginationOptions
        return {
          total: this.currentTotal,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          pageSizes: [25, 50, 100, 200, 500, 1000],
          layout: 'total, -> ,sizes, -> , prev, pager, next',
          ...options
        }
      },
      currentTableEvents () {
        const events = {
          'current-change': this.onCurrentChange,
          'selection-change': this.onSelectionChange,
          'sort-change': this.onSortChange,
          'row-click': this.onClickRow
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
        columns.push(this.getEmptyColumn(h))
        return columns
      },
      getColumns (h) {
        const slots = Column.GetColumnsFormSlots(this.$slots.default, Column.POSITION.editable)
        const columns = this.currentColumns.map(column => {
          return {
            field: column.config.field,
            vNode: (
              <editable-column
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
        return (
          <el-table-column
            type="selection"
            width="50"
            align="center"
            reserveSelection={ true }
          />
        )
      },
      getSerialColumn () {
        if (!this.currentSerial) return
        return (
          <el-table-column
            type="index"
            label="#"
            width="50"
            align="center"
            index={ index => index + 1 }
          />
        )
      },
      getActionsColumn (h) {
        if (!Object.keys(this.currentActions).length) return
        const props = Object.assign({
          label: '操作',
          align: 'center',
          minWidth: '120px'
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
      getEmptyColumn () {
        return this.currentUseEmpty
          ? (
            <span
              slot="empty"
              onClick={ this.onClickEmpty }>
              点击此处开始新增
            </span>
          )
          : (
            <span
              slot="empty">
              暂无数据!!!
            </span>
          )
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
        this.$refs.table.toggleRowSelection(row)
      },
      onClickEmpty () {
        this.currentStore.emitEvent(Editable.Events.clickEmpty)
      },
      onPageSizeChange (val) {
        this.pageSize = val
      },
      onRefresh () {
        this.currentStore.emitEvent(Editable.Events.search, this.currentParams)
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
              this.currentStore.setValue('rows', [])
              this.$nextTick(() => {
                this.currentStore.setValue('rows', rows)
              })
            }
            this.currentStore.emitEvent(Editable.Events.drop, options, callback)
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
            this.currentStore.emitEvent(Editable.Events.scrollBottom, this.currentRows)
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
          this.currentStore.setValue('rowIndex', this.currentRows.indexOf(val))
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
      },
      currentRows () {
        this.$nextTick(() => this.$refs.table.doLayout())
      }
    }
  }
</script>
