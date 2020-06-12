<template>
  <div class="magic-import-main">
    <config-table
      :options="options"
      :source="source"
      v-model="selections"
    />
    <div class="magic-import-config">
      <config-error
        :error="error"
      />
      <config-resolve
        :splitable="splitable"
        :config="config.resolve"
      />
      <config-relation
        :target="targetColumns"
        :source="sourceColumns"
        v-model="config.relation"
      />
    </div>
    <config-btn
      @reload="onReload"
      @cancel="onCancel"
      @confirm="onConfirm"
      :loading="loading"
      :disabled="currentDisabled"
    />
  </div>
</template>

<script>
  import Relation from './relation.js'
  import ConfigBtn from './config-btn.vue'
  import ConfigError from './config-error.vue'
  import ConfigTable from './config-table.vue'
  import ConfigResolve from './config-resolve.vue'
  import ConfigRelation from './config-relation.vue'
  import Import from '../../model/Import'

  export default {
    props: {
      file: {},
      options: {}
    },
    components: {
      ConfigBtn,
      ConfigError,
      ConfigTable,
      ConfigResolve,
      ConfigRelation
    },
    computed: {
      currentStore () {
        return this.options
      },
      currentColumns () {
        return this.currentStore.columns
      },
      currentConfig () {
        return this.currentStore.config
      },
      currentSelection () {
        return this.currentConfig.selection
      },
      currentDisabled () {
        return this.currentSelection ? !this.selections.length : false
      }
    },
    data () {
      return {
        loading: false,
        error: null,
        source: [],
        selections: [],
        sourceColumns: [],
        targetColumns: [],
        currentResult: []
      }
    },
    created () {
      this.targetColumns = this.currentColumns.map(v => ({ label: v.label, value: v.field }))
    },
    methods: {
      onReload () {
        this.$emit('reload')
      },
      onCancel () {
        this.currentStore.emitEvent(Import.Events.cancel)
      },
      onConfirm () {
        this.loading = true
        const source = this.currentSelection ? this.selections : this.source
        const relations = this.currentColumns.reduce((results, { field, relation }) => {
          relation && (results[field] = typeof relation === 'function' ? relation : Relation[relation])
          return results
        }, {})
        const fields = Object.keys(relations)
        this.currentResult = fields.length === 0 ? source : source.map(item => {
          const obj = { ...item }
          fields.forEach(field => (obj[field] = relations[field](obj[field])))
          return obj
        })
        this.currentStore.emitEvent(Import.Events.submit, this.currentResult, (err) => {
          if (err) {
            this.error = {
              title: err.title || '提交出错：',
              message: err.message
            }
          } else {
            this.currentStore.emitEvent(Import.Events.close)
          }
          this.loading = false
        })
      }
    },
    watch: {
      config: {
        deep: true,
        handler () {
          this.onRefresh()
        }
      }
    }
  }
</script>
