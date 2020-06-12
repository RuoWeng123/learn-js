---
pageClass: engine-page
sidebar: auto
---

# 属性说明 

## Form

### config.labelWidth

- Type: `String`
- Default: 'auto'

指定form组件下lable标签的大小，默认`auto`；

### config.labelPosition

- Type: `String`
- Default: 'top'

指定form组件下lable标签的位置，默认`top`，当标签的文字内容参差不齐时，建议使用此属性；

::: warning 注意 
当`labelWidth`为`auto`，`labelPosition`为`left`或者`right`时，效果没有区别
:::

### config.size

- Type: `String`
- Default: 'medium'

设置form文字尺寸，默认`medium`, 目前只支持'small、medium'

### config.rules

- Type: `Object`
- Default: {}

form表单验证规则功能，通过 rules 设置验证规则。默认验证为true，通用校验方式如下：

| Code            |  describe                     
| --------------- | --------------- 
| 1               |  邮箱    
| 2               |  手机号      
| 3               |  身份证号           
| 4               |  网址      
| 5               |  QQ号      
| 6               |  微信号      
| 7               |  车牌号      
| 8               |  正整数      
| 9               |  负整数 
| 10              |  整数  
| 11              |  正数  
| 12              |  负数
| 13              |  数字
| 14              |  IPV4地址
| 15              |  4到16位（字母，数字，下划线，减号）
| 16              |  密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符      
| 17              |  必须包含中文

```js
rules: {
  desc: true,  // 默认 true
  email: 1,    // 根据Code验证
  id_card: 3,  
  name: [  // 1、直接校验
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  start_date: [ // 2、原生的数组校验
    { required: true, message: '请输入开始时间', trigger: 'blur' },
    {
      trigger: 'blur',
      required: true,
      validator: (rule, value, callback) => {
        this.options.context.validate('end_date')
        callback()
      }
    }
  ]
}
```

### config.gutter

- Type: `Number`
- Default: 26

指定form的栅格间隔，默认`26`；

### config.cols

- Type: `Number`
- Default: 24

form下每个column的宽度，默认`24`；

::: warning 注意 
最大值为`24`， 占满整行
:::

### config.confirm

- Type: `Boolean`
- Default: false

设置form表单提交按钮的提示弹框，默认：`false`；

### config.btnAlign

- Type: `String`
- Default: 'right'

设置form提交按钮的位置， 目前只支持`right`；

### config.btnShadow

- Type: `Boolean`
- Default: false

设置form提交按钮区域上边框的阴影，默认`false`；

### config.panels

- Type: `Array`
- Default: undefined

对form下column的分组；


```js
panels: [ // 固定的显示格式,详细效果请参考table组件
  'name', // 整列
  { label: '常见类型', children: ['avatar', { label: '等级', children: [ 'grade', 'status', 'file' ] }], // 传入的是数组时，指number到category这个区间的数据
  { label: '特殊类型', children: [ 'date', 'select', 'switch', 'address', 'color' ] } // 传入是字符串时设置，指配置的是那几条数据
],
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
```

### config.hideBottom

- Type: `Boolean`
- Default: false

隐藏form底部按钮区域，默认`false`；

### config.useLoading

- Type: `Boolean`
- Default: true

添加form提交按钮loading效果，默认`true`, 这里也算是节流操作；

### config.autoNotify

- Type: `Boolean`
- Default: true

form提交成功后右侧弹框提示，默认`true`；

### config.cancelText

- Type: `String`
- Default: '取 消'

修改form表单取消按钮文案，默认`取 消`；

### config.confirmText

- Type: `String`
- Default: '提 交'

修改form表单提交按钮文案，默认`提 交`；

### config.hideFields

- Type: `Array`
- Default: []

隐藏form下的column配置字段名,默认`[]`；

### config.disabledFields

- Type: `Array`
- Default: []

设置form下的column不可编辑(disabled),默认`[]`；

### config.disabledSubmit

- Type: `Boolean`
- Default: false

设置form表单提交按钮disabled，默认`false`；

### config.customCloseable

- Type: `Boolean`
- Default: false

设置form表单自定义关闭模式，默认`false`；

### config.placeholder

- Type: `String`
- Default: ''

设置form表单input的placeholder，可以批量设置，默认为``；

### config.contentStyle

- Type: `String`
- Default: ''

设置form表单样式；

```js
contentStyle: 'background-color: #09d;font-size:80px'
```

### config.events

- Type: `Object`
- Default: '{}'

