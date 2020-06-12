---
pageClass: markdown-page
---

# QRCode

通常我们需要把一个网址，生成二维码

### 基础用法

<Code tag="QRCode/Simple"/>

### 点击下载

<Code tag="QRCode/Download"/>

### Attributes


| name           | default | desc                      
|----------------|---------|-------------
| value          |         | 当前二维码的值             
| size           |   128   | 二维码的大小               
| colorDark      | #000000 |                           
| colorLight     | #FFFFFF |                         
| fileName       |  二维码  | 文件名称                    
| download       |  false  | 是否使用下载功能           

### Methods


| name           | desc    
|----------------|-------------------------------
| onRefresh      | 刷新二维码  
| onDownload     | 下载二维码  
