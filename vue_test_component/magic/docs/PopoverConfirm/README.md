---
pageClass: markdown-page
---

# PopoverConfirm

简单封装确认对话框，常见的使用方式，比如，删除，提交等

### 基础用法

<Code tag="PopoverConfirm/Simple"/>

### 校验函数

通常我们需要在提交前，先进行表单校验，校验通过后，才打开对话面板

<Code tag="PopoverConfirm/Validate"/>

### Attributes


| 名称           | 描述                            |
|----------------|-------------------------------|
| title          | 对话框的标题                    |
| content        | 对话框的描述文件                 |
| width          | 对话框的宽度                    |
| placement      | 对话框的弹出的位置，默认为`top`    |
| validate       | 打开对话框之前的校验函数           |

### Events


| 名称           | 描述                            |
|----------------|-------------------------------|
| confirm        | 点击确认时派发的事件              |
| cancel         | 点击取消时派发的事件              |
