# magic

## 开发环境

基础

- Node.js - `10.x`
- yarn - `1.16`
- Vue CLI - `3`

```sh
# 获取代码
git clone https://git.leaniot.cn/platform/margic.git

# 下载依赖
yarn global add vuepress
yarn install

# 开发
yarn run serve

# 打包
yarn run build

# 开发-文档
yarn run docs:dev

# 打包-文档
yarn run docs:build
```

权限报错处理

```
Error: EACCES: permission denied
sudo chown -R $USER:$GROUP {报错路径}
```

## 组件列表

### 基础组件

| name           | complete |          desc            
|----------------|----------|-------------------------------
|`PopoverConfirm`|   yes    |弹出确认框                 
| `Buttons`      |   yes    |按钮组                 
| `clipboard`    |   yes    |剪贴板操作组件                 
| `spinner`      |   yes    |过渡动画组件                    
| `autoLoading`  |   yes    |自动加载组件                    
| `select`       |   yes    |下拉选框（拓展全选功能） 
| `treeSelect`   |   yes    |下拉树组件                      
| `drawer`       |   yes    |抽屉组件                        
| `split`        |   yes    |页面分割组件                    
| `fullScreen`   |   yes    |全屏组件                        
| `qrCode`       |   yes    |二维码组件                      
| `signaturePen` |   yes    |手写签字笔组件                  
| `customPanel`  |   yes    |可拖动，拉伸面板                 
| `layer`        |   yes    |弹框组件                        
| `print`        |   yes    |打印功能                        

### 业务组件

| name     | complete | desc                             
|----------|----------|-----------------------------------
| `page`   |   yes    | 页面组件 
| `tree`   |   yes    | 树型组件
| `form`   |   yes    | 表单组件
| `table`  |   yes    | 表格组件     
|`treegrid`|   yes    | 树型表格组件    
|`editable`|   yes    | 可编辑表格组件    
| `search` |   yes    | 搜索框组件         
| `import` |   yes    | 文件上传导入（txt, excel）         

## 组件库文档 - 部署

使用 docker-compose 启动镜像，暴露容器的 `8080` 端口。

```yaml
# docker-compose.yml

version: "3"

services:
  magic-doc:
    image: harbor.leaniot.cn/magic/doc:latest
    restart: unless-stopped
    ports:
      - 8080:8080
```
