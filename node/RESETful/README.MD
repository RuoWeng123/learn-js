## RESETful 开发

```javascript

const example = {
    // 前端接口访问路径
    path: '/interface/test',
    // 请求方式 oneof get post
    method: 'get',
    action() {

    }
}

/**
 * action 详解
 */
class action extends Base {

    constructor(req, res) {
        super(req, res);
    }

    declare() {
        const request = [
            {
                // 远端地址 没有加http会自动拼接config中的代码
                path: '/token/obtain',
                header: {
                    'content-type': 'application/json'
                },
                // 通过body传递参数, 正常使用post请求进行body传递参数
                method: 'post',
                body: [{
                    key: "username",
                    key: "password"
                    // min max 验证数字的时候直接比对大小
                    // 最小长度 大于0会验证
                    min: 0,
                    // 最大长度 大于0会验证
                    max: 0,
                    // 正则验证
                    reg: '',
                    // 非空验证
                    empty: false
                }],
                /**
                 * 通过拼接URL传参数 （正常情况使用get请求时，使用url传递参数）
                 * http://leaniot.cn:3003/api/QuerySchemes/build?name=1111&kind=&mineId=&dataType=&sensorType
                 */
                //  eg：
                method: 'get',
                params: [{
                    key: "username",
                    key: "password"
                    // min max 验证数字的时候直接比对大小
                    // 最小长度 大于0会验证
                    min: 0,
                    // 最大长度 大于0会验证
                    max: 0,
                    // 正则验证
                    reg: '',
                    // 非空验证
                    empty: false
                }],
            }
        ];

        // 如果多接口需要数据处理 不需要请求不需要设置
        const response =  (responseData) {
            /**
             * responseData
             * {
             *    '/token/obtain': {}
             * }
             */
        }

        return {
            checkLogin: false,
            request,
            response
        }
    }
}

```

## POST请求

```javascript
class GetUserInfoAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare() {

        return {
            checkLogin: true,
            request: [{
                path: '/Users/${user_id}',
                method: 'post',
                // 通过body传参数
                body: [{
                    key: 'username',
                    key: 'password'
                }],
            }]
        }
    }
}

export default {
    // 前端访问路径
    path: '/interface/users/getUserInfo/:user_id',
    method: 'get',
    action: GetUserInfoAction
}
```

## 动态路由

```javascript
class GetUserInfoAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare() {

        return {
            checkLogin: true,
            request: [{
                path: '/Users/${user_id}',
                method: 'get',
                // 通过url拼接
                params: [{

                }]
            }]
        }
    }
}

export default {
    // 前端访问路径
    path: '/interface/users/getUserInfo/:user_id',
    method: 'get',
    action: GetUserInfoAction
}
```

UPDATE请求
