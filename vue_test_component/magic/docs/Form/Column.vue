<template>
  <mg-form :options="options">
    <mg-column
      position="form"
      after="mode">
      <el-form-item label="隐患明细">
        <el-table :data="currentList">
          <el-table-column
            prop="content"
            align="center"
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
                :disabled="currentList.length === 1 && scope.$index === 0"
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
      </el-form-item>
    </mg-column>
  </mg-form>
</template>

<script>
  import { model } from '../../package/index.js'
  import data from './data.js'

  const obj = { content: '' }
  export default {
    data() {
      return {
        options: new model.Form({
          config: {
            cols: 12
          },
          columns: [
            { label: '检查时间', field: 'date', layout: 'Date' },
            { label: '检查部门', field: 'department', layout: 'TreeSelect', source: 'department' },
            { label: '隐患类别', field: 'category', layout: 'Select', source: 'category' },
            { label: '检查形式', field: 'mode', layout: 'Select', source: 'mode' }
          ],
          events: {
            init: () => {
              this.options.setSource('mode', data.mode)
              this.options.setSource('category', data.category)
              this.options.setSource('department', data.department)
              this.options.setValue('contents', [{ ...obj }])
            },
            submit: (form, done) => {
              console.log(form)
              setTimeout(done, 1000)
            },
            'input:category': (val) => {
              console.log(val)
            }
          }
        })
      }
    },
    computed: {
      currentList() {
        return this.options.getValue('contents') || []
      }
    },
    methods: {
      onAdd(scope) {
        const list = [].concat(this.currentList)
        list.splice(scope.$index + 1, 0, { ...obj })
        this.options.setValue('contents', list)
      },
      onRemove(scope) {
        const list = [].concat(this.currentList)
        list.splice(scope.$index, 1)
        this.options.setValue('contents', list)
      }
    }
  }
</script>