form表单 当前数据的key是事件名，value是回调函数，默认`{}`；

```js
config: {
  events: ['current-change']
},
events: {
  'table:current-change': (row) => {
    console.log(row)
  }
}
```

### config.props

- Type: `Object`
- Default: {}

设置form表单配置选项，具体参考ElementUI里from的参数；


## Search


### config.hideBtn

- Type: `Boolean`
- Default: false

隐藏搜索按钮，默认`false`；

### config.btnFixed

- Type: `Boolean`
- Default: false

固定全部搜索按钮居底部，默认`false`（目前一直固定在底部）；

### config.moreText

- Type: `String`
- Default: '全部'

修改全部搜索按钮文案，默认`全部`；

### config.maxCount

- Type: `Number`
- Default: 1

设置搜索默认展示column的最大个数，默认`1`；

### config.realTime

- Type: `Boolean`
- Default: false

设置搜索框实时搜索，默认`false`；

### config.showLabel

- Type: `Boolean`
- Default: false

设置搜索框Label文案，默认`false`；

### config.size

- Type: `String`
- Default: 'medium'

设置隐藏搜索按钮文字尺寸，默认`medium`, 目前只支持'small、medium'

## Table

### config.idField

- Type: `String`
- Default: 'id'

保存table数据filed的值，默认`id`；

::: warning 注意 
table组件单独使用时是不生效的；
:::

### config.rowsKey

- Type: `String`
- Default: 'rows'

设置table数据的名称，默认`rowsKey`；

```js
table: { // talbe配置
    rowsKey: 'list'
}
// table的数据
this.options.setSource('list', data.rows)
```

### config.totalKey

- Type: `String`
- Default: 'total'

table数据的总条数的名称,默认`total`；

```js
table: { // talbe配置
    totalKey: 'count'
}
// table的数据
this.options.setSource('count', data.rows)
```

### config.localPagination

- Type: `Boolean`
- Default: false

设置table是否开启本地分页（开启本地分页会自动关闭远程分页），默认`false`；

### config.pagination

- Type: `Boolean`
- Default: true

设置分页是否显示，默认`true`；
      
### config.selection 

- Type: `Boolean` `Function` `Object`
- Default: true

设置table表格是否显示selection选择框，默认:`true`, 如果是Object、Function需要进行以下操作：

```js
options = {
  width: 55,
  align: 'center',
  type: 'selection',
  selectable: selectableFunction  // 做为函数传selectableFunction
}
```
### config.dropable 

- Type: `Boolean`
- Default: false

调整table行上下拖拽顺序，默认 `false`

::: warning 注意：设置为true，需要进行以下操作：
```js
安装
yarn add sortablejs
引用
import Sortable from 'sortablejs'
Vue.use(magic, { sortablejs: Sortable })
```
:::

### config.serial   

- Type: `Boolean` `Object`
- Default: true

设置table表格序号，默认: `true`，内部默认属性如下：

```js
// Boolean 序号是否显示
table: {
  serial: false
}
// Object 具体参数参考ElementUI中table的配置
serial: {
  type: 'index',
  label: '序号',
  width: '50px',
  align: 'center',
  index: index => index + 1
}
```

### config.action

- Type: `Object`
- Default: {}

设置table表格操作栏的样式，参数ElementUI的tables属性设置，默认: `空`；

```js
action: { width: '100px', size: 'small', fixed: 'right' },
```

### config.panels

- Type: `Array`
- Default: undefined

设置table表格多表头展示,默认：`undefined`；

```js
panels: [ // 固定的显示格式,详细效果请看table组件
  'name', // 整列
  { label: '常见类型', children: ['avatar', { label: '等级', children: [ 'grade', 'status', 'file' ] }],
  { label: '特殊类型', children: [ 'date', 'select', 'switch', 'address', 'color' ] }
],
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
```


### config.actions

- Type: `Array`
- Default: []

设置table表格操作列的方法，默认: `[]`, 定义的属性有`edit create delete`,也可以自定义；

```js
  // 修改icon、文案、大小(目前只支持small、medium)、样式
  actions: ['create:el-icon-search:新增:warning:small', 'divider','delete']
  // 自定义actions
  actions: ['actionName']
  listeners: { 'actions:actionName': () => {} }
```

### config.listenScrollBottom

- Type: `Boolean`
- Default: false

设置table表格滚动到底部，默认`false` , 设置: `true`会抛出`scroll-bottom`事件；

### config.checkOnClickRow

- Type: `Boolean`
- Default: false

