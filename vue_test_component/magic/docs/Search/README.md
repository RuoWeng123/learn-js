---
pageClass: medium-page
---

# Search

使用search组件，快速布局

### 基础用法

<Code tag="Search/Simple" style="max-width: 1200px;"/>

### 按钮固定

<Code tag="Search/Fixed" style="max-width: 1200px;"/>

### 显示多个

<Code tag="Search/Multiple" style="max-width: 1200px;"/>

### SearchConfig

| name            | default         | desc             
| --------------- | --------------- | ----------------  
| moreText        |   全部           | 当columns的数量大于maxCount时出现的链接文字描述  
| maxCount        |   1             | 最多显示一个，其余的弹出显示     
| btnFixed        |   false         | 弹出框内，按钮是否固定在底部
| showLabel       |   false         | 是否显示label
| drawer          |                 | 抽屉的配置参数

### SearchColumn

| name            | default         | desc             
| --------------- | --------------- | ----------------  
| label           |                 | column的label    
| field           |                 | column的字段     
| layout          |                 | column的布局     
| source          |                 | column的数据  
| props           |                 | column所对应组件的参数
| events          |                 | column所对于组件的事件
| ...             |                 | 其他参数，一律作为props，向下穿


### SearchEvents

| name            | params            | desc             
| --------------- | ----------------- | ----------------  
| init            |                   | search组件初始化    
| reset           |                   | 重置数据
| search          |   form            | 搜索时间
