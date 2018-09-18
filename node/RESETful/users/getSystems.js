import BaseAction from '../base';
import Config from '../../config'

class SystemsAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare() {

        return {
            checkLogin: true,
            request: [{
                path: Config.RESETful.host + '/system-permissions',
                method: 'get'
            }]
        }
    }
};

export default {
    path: '/interface/systems',
    method: 'get',
    action: SystemsAction
};