点击talbe行(row)选中当前行checkbox选择框，默认`false`；

### config.paginationOptions

- Type: `Object`
- Default: {}

参考ElementUI中pagination参数配置，默认`{}`；

```js
paginationOptions: { layout: 'size, sprev, pager, next, jumper', pageSizes: [100, 200, 300] }, // 翻页配置 按elementUI翻页属性配置
```

### config.props

- Type: `Object`
- Default: {}

设置table表单配置选项，具体参考ElementUI里table的参数，默认`{}`；

```js
{
  fit: true,
  border: true,
  stripe: true,
  height: '100%',
  size: 'medium',
  emptyText: '暂无数据！！！',
  highlightCurrentRow: true,
  data: this.tableData,
  rowStyle: ({ row }) => this.getStyleByRow(row),
  ...this.currentConfig.props
}
```

### config.events

- Type: `Object`
- Default: '{}'

table 当前数据的key是事件名，value是回调函数，默认`{}`；

```js
config: {
  events: ['current-change']
},
events: {
  'table:current-change': (row) => {
    console.log(row)
  }
}
```

## Page

### config.size

- Type: `String`
- Default: 'normal'

设置page页文字尺寸，默认`mormal`, 目前只支持'small、medium'

### config.title

- Type: `String`
- Default: ''

设置page页title,默认 ``；


### config.describe

- Type: `String`
- Default: ''

设置page页title下的描述信息,默认 ``；

### config.position

- Type: `String`
- Default: 'title,,button,search'

设置page页显示布局,默认 `title,,button,search`；

:::warning 注意： 根据position设置的顺序展示在对应位置,以十字格划分区分
|   title    |            | 
|------------|------------|                          
|   button   |   search   |
:::

### config.customization

- Type: `Boolean`
- Default: false

设置page页自定义弹框,默认`false`；



## Tree

### config.title

- Type: `String`
- Default: ''

设置tree的标题,默认 ''；

### config.size

- Type: `String`
- Default: 'normal'

设置tree文字尺寸，目前支持 medium、small，默认`normal`；

### config.describe

- Type: `String`
- Default: ''

设置tree的标题下的描述,默认``；

### config.treeKey

- Type: `String`
- Default: 'tree'

设置tree的数据,默认`tree`；

### config.addDescribe

- Type: `String`
- Default: '创建一级内容'

设置tree的标题右侧描述，鼠标悬浮时显示,默认`创建一级内容`；

::: warning 注意 
设置title后，此属性才生效。
:::

### config.searchOptions

- Type: `Object`
- Default: '{
    placeholder: '请输入关键字',
    prefixIcon: 'el-icon-search',
    clearable: true
  }'

tree搜索的参数配置,默认`Object`，按ElementUI中搜索的传参配置；

### config.treeOptions

- Type: `Object`
- Default: '{
    props: {
      value: 'id',
      label: 'name',
      children: 'children'
    },
    indent: 14,
    nodeKey: nodeKey || idField,
    defaultExpandAll: true,
    highlightCurrent: true,
    expandOnClickNode: true
  }'

tree参数设置，按ElementUI属性配置传参；

### config.idField

- Type: `String`
- Default: 'id'

设置tree数据filed的key(唯一值),默认`id`；

::: warning 注意 
tree组件单独使用时是不生效的；
:::

### config.childrenField

- Type: `String`
- Default: 'children'

指定子树为节点对象的某个属性值,默认`children`；

### config.filterable

- Type: `Boolean`
- Default: 'false'

设置tree搜索，true:本地搜索，false:启用远程搜索, 默认`false`；

### config.editable

- Type: `Boolean`
- Default: 'false'

配置tree标题右侧编辑是否显示,默认`false`；

::: warning 注意 
设置title后，此属性才生效。
设置此属性会抛出`tree:edit` `tree:save`事件来响应对应的编辑、保存按钮的触发；
:::

### config.deleteConfirmText

- Type: `String`
- Default: '您确定要删除吗？'

配置tree删除弹框的文案，默认`您确定要删除吗？`；

### config.dynamicAction

- Type: `Function`
- Default: undefined

获取tree当前的事件、数据，默认`undefined`；

```js
dynamicAction: (actions, row) => {
  if (row.level >= 4 && actions.create) delete actions.create
  return actions
}
```

### config.copyable

- Type: `Boolean`
- Default: 'true'

设置tree编辑数据是否显示，默认`true`；

### config.searchable

- Type: `String`
- Default: 'true'

