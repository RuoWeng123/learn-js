<template>
  <MgAutoLoading
    class="magic-tree"
    :class="`is-${ currentSize }`"
    position="center"
    @load="onInit">
    <div
      class="magic-tree-title"
      v-if="currentConfig.title">
      <MgTitle
        :title="currentConfig.title"
        :describe="currentConfig.describe"
      />
      <span>
        <slot name="btn"/>
        <template v-if="currentEditable">
          <template v-if="isEdit">
            <el-tooltip
              content="取消"
              placement="top"
              effect="dark">
              <i
                @click="onCancel"
                class="magic-tree-icon el-icon-close"
              />
            </el-tooltip>
            <el-tooltip
              content="保存"
              placement="top"
              effect="dark">
              <i
                @click="onSave"
                class="magic-tree-icon el-icon-check"
              />
            </el-tooltip>
          </template>
          <el-tooltip
            v-else
            content="点击编辑"
            placement="top"
            effect="dark">
            <i
              @click="onEdit"
              class="magic-tree-icon el-icon-edit"
            />
          </el-tooltip>
        </template>
        <el-tooltip
          v-if="isAllowCreate && !isEdit"
          :content="currentConfig.addDescribe"
          placement="top"
          effect="dark">
          <i
            @click="onCreate"
            class="magic-tree-icon el-icon-plus"
          />
        </el-tooltip>
      </span>
    </div>
    <div
      class="magic-tree-top"
      v-if="currentSearchable">
      <el-input
        class="magic-tree-input"
        v-model="currentValue"
        v-bind="currentSearchOptions"
      />
      <span
        style="margin-left: 10px;"
        v-if="$slots.add">
        <slot name="add"/>
      </span>
    </div>
    <div class="magic-tree-content">
      <el-tree
        @node-contextmenu="onContextMenu"
        @current-change="onChange"
        @node-click="onClick"
        @node-drop="onDrop"
        :data="currentTree"
        :filter-node-method="onFilter"
        v-bind="currentTreeOptions"
        v-on="currentTreeEvents"
        ref="tree"
      />
      <MgLayer
        v-bind="currentLayer"
        ref="form">
        <MgForm
          :options="currentForm">
          <slot/>
        </MgForm>
      </MgLayer>
    </div>
  </MgAutoLoading>
</template>

<script type="text/jsx">
  import MgAutoLoading from '../../basic/AutoLoading/index.vue'
  import MgLayer from '../../basic/Layer/index.vue'
  import MgTitle from '../../basic/Title/index.vue'
  import Tree from '../../model/Tree.js'
  import { ContextMenu } from '../../utils/ContextMenu.js'
  import { parseTree } from '../../utils/parseTree'

  export default {
    name: 'MgTree',
    components: {
      MgTitle,
      MgLayer,
      MgAutoLoading
    },
    props: {
      options: {}
    },
    data () {
      return {
        isEdit: false,
        showCheckbox: false
      }
    },
    computed: {
      currentStore () {
        return this.options
      },
      currentConfig () {
        return this.currentStore.config
      },
      currentForm () {
        return this.currentStore.form
      },
      currentTree () {
        return this.currentStore.getSource(this.currentConfig.treeKey)
      },
      currentActions () {
        return this.currentStore.actions
      },
      currentLayer () {
        return this.currentStore.layer
      },
      currentSearchOptions () {
        return this.currentConfig.searchOptions
      },
      currentTreeOptions () {
        return {
          showCheckbox: this.showCheckbox,
          ...this.currentConfig.treeOptions
        }
      },
      currentTreeEvents () {
        return this.currentConfig.treeEvents
      },
      currentSize () {
        return this.currentConfig.size
      },
      currentFilterable () {
        return this.currentConfig.filterable
      },
      currentEditable () {
        return this.currentConfig.editable
      },
      currentSearchable () {
        return this.currentConfig.searchable
      },
      currentDynamicAction () {
        return this.currentConfig.dynamicAction
      },
      currentValue: {
        get () {
          return this.currentStore.getValue('query')
        },
        set (val) {
          return this.currentStore.setValue('query', val)
        }
      },
      isAllowCreate () {
        return !!Object.keys(this.currentActions).find(v => v.split(':')[0] === 'create')
      }
    },
    created () {
      this.onSearch()
    },
    methods: {
      onDrop () {
        const { idField, pidField, pidsField, childrenField, serialField } = this.currentConfig
        const rows = parseTree({ data: this.currentTree, idField, pidField, pidsField, childrenField, serialField })
        this.currentStore.emitEvent(Tree.Events.drop, rows)
      },
      onSearch () {
        this.currentStore.onSearch()
      },
      onCreate () {
        this.currentStore.onCreate()
      },
      onInit (done) {
        this.currentStore.onInit(this, done)
      },
      onContextMenu (event, ...args) {
        if (this.isEdit || Object.keys(this.currentActions).length === 0) return
        const menus = this.currentDynamicAction ? this.currentDynamicAction({ ...this.currentActions }, ...args) : this.currentActions
        ContextMenu.show({ menus, event, args })
      },
      onClick() {
        ContextMenu.close()
      },
      onChange (row) {
        this.currentStore.emitEvent(Tree.Events.select, row)
      },
      onFilter (value, data) {
        if (!value) return true
        const field = this.currentTreeOptions.props.label
        return data[field].indexOf(value) !== -1
      },
      onEdit () {
        this.isEdit = true
        this.showCheckbox = true
        this.currentStore.emitEvent(Tree.Events.treeEdit, this.$refs.tree)
      },
      onSave () {
        this.isEdit = false
        this.showCheckbox = false
        this.currentStore.emitEvent(Tree.Events.treeSave, this.$refs.tree)
      },
      onCancel () {
        this.isEdit = false
        this.showCheckbox = false
        this.currentStore.emitEvent(Tree.Events.treeCancel, this.$refs.tree)
      }
    },
    watch: {
      currentValue (val) {
        if (this.currentFilterable) {
          this.$refs.tree.filter(val)
        } else {
          this.onSearch()
        }
      }
    }
  }
</script>
