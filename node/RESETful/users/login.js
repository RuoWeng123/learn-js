import BaseAction from '../base';
import Config from '../../config';
class LoginAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
        this.req = req;
    }

    declare() {
        return {
            request: [{
                path: Config.RESETful.host+'/token/login',
                method: 'post',
                body: [{
                    key: 'username'
                }, {
                    key: 'password'
                }, {
                    key: 'expire_time'
                }]
            }]
        }
    }

    beforeCompute() {
        this.session.token = this.httpRes[Config.RESETful.host+'/token/login'].token;
        console.log('token:' + this.session.token)
    }
}

export default {
    path: '/interface/users/login',
    method: 'post',
    action: LoginAction
};