是否显示tree的搜索框，默认`true`；

## Tree Grid

### config.rowsKey

- Type: `String`
- Default: 'rows'

设置treeGrid数据的名称，默认`rowsKey`；

```js
treeGrid: { // treeGrid配置
    rowsKey: 'list'
}
// treeGrid的数据
this.options.setSource('list', data.rows)
```
### config.action

- Type: `Object`
- Default: {}

设置treeGrid表格操作栏的样式,参数ElementUI的tables属性设置，默认: `空`；

```js
action: { width: '100px', size: 'small', fixed: 'right' },
```

### config.idField

- Type: `String`
- Default: 'id'

保存treeGrid数据filed的值，默认`id`；

::: warning 注意 
treeGrid组件单独使用时是不生效的；
:::

### config.pidField

- Type: `String`
- Default: 'pid'

保存treeGrid数据父级filed的值，默认`pid`；

### config.pidsField

- Type: `String`
- Default: 'pids'

保存treeGrid数据父级多个filed的值，默认`pids`；

### config.orderField

- Type: `String`
- Default: 'order'

设置treeGrid的列排序，默认`order`;

### config.nameField

- Type: `String`
- Default: 'name'

设置treeGrid折叠的小箭头显示在那一列上，默认`name`；

```js
treeGrid: {
  expandAll: true,
  columns: ['name', 'code', 'level', 'remark'],
  nameField: 'code' // 根据业务需要设置在相应的字段名
},
columns: [
  { label: '名称', field: 'name', layout: 'Text' },
  { label: '编码', field: 'code', layout: 'Text' },
  { label: '类别', field: 'level', layout: 'Select', source: 'category' },
  { label: '描述', field: 'remark', layout: 'Textarea' }
]
```

### config.expandAll

- Type: `Boolean`
- Default: 'false'

treeGrid是否展开，默认`false`；

### config.props

- Type: `Object`
- Default: '{}'

设置treeGrid表单配置选项，具体参考ElementUI里 tree的参数；

### config.events

- Type: `Object`
- Default: '{}'

treeGrid 当前数据的key是事件名，value是回调函数，默认`{}`；

```js
config: {
  events: ['current-change']
},
events: {
  'table:current-change': (row) => {
    console.log(row)
  }
}
```

### config.actions

- Type: `Array`
- Default: []

设置treeGrid表格操作列的方法，默认: `[]`, 定义的属性有`edit create delete`,也可以自定义；

```js
  // 修改icon、文案、大小(目前只支持small、medium)、样式
  actions: ['create:el-icon-search:新增:warning:small', 'divider','delete']
  // 自定义actions
  actions: ['actionName']
  listeners: { 'actions:actionName': () => {} }
```

### config.panels

- Type: `Array`
- Default: undefined

对treeGrid下column的分组；

```js
panels: [ // 固定的显示格式,详细效果请参考table组件
  'name', // 整列
  { label: '常见类型', children: ['avatar', { label: '等级', children: [ 'grade', 'status', 'file' ] }], // 传入的是数组时，指number到category这个区间的数据
  { label: '特殊类型', children: [ 'date', 'select', 'switch', 'address', 'color' ] } // 传入是字符串时设置，指配置的是那几条数据
],
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
```

### config.dynamicAction

- Type: `Function`
- Default: undefined

获取treeGrid当前的事件、数据，默认`undefined`；

```js
dynamicAction: (actions, row) => {
  if (row.level >= 4 && actions.create) delete actions.create
  return actions
}
```

### config.selection

- Type: `Boolean`
- Default: 'false'

treeGrid是否显示多选框，默认`false`；

## Import

### config.pagination

- Type: `Boolean`
- Default: 'true'

设置improt分页是否显示，默认`true`；

### config.selection

- Type: `Boolean`
- Default: 'true'

设置improt选择框是否显示，默认`true`；

## Editabled

### config.rowsKey

- Type: `String`
- Default: 'rows'

设置editTable数据的名称，默认`rows`；

```js
treeGrid: { // editTable配置
    rowsKey: 'list'
}
// editTable的数据
this.options.setSource('list', data.rows)
```
### config.totalKey

- Type: `String`
- Default: 'total'

设置editTable数据的总条数的key,代码同rowsKey,默认`total`；

### config.idField

- Type: `String`
- Default: 'id'

保存editTable数据filed的值，默认`id`；

::: warning 注意 
editTable组件单独使用时是不生效的；
:::

### config.pagination

