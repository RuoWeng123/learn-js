<template>
  <div
    class="magic-page"
    :class="`is-${currentSize}`">
    <MgAutoLoading
      class="magic-page-main"
      position="center"
      @load="onInit">
      <PageHeader
        :currentPosition="currentConfig.position"
        :currentDescribe="currentConfig.describe"
        :currentTitle="currentConfig.title"
        :currentSearch="currentSearch"
        :currentActions="currentActions"
        :currentDisabled="currentDisabled">
        <slot
          v-if="$slots.actions"
          name="actions"
          slot="actions"
        />
      </PageHeader>
      <div class="magic-page-table">
        <MgTable
          v-if="currentTable"
          :options="currentTable">
          <slot/>
        </MgTable>
        <MgTreeGrid
          v-if="currentTreeGrid"
          :options="currentTreeGrid">
          <slot/>
        </MgTreeGrid>
      </div>
      <MgLayer
        v-if="currentForm"
        v-bind="currentLayer"
        ref="form">
        <MgForm
          :options="currentForm">
          <slot/>
        </MgForm>
      </MgLayer>
      <MgLayer
        v-if="currentImport"
        v-bind="currentImportLayer"
        ref="import">
        <MgImport
          :options="currentImport"
        />
      </MgLayer>
      <slot name="layer"/>
    </MgAutoLoading>
  </div>
</template>

<script>
  import MgAutoLoading from '../../basic/AutoLoading/index.vue'
  import MgLayer from '../../basic/Layer/index.vue'
  import MgForm from '../Form/index.vue'
  import MgImport from '../Import/index.vue'
  import MgTable from '../Table/index.vue'
  import MgTreeGrid from '../TreeGrid/index.vue'
  import PageHeader from './header'

  export default {
    name: 'MgPage',
    props: {
      options: {}
    },
    components: {
      MgAutoLoading,
      MgTreeGrid,
      MgImport,
      MgTable,
      MgLayer,
      MgForm,
      PageHeader
    },
    computed: {
      currentStore () {
        return this.options
      },
      currentActions () {
        return this.currentStore.actions
      },
      currentForm () {
        return this.currentStore.form
      },
      currentSearch () {
        return this.currentStore.search
      },
      currentTable () {
        return this.currentStore.table
      },
      currentTreeGrid () {
        return this.currentStore.treeGrid
      },
      currentLayer () {
        return this.currentStore.layer
      },
      currentImport () {
        return this.currentStore.import
      },
      currentConfig () {
        return this.currentStore.config
      },
      currentSize () {
        return this.currentConfig.size
      },
      currentDisabled () {
        if (this.currentTable) {
          const { selection = [] } = this.currentTable.getValue()
          const results = []
          if (selection.length !== 1) results.push('edit')
          if (selection.length === 0) results.push('delete')
          if (selection.length === 0) results.push('selection')
          return results
        } else if (this.currentTreeGrid) {
          const { row } = this.currentTreeGrid.getValue()
          return row ? [] : ['edit', 'delete']
        } else {
          return []
        }
      },
      currentImportLayer () {
        return {
          top: null,
          width: '900px',
          height: '800px',
          bodyStyle: 'padding: 0 5px;'
        }
      }
    },
    methods: {
      onInit (done) {
        this.currentStore.onInit(this, done)
      }
    }
  }
</script>
