<script type="text/jsx">
  import get from 'lodash/get'
  import Column from '../../model/Column.js'
  import TableColumn from './column.vue'
  import TreeGrid from '../../model/TreeGrid'
  import { mergeEvents } from '../../utils'

  export default {
    name: 'MgTreeGrid',
    components: { TableColumn },
    props: {
      options: {}
    },
    data () {
      return {
        row: null,
        sort: [],
        selection: [],
        tableData: [],
        stateStore: {},
        stateTree: []
      }
    },
    render (h) {
      return (
        <div class="magic-tree-grid">
          { this.renderTable(h) }
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
      currentRows () {
        const key = this.currentConfig.rowsKey
        return this.currentStore.getSource(key) || []
      },
      currentParams () {
        return { sort: this.sort }
      },
      currentSelection () {
        return this.currentConfig.selection
      },
      currentExpandAll () {
        return this.currentConfig.expandAll
      },
      currentDynamicAction () {
        return this.currentConfig.dynamicAction
      },
      currentTableOptions () {
        return {
          fit: true,
          border: true,
          stripe: true,
          height: '100%',
          size: 'medium',
          emptyText: '暂无数据！！！',
          highlightCurrentRow: true,
          data: this.tableData,
          rowStyle: ({ row }) => this.getStyleByRow(row),
          ...this.currentConfig.props
        }
      },
      currentGridOptions () {
        const { idField, pidField, orderField } = this.currentConfig
        return {
          primaryKey: idField,
          primaryCode: idField,
          referenceCode: pidField,
          nodeOrder: orderField
        }
      },
      currentTableEvents () {
        const events = {
          'selection-change': this.onSelectionChange,
          'current-change': this.onCurrentChange,
          'sort-change': this.onSortChange
        }
        return mergeEvents(events, this.currentConfig.events)
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
      renderColumns (h) {
        const columns = this.getColumns(h)
        columns.push(this.getActionsColumn(h))
        columns.unshift(this.getSelectionColumn(h))
        return columns
      },
      onSelectionChange (selection) {
        this.selection = selection
      },
      onCurrentChange (row) {
        this.row = row
      },
      onSortChange ({ order, prop }) {
        this.sort = order ? [prop, order] : []
      },
      onToggleRow ({ row }) {
        this.buildTreeByRow(row)
        this.buildDataState()
      },
      onRefresh () {
        this.currentStore.emitEvent(TreeGrid.Events.search, this.currentParams)
      },
      onRefreshRow () {
        if (!this.row) return
        const { primaryKey } = this.currentGridOptions
        const row = this.currentRows.find(v => v[primaryKey] === this.row[primaryKey])
        this.row = row || this.row
      },
      buildTree (expandAll) {
        let { primaryKey, primaryCode, referenceCode, nodeOrder } = this.currentGridOptions
        const sortOrder = (children) => {
          return children.sort((a, b) => {
            let _a = a.data[nodeOrder] || 999
            let _b = b.data[nodeOrder] || 999
            return Number(_a) - Number(_b)
          })
        }
        const BuildTree = (data, parentValue, level, parentSerial, parentIsOpen) => {
          let _serial = 1
          return data.reduce((results, item) => {
            if (item[referenceCode] === parentValue || (!parentValue && !item[referenceCode])) {
              let serial = [].concat(parentSerial, [_serial])
              if (expandAll) {
                let children = BuildTree(data, item[primaryCode], level + 1, serial, true)
                sortOrder(children)
                let state = {
                  parentIsOpen: true,
                  level: level,
                  isLeaf: !children.length,
                  serial: serial.join('-'),
                  isCreated: true,
                  isShow: true,
                  isOpen: true,
                  children: children
                }
                results.push({
                  data: item,
                  children: children,
                  state: state
                })
              } else {
                let oldStore = this.stateStore[item[primaryKey]]
                let isOpen = oldStore ? (parentIsOpen && oldStore.isOpen) : false
                let children = BuildTree(data, item[primaryCode], level + 1, serial, isOpen)
                sortOrder(children)
                let state = {
                  parentIsOpen: parentIsOpen,
                  level: level,
                  isLeaf: !children.length,
                  serial: serial.join('-'),
                  children: children
                }
                if (oldStore) {
                  Object.assign(state, {
                    isCreated: oldStore.isCreated,
                    isShow: oldStore.isShow,
                    isOpen: oldStore.isOpen
                  })
                } else {
                  Object.assign(state, {
                    isCreated: parentIsOpen,
                    isShow: parentIsOpen,
                    isOpen: false
                  })
                }
                results.push({
                  data: item,
                  children: children,
                  state: state
                })
              }
              _serial++
            }
            return results
          }, [])
        }
        this.stateTree = BuildTree(this.currentRows, null, 1, [], true)
      },
      buildTreeByRow (row) {
        const findNode = (tree, nodeId) => {
          let node = null
          tree.forEach(item => {
            if (item.data[primaryKey] === nodeId) {
              node = item
            } else if (!node) {
              node = findNode(item.children, nodeId)
            }
          })
          return node
        }
        const updateState = (children, parentIsOpen, isFirst) => {
          children.forEach(item => {
            if (isFirst) {
              item.state.isCreated = true
              item.state.isShow = parentIsOpen
            }
            item.state.parentIsOpen = parentIsOpen
            updateState(item.children, parentIsOpen ? item.state.isOpen : parentIsOpen)
          })
        }
        const { primaryKey } = this.currentGridOptions
        const id = row[primaryKey]
        const { isLeaf, isOpen } = this.stateStore[id]
        if (isLeaf) return
        let node = findNode(this.stateTree, id)
        node.state.isOpen = !isOpen
        updateState(node.children, !isOpen, true)
      },
      buildDataState () {
        const build = (tree, key) => {
          let data = []
          let state = {}
          tree.forEach(item => {
            !item.state.isCreated || data.push(item.data)
            state[get(item.data, key)] = item.state
            let { data: childData, state: childState } = build(item.children, key)
            data = data.concat(childData)
            state = Object.assign(state, childState)
          })
          return { data, state }
        }
        let { state, data } = build(this.stateTree, this.currentGridOptions.primaryKey)
        this.stateStore = state
        this.tableData = data
      },
      getSelectionColumn () {
        if (!this.currentSelection) return
        return (
          <el-table-column
            type="selection"
            width="55"
            align="center"
          />
        )
      },
      getActionsColumn (h) {
        if (!Object.keys(this.currentActions).length) return
        const props = Object.assign({
          align: 'center',
          minWidth: '120px',
          fixed: 'right',
          label: '操作'
        }, this.currentAction)
        return h('el-table-column', {
          props: props,
          scopedSlots: {
            default: (scope) => {
              const actions = this.currentDynamicAction
                ? this.currentDynamicAction({ ...this.currentActions }, scope.row, scope)
                : this.currentActions
              return (
                <mg-buttons
                  layout="icon"
                  data={ scope.row }
                  buttons={ actions }
                />
              )
            }
          }
        })
      },
      getStyleByRow (row) {
        const { primaryKey } = this.currentGridOptions
        const state = this.stateStore[row[primaryKey]]
        return (state && state.isShow && state.parentIsOpen) ? {} : { display: 'none' }
      },
      getNodesByRow (row) {
        const store = this.stateStore[row[this.currentGridOptions.primaryKey]]
        const findChidren = (children) => {
          return children.reduce((results, item) => {
            let child = findChidren(item.children)
            results = results.concat(child, [item.data])
            return results
          }, [])
        }
        const children = findChidren(store.children)
        return [row].concat(children)
      },
      getColumns (h) {
        const { nameField } = this.currentConfig
        const slots = Column.GetColumnsFormSlots(this.$slots.default, Column.POSITION.table)
        const columns = this.currentColumns.map(column => {
          return {
            field: column.config.field,
            vNode: (
              <table-column
                options={ this.currentStore }
                column={ column }
                state={ column.config.field === nameField ? this.stateStore : null }
                onToggle={ this.onToggleRow }
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
      }
    },
    created () {
      this.currentStore.create(this)
      this.onRefresh()
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
      sort () {
        this.onRefresh()
      },
      currentRows: {
        immediate: true,
        handler () {
          this.buildTree(this.currentExpandAll)
          this.buildDataState()
          this.onRefreshRow()
        }
      },
      tableData () {
        this.$nextTick(() => this.$refs.table.doLayout())
      }
    }
  }
</script>
