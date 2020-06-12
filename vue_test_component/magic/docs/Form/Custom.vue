<template>
  <mg-form :options="options"/>
</template>

<script>
  import { model } from '../../package/index.js'
  import CustomColumn from './CustomColumn.vue'
  import data from './data.js'

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
            { label: '检查形式', field: 'mode', layout: 'Select', source: 'mode' },
            { label: '隐患明细', field: 'contents', layout: CustomColumn, cols: 24 }
          ],
          events: {
            init: () => {
              this.options.setSource('mode', data.mode)
              this.options.setSource('category', data.category)
              this.options.setSource('department', data.department)
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
    }
  }
</script>
