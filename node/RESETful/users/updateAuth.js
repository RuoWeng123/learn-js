/**
 * 更新用户权限接口
 * @param permissions Arrays
 */
import BaseAction from '../base';
import Config from '../../config'

class UsersUpdateAuthAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare() {
        return {
            checkLogin: true,
            request: [{
                path: Config.RESETful.host + '/users/${id}',
                method: 'PUT',
                body: [{
                    key: 'permissions'
                }]
            }]
        }
    }
}

export default {
    path: '/interface/users/updateAuth/:id',
    method: 'post',
    action: UsersUpdateAuthAction
};
