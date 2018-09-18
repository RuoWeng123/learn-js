import BaseAction from '../base';
import Config from '../../config'

class UsersDeleteAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare() {
        return {
            checkLogin: true,
            request: [{
                path: Config.RESETful.host + '/users/${id}',
                method: 'DELETE'
            }]
        }
    }
}

export default {
    path: '/interface/users/delete/:id',
    method: 'post',
    action: UsersDeleteAction
};
