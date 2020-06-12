<template>
  <mg-search
    :options="options"
  />
</template>

<script>
  import { model } from '../../package/index.js'

  export default {
    data() {
      return {
        options: new model.Search({
          columns: [
            { label: '关键字', field: 'name', layout: 'Text' },
            { label: '月份', field: 'month', layout: 'DateMonthRange' },
            { label: '类别', field: 'category', layout: 'Select', source: 'category' },
            { label: '形式', field: 'mode', layout: 'Select', source: 'mode', type: 'button' },
            { label: '时间', field: 'time', layout: 'DateRange' }
          ],
          sources: {
            category: [
              {
                label: '火灾',
                value: 1
              },
              {
                label: '爆炸',
                value: 2
              },
              {
                label: '水灾',
                value: 3
              }
            ],
            mode: [
              {
                label: '看台账',
                value: 1
              },
              {
                label: '听汇报',
                value: 2
              }
            ]
          },
          events: {
            search: (params) => {
              console.log(params)
            }
          }
        })
      }
    }
  }
</script>
