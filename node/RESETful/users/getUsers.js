import BaseAction from '../base';
import Config from '../../config'

class UsersAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare() {

        return {
            checkLogin: true,
            request: [{
                path: Config.RESETful.host + '/users',
                method: 'get'
            }]
        }
    }
};

export default {
    path: '/interface/users',
    method: 'get',
    action: UsersAction
};
