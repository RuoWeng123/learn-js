<template>
  <div class="blog-post">
    <mg-title title="隐患配置" style="display: block; text-align: center; line-height: 60px"/>
    <mg-form :options="options" :describe='"describe描述信息"'/>
    <mg-editable  style="padding-bottom: 0;" :options="options2"/>
  </div>
</template>

<script>
  import { model } from 'magic'
  import data from './data.js'

  export default {
    data() {
      return {
        options: new model.Form({
          listeners: { 'actions:actionName': () => {} },
          config: {
            cols: 12,
            labelWidth: '100px',
            labelPosition: 'right',
            // confirm: true,
            btnAlign: 'center',
            btnShadow: true,
            events: ['current-change'],
            hideBottom: false,
            useLoading: true,
            autoNotify: true,
            cancelText: 'nidaye',
            disabledSubmit: false,
            customCloseable: true,
            // hideFields: ['number', 'department']
            disabledFields: ['number', 'department'],
            placeholder: '请输入。。。。',
            paginationOptions: { layout: 'prev, pager, next' }
            // contentStyle: 'background-color: #09d;font-size:80px'
          },
          columns: [
            { label: '隐患单号:', field: 'number', layout: 'Text', cols: 24 },
            { label: '整改部门:', field: 'department', layout: 'TreeSelect', source: 'department' },
            { label: '隐患级别:', field: 'level', layout: 'Radio', source: 'level', type: 'button' },
            { label: '检查时间:', field: 'date', layout: 'Date' },
            { label: '隐患类别:', field: 'category', layout: 'Select', source: 'category', multiple: true },
            { label: '隐患内容:', field: 'desc', layout: 'Textarea', cols: 24 },
            { label: '显示级别:', field: 'zoom', layout: 'Slider', cols: 24 },
            { label: '检查形式:', field: 'mode', layout: 'Checkbox', source: 'mode' },
            { label: '是否显示:', field: 'visiable', layout: 'Switch', cols: 24 },
            { label: '配置颜色:', field: 'color', layout: 'ColorPicker' },
            { label: '输入建议', field: 'suggestions', layout: 'AutoComplete', source: 'suggestions' }
          ],
          panels: [
            'name',
            { label: '常见类型', children: ['avatar', { label: '等级', children: [ 'grade', 'status', 'file' ] }] },
            { label: '特殊类型', children: [ 'date', 'select', 'switch', 'address', 'color' ] }
          ],
          events: {
            init: () => {
              this.options.setSource('mode', data.mode)
              this.options.setSource('category', data.category)
              this.options.setSource('level', data.level)
              this.options.setSource('department', data.department)
              this.options.setSource('suggestions', data.suggestions)
            },
            submit: (form, done) => {
              setTimeout(done, 1000)
            },
            'input:category': (val) => {
              console.log(val)
            }
          }
        }),
        options2: new model.Editable({
          Editable: {
            selection: false,
            action: { width: '100px' },
            actions: ['create', 'delete:el-icon-minus'],
            editable: true,
            size: 'mini',
            height: '300px',
            columns: [
              { label: '隐患单号:', field: 'number', layout: 'Text', cols: 24 },
              { label: '整改部门:', field: 'department', layout: 'TreeSelect', source: 'department' },
              { label: '隐患级别:', field: 'level', layout: 'Radio', source: 'level', type: 'button' },
              { label: '检查时间:', field: 'date', layout: 'Date' },
              { label: '隐患类别:', field: 'category', layout: 'Select', source: 'category', multiple: true },
              { label: '隐患内容:', field: 'desc', layout: 'Textarea', cols: 24 }
            ]
          }
        })
      }
    }
  }
</script>
