import BaseAction from '../base';
import Config from '../../config'

class ConfigGetTextAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare() {
        return {
            checkLogin: false,
            request: [{
                path: Config.RESETfulConfig.host + '/config/${key}/',
                method: 'get'
            }]
        }
    }
}

export default {
    path: '/interface/config/:key',
    method: 'get',
    action: ConfigGetTextAction
};
