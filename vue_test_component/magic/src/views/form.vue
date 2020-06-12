<template>
  <mg-form
    style="padding-top: 15px;"
    :options="options">
    <mg-column
      position="form"
      after="mode">
      <el-form-item label="隐患内容">
        <el-input
          type="textarea"
          v-model="form.content"
        />
      </el-form-item>
      <el-form-item label="form值">
        <el-input
          type="textarea"
          :rows="10"
          :value="JSON.stringify(form, null, 2)"
        />
      </el-form-item>
    </mg-column>
  </mg-form>
</template>

<script>
  import { model } from 'magic'
  import sources from './data.js'

  export default {
    data () {
      return {
        form: {
          category: 1
        },
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
          sources: sources,
          value: [this, 'form'],
          events: {
            submit: () => {
            }
          },
          listeners: {
            'form[department,category]:input': (field, value) => {
              console.log(field, value, '====')
            }
          }
        })
      }
    }
  }
</script>
