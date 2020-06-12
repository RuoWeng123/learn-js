<template>
  <config-card title="字段关联">
    <el-table
      border
      size="mini"
      :data="currentData">
      <el-table-column
        align="center"
        prop="target"
        label="目标字段">
        <mg-select
          v-model="scope.row.target"
          placeholder="目标字段"
          slot-scope="scope"
          :source="target"
          size="small"
        />
      </el-table-column>
      <el-table-column
        align="center"
        prop="source"
        label="源字段">
        <mg-select
          v-model="scope.row.source"
          placeholder="文本字段"
          slot-scope="scope"
          :source="source"
          size="small"
        />
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="120px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            circle
            icon="el-icon-minus"
            :disabled="currentData.length === 1 && scope.$index === 0"
            @click="onRemove(scope)"
          />
          <el-button
            size="mini"
            circle
            icon="el-icon-plus"
            type="primary"
            @click="onAdd(scope)"
          />
        </template>
      </el-table-column>
    </el-table>
  </config-card>
</template>

<script>
  import MgSelect from '../../basic/Select/index.vue'
  import ConfigCard from './config-card.vue'

  const obj = { source: '', target: '' }

  export default {
    components: { MgSelect, ConfigCard },
    props: {
      source: {},
      target: {},
      value: {}
    },
    computed: {
      currentData: {
        get () {
          return (this.value && this.value.length) ? this.value : [{ ...obj }]
        },
        set (val) {
          this.$emit('input', val)
        }
      }
    },
    methods: {
      onAdd (scope) {
        const list = [].concat(this.currentData)
        list.splice(scope.$index + 1, 0, { ...obj })
        this.currentData = list
      },
      onRemove (scope) {
        const list = [].concat(this.currentData)
        list.splice(scope.$index, 1)
        this.currentData = list
      }
    }
  }
</script>
