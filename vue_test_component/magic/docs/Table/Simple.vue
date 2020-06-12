<template>
  <mg-table :options="options"/>
</template>

<script>
  import { model } from '../../package/index.js'
  import data from './data.js'

  export default {
    data() {
      return {
        options: new model.Table({
          config: {
            pagination: false,
            actions: ['edit', 'delete'],
            events: ['current-change'],
            panels: [
              'name',
              {
                label: '常见类型',
                children: [
                  'avatar',
                  {
                    label: '等级',
                    children: [
                      'grade',
                      'status',
                      'file'
                    ]
                  }
                ]
              },
              {
                label: '特殊类型',
                children: [
                  'date',
                  'select',
                  'switch',
                  'address',
                  'color'
                ]
              }
            ]
          },
          columns: [
            { label: '姓名', field: 'name', layout: 'Text' },
            { label: '头像', field: 'avatar', layout: 'Avatar' },
            { label: '附件', field: 'file', layout: 'File', width: 300 },
            { label: '满意度', field: 'progress', layout: 'Progress', width: 200 },
            { label: '等级', field: 'grade', layout: 'Rate', width: 160, sortable: true },
            {
              label: '状态',
              field: 'status',
              layout: 'Status',
              formatter: (scope, row, val) => val ? val > 20 ? '报警' : '正常' : '断线',
              currentStatus: (val, raw) => raw ? raw > 20 ? 'red' : 'green' : 'gray'
            },
            { label: '颜色', field: 'color', layout: 'ColorPicker' },
            { label: '时间', field: 'date', layout: 'DateTime', width: 140 },
            { label: '部门', field: 'select', layout: 'Cascader', source: 'department', width: 180 },
            { label: '是否显示', field: 'switch', layout: 'Switch' },
            { label: '地址', field: 'address', layout: 'Text', width: 250 }
          ],
          events: {
            init: () => {
              this.options.setSource('department', data.department)
            },
            search: (params) => {
              console.log(JSON.stringify(params, null, 4), '=====')
              this.options.setSource('rows', data.rows)
              this.options.setSource('total', data.total)
            },
            edit: (row) => {
              console.log(row, '======')
            },
            delete: (row) => {
              console.log(row, '======')
            },
            'actions:custom': (row) => {
              console.log(row, '======')
            },
            'table:current-change': (row) => {
              console.log(row)
            }
          }
        })
      }
    }
  }
</script>
