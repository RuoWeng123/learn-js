---
pageClass: markdown-page
---

# Treeselect

下拉树组件

### 简单示例

默认情况下单选，选中后显示全路径名称

<Code tag="Treeselect/Simple"/>

### 单选叶子

设置 `showAllLevels` 为 false, 选中后只显示最后一级的名称

<Code tag="Treeselect/SimpleLast"/>

### 单选任意层级

设置 `changeOnSelect` 为 true, 可以选中tree上面的任意一级

<Code tag="Treeselect/SimpleChange"/>

### 多选

设置 `multiple` 为 true, 可以进行多选

<Code tag="Treeselect/Multiple"/>

### 多选叶子

设置 `leafOnly` 为 true, 只输出和显示叶子节点

<Code tag="Treeselect/MultipleLeafOnly"/>

### 严选模式

设置 `checkStrictly` 为 true, 每一个节点都是单独的一个个体

<Code tag="Treeselect/MultipleStrictly"/>

### Attributes

| name           | default | desc                      
|----------------|---------|-------------
| value          |         | 输入的值             
| source         |         | 所需要的数据              
| multiple       |  false  | 是否运行多选                          
| showAllLevels  |  true   | 单选时是否显示全路径                          
| changeOnSelect |  false  | 选择即改变，不必选择到最后一级                          
| leafOnly       |  false  | 是否值返回叶子节点的数据                          
| checkStrictly  |  false  | 是否为严选模式                          
| ...            |         | 其他参数与el-tree的参数保持一致                          

### Events

| name           | default | desc                      
|----------------|---------|-------------
| input          |         | v-model            
| ...            |         | 其他参数与el-tree的events保持一致                          
