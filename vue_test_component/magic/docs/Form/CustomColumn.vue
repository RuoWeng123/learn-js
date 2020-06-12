<template>
  <el-table
    border
    :data="currentData">
    <el-table-column
      align="center"
      prop="content"
      label="内容">
      <el-input
        slot-scope="scope"
        v-model="scope.row.content"
        placeholder="请输入隐患内容"
      />
    </el-table-column>
    <el-table-column
      align="center"
      label="操作"
      width="120px">
      <el-row slot-scope="scope">
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
      </el-row>
    </el-table-column>
  </el-table>
</template>

<script>
  const obj = { content: '' }

  export default {
    props: {
      value: {}
    },
    computed: {
      currentData: {
        get() {
          return this.value || []
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    },
    created() {
      this.currentData = [{ ...obj }]
    },
    methods: {
      onAdd(scope) {
        const list = [].concat(this.currentData)
        list.splice(scope.$index + 1, 0, { ...obj })
        this.currentData = list
      },
      onRemove(scope) {
        const list = [].concat(this.currentData)
        list.splice(scope.$index, 1)
        this.currentData = list
      }
    }
  }
</script>
