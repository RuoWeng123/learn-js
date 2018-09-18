import BaseAction from '../base';
import Config from '../../config';
class KeyVerifyAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
        this.req = req;
    }

    declare() {
        return {
            request: [{
                path: Config.RESETful.host + '/api/v1/token/api-token-key/',
                // path: 'http://192.168.1.117:8008/api/v1/token/api-token-key/',
                method: 'get',
                params: [{
                    key: 'key'
                }]
            }]
        }
    }

    beforeCompute() {
        this.session.token = this.httpRes[Config.RESETful.host+'/api/v1/token/api-token-key/'].token;
        // this.session.token = this.httpRes['http://192.168.1.117:8008/api/v1/token/api-token-key/'].token;
        console.log('token:' + this.session.token)
    }
}

export default {
    path: '/interface/users/keyVerify',
    method: 'post',
    action: KeyVerifyAction
};