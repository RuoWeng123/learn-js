###node代理转发
+ 使用node代理的原因在于
1. 对接口进行统一处理，便于监听，统一加工
2. 便于格式统一化处理
3. 安全，前端屏蔽后端真实地址

+ 主要的文件夹包括。 base.js


## RESETful api

>参数请参考 https://coding.net/u/wikieswan/p/leaniot-fe/attachment/default/preview/2256678

## 集成接口处理
   在config中使用RESTfulPower配置，然后在接口配置中
    path:Config.RESETfulPower.host+"/api/v1/substation/${id}/overload_view/",


## 用户部分
#### 登录 ok
1. 接口地址： `/interface/users/login` => `/token/obtain/`
2. METHOD: `POST`
3. PARAMS: `{"email":"yzg963@gmail.com","password":"yzg134530"}`

#### 验证 Token 有效性+获取对应的用户信息
1. 接口地址： `/interface/users/tokenVerify` => `/token/verify`
2. METHOD: `GET`
3. PARAMS: ``

#### 查询所有用户的信息
1. 接口地址： `/interface/users/userList` => `/users/`
2. METHOD: `GET`
3. PARAMS: ``

#### 查询某个用户的信息
1. 接口地址： `/interface/users/getUserInfo/:user_id` => `/users/<user_id>`
2. METHOD: `GET`
3. PARAMS: ``

#### 注册新用户
1. 接口地址： `/interface/users/regUser` => `/users/`
2. METHOD: `POST`
3. PARAMS: `{"username":"test_user_04","email":"test_user_04@leaniot.cn","password":"test","projects":[]}`

### 退出登录 ok
1. 接口地址： `/interface/users/logout`
2. MEHOTD: `GET`
3. PARAMS: `{}`

#### 给新用户赋予权限
1. 接口地址： `/interface/users/userPermission/:user_id` => `/user_permissions/<user_id>`
2. METHOD: `POST`
3. PARAMS: `{"add_permission":"add_project,delete_project,change_project,add_device,delete_device,change_device,add_sensor,delete_sensor,change_sensor,add_customer,delete_customer,change_customer"}`

## 项目部分
#### 查询当前用户的全部项目 ok
1. 接口地址： `/interface/project/projectList` => `/projects/`
2. METHOD: `GET`
3. PARAMS: ``

#### 创建新项目 ok
1. 接口地址： `/interface/project/createProject` => `/projects/`
2. METHOD: `POST`
3. PARAMS: `{"name":"A Fancy Project","description":"..."}`

#### 将用户添加到项目
1. 接口地址： `/interface/project/addUserToProject/:project_id` => `/projects/<project_id>/`
2. METHOD: `POST`
3. PARAMS: `{"add_user": "<user_id>"}`

#### 删除项目
1. 接口地址： `/interface/project/deleteProject/:project_id` => `/projects/<project_id>/`
2. METHOD: `GET`
3. PARAMS: ``

#### 查询某个项目的具体信息 ok
1. 接口地址： `/interface/project/getProjectInfo/:project_id` => `/projects/<project_id>/`
2. METHOD: `GET`
3. PARAMS: ``

## 设备部分
#### 绑定设备
1. 接口地址： `/interface/device/bindDevice` => `/devices/`
2. METHOD: `POST`
3. PARAMS: ``

#### 查询当前用户的所有设备
1. 接口地址： `/interface/device/deviceList` => `/devices/`
2. METHOD: `POST`
3. PARAMS: `{"uuid":"5e7e2ba9-2bde-4e0f-8baa-157d0d1866a1","project":"EZkUgnZapKuUUrRPifAps2"}`

#### 查询某个设备的具体信息
1. 接口地址： `/interface/device/getDeviceInfo/:device_id` => `/devices/`
2. METHOD: `GET`
3. PARAMS: ``

#### 修改设备名字等属性
1. 接口地址： `/interface/device/updateDeviceInfo/:device_id` => `/devices/`
2. METHOD: `POST`
3. PARAMS: `{"name": "FancyBox"}`

#### 解绑设备
1. 接口地址： `/interface/device/deleteDevice/:device_id` => `/devices/<device_id>`
2. METHOD: `GET`
3. PARAMS: ``

## 传感器部分
### 查询用户所有的传感器 ok
1. 接口地址： `/interface/sensor/sensorList` => `/sensors/`
2. METHOD: `GET`
3. PARAMS: ``
4.
### 查询项目所有的传感器 ok
1. 接口地址： `/interface/sensor/projectSensorList` => `/sensors/`
2. METHOD: `POST`
3. PARAMS: `{projectId=112}`

###  查询某一传感器具体信息
1. 接口地址： `/interface/sensor/getSensorInfo/:sensor_id` => `/sensors/<sensor_id>`
2. METHOD: `GET`
3. PARAMS: ``

### 向设备添加传感器
1. 接口地址： `/interface/sensor/addSensor` => `/sensors/`
2. METHOD: `POST`
3. PARAMS: `{"name": "MemUsage","data_source": "buildin.used_memory","data_type": 1,"collector": { "period": 20 },"device": "LkyactGuzYHxVNX3SfpZ5d"}`

### 修改传感器
1. 接口地址： `/interface/sensor/updateSensor/:sensor_id` => `sensors/<sensor_id>/`
2. METHOD: `POST`
3. PARAMS: `{"name": "MemUsage","collector": { "period": 20 }}`

### 删除传感器
