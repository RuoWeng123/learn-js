---
pageClass: markdown-page
---

# Split

页面分割组件

### 左右布局

<Code tag="Split/SimpleOfLeftRight"/>

### 上下布局

<Code tag="Split/SimpleOfTopBottom"/>

### 混合布局

<Code tag="Split/Multiple"/>


### Attributes

| name           | default | desc                      
|----------------|---------|-------------
| `value`        |          | 面板位置，可以为0-1的百分比             
| `mode`         |horizontal| horizontal / vertical              
| `min`          |  40px    | 最小阈值                          
| `max`          |  40px    | 最大阈值                         

### Events

| name           | default | desc                      
|----------------  |---------|-------------
| `on-move-start`  |         | 拖拽开始            
| `on-moving`      |  event  | 拖拽中                         
| `on-move-end`    |         | 拖拽结束    
                      
### Split slot

| name           | default | desc                      
|----------------|---------|-------------
| `left`         |         | mode为horizontal时，标记为左侧面板            
| `right`        |         | mode为horizontal时，标记为右侧面板                         
| `top`          |         | mode为vertical时，上边面板                          
| `bottom`       |         | mode为vertical时，底部面板                          
