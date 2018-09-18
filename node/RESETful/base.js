import config from '../config';
import * as constant from '../constant';
import http from 'request';

class BaseAction {
    constructor(req, res) {
        // 声明参数
        this.session = req.session;
        this.body = req.body;
        this.params = req.params;
        this.query = req.query;

        this.res = res;
        this.customBody = {};
        this.httpCount = 0;
        this.httpRes = {};
        this.__checkLogin();
    }

    /**
     * 检查登录
     * @return {[type]} [description]
     */
    __checkLogin() {
        const { checkLogin } = this.declare();

        if (checkLogin && !this.session.token) {
            return this.res.send(constant.NOT_LOGIN);
        }

        this.__getDeclare();
    }

    /**
     * 获取子类声明，分发
     * @return {[type]} [description]
     */
    __getDeclare() {
        const { request, response } = this.declare();

        if (toString.call(request) === '[object Array]' && request.length) {
            // 获取请求
            request.every((RESETful) => {
                return this.__verify(RESETful);
            });
        }
        else {
            this.__end();
        }
    }

    /**
     * 获取变量值
     * @param  {[type]} key [description]
     * @return {[type]}     [description]
     */
    __getValue(key, storage) {
        if (!storage) {
            if (this.body[key]) {
                return this.body[key];
            }
            else if (this.query[key]){
                return this.query[key];
            }
            else if (this.params[key]) {
                return this.params[key];
            }
            else {
                if (this.body[key] === 0 || this.body[key] === false) {
                    return this.body[key]
                } else {
                    return ''
                }

            }
        }
        else {
            return this[storage][key];
        }
    }

    /**
     * 变量验证，根据declare
     * @param  {[type]} property [description]
     * @return {[type]}          [description]
     */
    __validator(property) {
        const { value, min, max, reg, empty } = property;

        // 为空验证
        if (empty && !value) {
            return false;
        }
        // 字符串长度验证
        if (typeof value === 'string') {
            if (min && value.length < min) {
                return false;
            }
            else if (max && value.length > max) {
                return false;
            }
        }
        // 数字
        else {
            if (min && min > value) {
                return false;
            }
            else if (max && max < value) {
                return false;
            }
        }

        // 正则验证
        if (reg) {
            let _reg = reg;
            if (toString.call(reg) !== '[object RegExp]') {
                _leg = new RegExp(reg) ;
            }

            if (!_reg.test(value)) {
                return false;
            }
        }

        return true;
    }

