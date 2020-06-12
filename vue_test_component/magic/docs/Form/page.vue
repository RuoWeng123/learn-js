<template>
  <div class="blog-post">
    <mg-page :options="options"></mg-page>
  </div>
</template>

<script>
  import { model } from 'magic'
  import data from './data.js'

  export default {
    data() {
      return {
        options: new model.Page({
          config: {
            title: '配置页', // 页面名称
            describe: '添加描述',
            customization: true,
            excludeField: [],
            position: 'title,,search,button' // 调换按钮、搜索、标题的位置（以十字格划分区分位置'a1, a2, b1, b2')
          },
          actions: ['delete:el-icon-search', 'divider', 'create:新增:warning:small'], // divider: 竖线
          search: {
            // hideBtn: true,
            // btnFixed: true,
            // moreText: 'I dont care',
            // maxCount: 2,
            // realTime: true,
            // showLabel: true,
            size: 'Small', // medium ,large, Extra Large , Small, Extra Small
            columns: [
              { label: '关键字', field: 'name', layout: 'Text' },
              { label: '月份', field: 'month', layout: 'DateMonthRange' },
              { label: '类别', field: 'category', layout: 'Select', source: 'category' },
              { label: '形式', field: 'mode', layout: 'Select', source: 'mode', type: 'button' },
              { label: '时间', field: 'time', layout: 'DateRange' }
            ]
          },
          form: {
            gutter: 16,
            labelPosition: 'right',
            labelWidth: '100px',
            columns: [
              { label: '姓名', field: 'name', layout: 'Text' },
              { label: '头像', field: 'avatar', layout: 'Avatar' },
              { label: '附件', field: 'file', layout: 'File' },
              { label: '满意度', field: 'progress', layout: 'Progress' },
              { label: '等级', field: 'grade', layout: 'Rate', sortable: true },
              { label: '状态', field: 'status', layout: 'Status' },
              { label: '颜色', field: 'color', layout: 'ColorPicker' },
              { label: '时间', field: 'date', layout: 'DateTime' },
              { label: '部门', field: 'select', layout: 'Cascader', source: 'department' },
              { label: '是否显示', field: 'switch', layout: 'Switch' },
              { label: '地址', field: 'address', layout: 'Text' }
            ]
          },
          table: {
            actions: ['edit:el-icon-search', 'delete'],
            idField: 'name',
            rowsKey: 'list',
            totalKey: 'count',
            // serial: true,
            serial: {
              type: 'index',
              label: '序号',
              width: '150px',
              align: 'center'
            },
            listenScrollBottom: false,
            checkOnClickRow: false,
            action: { width: '200px', size: 'small', fixed: 'right', background: '#09d' },
            // pagination: false, // 设置分页显示
            // paginationOptions: { layout: 'size, sprev, pager, next, jumper', pageSizes: [100, 200, 300] }, // 翻页配置 按elementUI翻页属性配置
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
            ]
          },
          events: {
            init: (done) => {
              this.options.setSource('department', data.department)
              done()
            },
            search: (params) => {
              console.log(JSON.stringify(params, null, 4), '=====')
              this.options.setSource('list', data.rows)
              this.options.setSource('count', data.total)
            },
            submit: (form, done) => {
              setTimeout(done, 1000)
            },
            edit: (row) => {
              console.log(row, '======')
            },
            delete: (row) => {
              console.log(row, '======')
            }
          }
        })
      }
    }
  }
</script>
