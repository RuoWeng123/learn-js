/**
 * 获取单个用户信息
 */
import BaseAction from '../base';
import Config from '../../config'

class GetUserInfoAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare() {

        return {
            checkLogin: true,
            request: [{
                path: Config.RESETful.host + '/users/${user_id}/',
                method: 'get'
            }]
        }
    }
}

export default {
    path: '/interface/users/getUserInfo/:user_id',
    method: 'get',
    action: GetUserInfoAction
}