    /**
     * 请求
     * @param  {[type]} RESETful [description]
     * @return {[type]}          [description]
     */
    __http(RESETful) {
        if (RESETful.path.indexOf('$') > -1) {
            const path = [];
            RESETful.path.split('/').forEach((item) => {
                const m = item.match(/^\${(.*?)}$/);
                if (m && this.params[m[1]]) {
                    path.push(this.params[m[1]]);
                }
                else {
                    path.push(item);
                }
            });
            RESETful.path = path.join('/');
        }

        // 整理请求地址
        let url = /^(http|https)/.test(RESETful.path)
            ? RESETful.path
            : config.RESETful.host + RESETful.path;

        if (RESETful.filter) {
            let params = {}
            RESETful.params.forEach((property) => {
                params[property.key] = property.value
            })
            url += '?filter=' + JSON.stringify(params);
        } else {
            let params = []
            if (toString.call(RESETful.params) === '[object Array]' && RESETful.params.length) {
                RESETful.params.forEach((property) => {
                    params.push(property.key + '=' + property.value);
                });
                params = '?' + params.join('&');
                url += params;
            }
        }

        // let params = [];
        // if (toString.call(RESETful.params) === '[object Array]' && RESETful.params.length) {
        //     RESETful.params.forEach((property) => {
        //         params.push(property.key + '=' + property.value);
        //     });
        //     params = '?' + params.join('&');
        //     url += params;
        // }

        // let params = {}
        // if (toString.call(RESETful.params) === '[object Array]' && RESETful.params.length) {
        //     RESETful.params.forEach((property) => {
        //         params[property.key] = property.value
        //     })
        //     url += '?filter=' + JSON.stringify(params);
        //     // console.log(url)
        // }

        const host = RESETful.hostname ? RESETful.hostname : config.RESETful.host;

        const headers = {
            'Content-type': 'application/json',
           // 'Authorization': "JWT " + this.session.token
        };
        /*
        let boundaryKey = '----' + new Date().getTime();
        const form_headers = {
             'Content-Type':'multipart/form-data; boundary=' + boundaryKey,
             'Connection':'keep-alive',
             'Authorization':"JWT " + this.session.token
        }
        */
        if (this.session.token) {
            headers['Authorization'] = "JWT " + this.session.token;
        }
        if (RESETful.useAdminToken) {
            headers['Authorization'] = config.adminToken;
        }

        const _body = Object.assign({}, this.customBody);

        if (toString.call(RESETful.body) === '[object Array]') {
            RESETful.body.forEach((property) => {
                _body[property.key] = property.value;
            });
        }

        const options = {
            url,
            method: RESETful.method,
            headers
        //    headers: RESETful.formAction ? form_headers : headers
        };

        if (this._isEmptyObj(_body)) {
            options.body = JSON.stringify(_body)
        }

        new Promise((resolve, reject) => {
            if (config.debug) {
                console.log('=============== start '+ url +' =================');
                console.log(options);
                console.log((new Date()).toLocaleString())
            }
            new http(options, (error, res, body) => {
                if (!res) {
                    return ;
                }
                if (error) {
                    reject(error);
                }
                if (res && res.statusCode) {
                    console.log(res.statusCode)
                    // if(res.statusCode === 401) {
                    //     reject('401')
                    // } 
                    // if(res.statusCode === 403) {
                    //     reject('403')
                    // }
                    if((res.statusCode === 400 || res.statusCode === 401 || res.statusCode === 403 || res.statusCode === 404 || res.statusCode === 500)) {
                        reject({
                            statusCode: res.statusCode, 
                            msg: body
                        })
                    }
                }
                let json;
                try {
                    // 如果body没有返回任何东西
                    if (body === '') {
                        json = {}
                    } else {
                        json = JSON.parse(body);
                    }
                } catch(e) {
                    console.log('##################json error#################')
                    // 如果body返回无效json格式
                    reject({
                        statusCode: res.statusCode,
                        msg: body
                    });
                }
                resolve(json);
            });
        }).then((res) => {
            this.httpCount++;
            this.httpRes[RESETful.path] = res;
            if (config.debug) {
                console.log(res);
                console.log('=============== end  '+ url +'=================');
            }

            this.__computeHttpRes(RESETful);
        }, (err) => {
            if (config.debug) {
                console.log(err)
                console.log('=============== end  '+ url +'================');
            }
            if(err.statusCode === 401) {
                this.res.send(constant.NOT_LOGIN)
            } else if( err.statusCode === 403) {
                this.res.send(constant.NO_AUTH)
            } else {
                this.res.send(Object.assign(constant.RPC_ERROR, { msg: JSON.stringify(err.msg) }));
                // this.res.send(constant.RPC_ERROR)
            }
            // if (config.debug) {
            //     console.log(msg);
            //     console.log('=============== end  '+ url +'================');
            // }
            // if(msg === '401') {
            //     this.res.send(constant.NOT_LOGIN)
            // } else if( msg === '403') {
            //     this.res.send(constant.NO_AUTH)
            // } else {
            //     this.res.send(Object.assign(constant.RPC_ERROR, { msg }));
            // }
        })
    }

    _isEmptyObj(obj) {
        let len = 0;
        for (let key in obj) {
            len++;
            if (len > 0) {
                break;
            }
        }

        return !!len;
    }

    /**
     * 判断请求结果是否完成
     * @return {[type]} [description]
     */
    __computeHttpRes(RESETful) {
        const { request } = this.declare();

        if (this.httpCount !== request.length) {
            return ;
        }

        if (typeof this.beforeCompute === 'function') {
            this.beforeCompute();
        }

        if (this.httpCount === 1) {
            this.res.send(Object.assign({}, constant.SUCCESS, {
                data: this.httpRes[RESETful.path]
            }));
        }
        else {
            this.__end();
        }
    }

    /**
     * 验证body、params请求及参数 调用__validator
     * @param  {[type]} RESETful [description]
     * @return {[type]}          [description]
     */
    __verify(RESETful) {
        // 验证body参数
        let verifyBody = true;
        // params
        let verifyParams = true;

        if (toString.call(RESETful.body) === '[object Array]') {
            // 获取参数值
            RESETful.body.forEach((property, key) => {
                RESETful.body[key]['value'] = this.__getValue(property.key);
            });
            verifyBody = RESETful.body.every((property) => {
                return this.__validator(property);
            });
        }

        if (toString.call(RESETful.params) === '[object Array]') {
            // 获取参数值
            RESETful.params.forEach((property, key) => {
                RESETful.params[key]['value'] = this.__getValue(property.key);
            });
            verifyParams = RESETful.params.every((property) => {
                return this.__validator(property);
            });
        }

        // 验证没有通过
        if (!verifyBody || !verifyParams) {
            this.res.send(constant.PARMAS_ERROR);
            return false;
        }
        else {
            this.__http(RESETful);
            return true;
        }
    }

    /**
     * 返还前端结果
     * @return {[type]} [description]
     */
    __end() {
        if (typeof this.compute === 'function') {
            this.compute();
        }
        else {
            this.__send();
        }
    }

    __send() {
        this.res.send(constant.SUCCESS);
    }
}

export default BaseAction;
