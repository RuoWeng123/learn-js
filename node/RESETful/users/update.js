import BaseAction from '../base';
import Config from '../../config'

class UsersUpdateAction extends BaseAction {

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
                    key: 'full_name'
                }]
            }]
        }
    }
}

export default {
    path: '/interface/users/update/:id',
    method: 'post',
    action: UsersUpdateAction
};
