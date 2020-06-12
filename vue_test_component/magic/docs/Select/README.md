---
pageClass: markdown-page
---

# Select

拓展为具备全选功能的Select

### 全选功能

设置`multiple`为`true`，可以开启多选，自带全选功能

<Code tag="Select/Multiple"/>

### 折叠显示

设置`collapse-tags`为`true`，可以避免输入框抖动

<Code tag="Select/Collapse"/>

### 输出对象

如果希望组件输出的值为当前数据obj，可以设置`outputKey`= `''`

<Code tag="Select/Output"/>

### 自定义option

通过slot-scope自定义option，显示更多的信息

<Code tag="Select/Custom"/>

### Attributes

| name           | default | desc                      
|----------------|---------|-------------
| value          |         | 输出的值             
| source         |         | 下拉列表的数据              
| labelKey       |  label  | 显示的label所对应的key                          
| outputKey      |  value  | 选中后的value所对应的key                         
| ...            |         | 其它参数同`el-select`保持一致                         

### Events

| name           | default | desc                      
|----------------|---------|-------------
| input          |         | v-model            
| ...            |         | 其他参数与el-select的events保持一致                          