- Type: `Boolean`
- Default: 'false'

设置editTable分页是否显示，默认`false`；

### config.selection

- Type: `Boolean`
- Default: 'true'

设置editTable选择框是否显示，默认`true`；

### config.dropable

- Type: `Boolean`
- Default: 'false'

设置editTable是否开启拖拽节点功能，默认`false`；

### config.serial   

- Type: `Boolean` `Object`
- Default: true

设置table表格序号，默认: `true`，内部默认属性如下：

```js
serial: {
  type: 'index',
  label: '序号',
  width: '50px',
  align: 'center',
  index: index => index + 1
}
```

### config.action

- Type: `Object`
- Default: {}

设置editTable表格操作栏的样式，参数ElementUI的tables属性设置，默认: `空`；

```js
action: { width: '100px', size: 'small', fixed: 'right' },
```
### config.actions

- Type: `Array`
- Default: []

设置editTable表格操作列的方法，默认: `[]`, 定义的属性有`edit create delete`,也可以自定义；

```js
  // 修改icon、文案、大小(目前只支持small、medium)、样式
  actions: ['create:el-icon-search:新增:warning:small', 'divider','delete']
  // 自定义actions
  actions: ['actionName']
  listeners: { 'actions:actionName': () => {} }
```

### config.panels

- Type: `Array`
- Default: undefined

设置editTable表格多表头展示,默认：`undefined`；

```js
panels: [ // 固定的显示格式,详细效果请看table组件
  'name', // 整列
  { label: '常见类型', children: ['avatar', { label: '等级', children: [ 'grade', 'status', 'file' ] }],
  { label: '特殊类型', children: [ 'date', 'select', 'switch', 'address', 'color' ] }
],
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
```
### config.editable

- Type: `Boolean`
- Default: 'false'

配置editTable标题右侧编辑是否显示,默认`false`；

::: warning 注意 
设置title后，此属性才生效。
设置此属性会抛出`tree:edit` `tree:save`事件来响应页面的编辑、保存按钮的触发；
:::

### config.disabled

- Type: `Boolean`
- Default: 'false'

设置editTable是否显示，默认`false`；

### config.newObject

- Type: `Object`
- Default: '{}'

设置editTable新增初始化的默认值，默认`{}`；

### config.useEmpty

- Type: `Boolean`
- Default: 'false'

设置editTable表无数据时，表格中间是否显示新增按钮，默认`false`；

### config.editMode

- Type: `Number`
- Default: '1'

editMode值为1：表示编辑当前行，值为2：表格当前页可编辑，默认`1`；

```js
const mode = this.options.config.editMode
  if (mode === 1) { 
    return column.config.editable
  } else if (mode === 2) {
    const rowIndex = this.options.getValue('rowIndex')
    return column.config.editable && index === rowIndex
  }
```

### config.minRow

- Type: `Number`
- Default: '1'

设置editTable最小行数，默认`1`；

### config.size

- Type: `String`
- Default: 'medium'

设置editTable尺寸，目前支持 medium、small，默认`medium`；

### config.listenScrollBottom

- Type: `Boolean`
- Default: false

设置table表格滚动到底部，默认`false` , 设置: `true`会抛出`scroll-bottom`事件；

### config.checkOnClickRow

- Type: `Boolean`
- Default: 'false'

点击editTalbe行(row)选中当前行checkbox选择框，默认`false`；

### config.paginationOptions

- Type: `Object`
- Default: '{}'

```js
const options = this.currentConfig.paginationOptions
return {
  small: true,
  total: this.currentTotal,
  currentPage: this.currentPage,
  pageSize: this.pageSize,
  pageSizes: [25, 50, 100, 200, 500, 1000],
  layout: 'total, -> ,sizes, -> , prev, pager, next',
  ...options
}
```

### config.props

- Type: `Object`
- Default: {}

设置editTable表单配置选项，具体参考ElementUI里table的参数，默认`{}`；

```js
{
  fit: true,
  border: true,
  stripe: true,
  height: '100%',
  size: 'medium',
  emptyText: '暂无数据！！！',
  highlightCurrentRow: true,
  data: this.tableData,
  rowStyle: ({ row }) => this.getStyleByRow(row),
  ...this.currentConfig.props
}
```

### config.events

- Type: `Object`
- Default: '{}'

editTable 当前数据的key是事件名，value是回调函数，默认`{}`；

```js
config: {
  events: ['current-change']
},
events: {
  'table:current-change': (row) => {
    console.log(row)
  }
}
```