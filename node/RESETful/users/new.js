import BaseAction from '../base';
import Config from '../../config'

class UsersNewAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare() {
        return {
            checkLogin: true,
            request: [{
                path: Config.RESETful.host + '/users',
                method: 'post',
                body: [{
                    key: 'username'
                }, {
                    key: 'password'
                }, {
                    key: 'full_name'
                }]
            }]
        }
    }
}

export default {
    path: '/interface/users/new',
    method: 'post',
    action: UsersNewAction
};
