---
pageClass: large-page
---

# Form

使用form组件快速布局

### 基础用法

<Code tag="Form/Simple" style="max-width: 850px;"/>

### Cols

<Code tag="Form/Cols" style="max-width: 850px;"/>

### 表单页

<Code tag="Form/test" style="max-width: 850px;"/>
### Page页

<Code tag="Form/page" style="max-width: 850px;"/>

### LabelPosition

::: warning 说明
默认情况下，label的位置在表单的上方，主要是为了解决label长度参差不齐的情况 <br/>
在label的名称相对规整情况下，可以设置`labelPosition`为`right`
:::

<Code tag="Form/LabelPosition" style="max-width: 850px;"/>

### 表单校验

- `隐患内容` : 使用内置普通的表单校验，即有无 <br/>
- `邮箱地址` : 使用内置特殊的表单校验，使用关键字 `1` <br/>
- `身份证号` : 使用内置特殊的表单校验，使用关键字 `3` 其他情况，详见下面 <br/>
- `活动名称` : 使用element-ui默认的表单校验 <br/>
- `开始日期 - 结束日期` : 表单多字段联合校验，使用注意点在于`this.options.context.validate(字段名)` <br/>

<Code tag="Form/Rules" style="max-width: 850px;"/>

### 插入column

对于复杂的布局，可以通过插入自定义的内容来实现

<Code tag="Form/Column"/>

### 自定义column

对于上例所实现的功能，我们可以通过自定义column来实现需求

##### 自定义的CustomColumn实现

<Code tag="Form/CustomColumn" :component="false"/>

##### 表单内调用示例

<Code tag="Form/Custom"/>

### 校验规则清单

<Code tag="Form/rule" suffix="js" :component="false"/>

### 示例数据清单

<Code tag="Form/data" suffix="js" :component="false"/>

### FormColumn清单文件

| name            |      
| --------------- |
| Text            |                       
| Textarea        |                     
| AutoComplete    |                     
| Number          |                     
| Rate            |                     
| Date            |                     
| DateRange       |                     
| DateYear        |                     
| DateMonth       |                     
| DateMonthRange  |                     
| DateTime        |                     
| Time            |                     
| TimeRange       |                     
| Select          |                     
| TreeSelect      |                     
| Cascader        |                     
| Radio           |                    
| Switch          |                     
| Checkbox        |                     
| ColorPicker     |                     
| Slider          |                     

### FormConfig

| name            | default         | desc             
| --------------- | --------------- | ----------------  
| labelWidth      |   100px         | v-model     
| labelPosition   |   top           | label的位置     
| size            |   medium        | form表单的大小     
| rules           |   { }           |   
| gutter          |   26            | 
| cols            |   24            | 
| btnAlign        |   right         | btn的位置
| btnShadow       |   false         | btn是否显示阴影
| confirm         |   true          | 提交确认

### FormColumn

| name            | default         | desc             
| --------------- | --------------- | ----------------  
| label           |                 | column的label    
| field           |                 | column的字段     
| layout          |                 | column的布局     
| source          |                 | column的数据  
| cols            |                 | column所占宽度
| rules           |                 | column表单校验
| props           |                 | column所对应组件的参数
| events          |                 | column所对于组件的事件
| ...             |                 | 其他参数，一律作为props，向下穿


### FormEvents

| name            | params            | desc             
| --------------- | ----------------- | ----------------  
| init            |                   | 表单初始化事件 （一次）    
| create          | done(callback)    | 表单创建事件  （多次）
| close           |                   | 关闭     
| cancel          |                   | 取消     
| submit          |form,done(callback)| 提交事件
| search          |                   | 提交成功后，刷新事件
