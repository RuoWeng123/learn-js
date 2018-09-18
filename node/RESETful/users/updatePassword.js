import BaseAction from '../base';
import Config from '../../config'

class UsersUpdatePasswordAction extends BaseAction {

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
                    key: 'password'
                }]
            }]
        }
    }
}

export default {
    path: '/interface/users/updatePassword/:id',
    method: 'post',
    action: UsersUpdatePasswordAction
};
