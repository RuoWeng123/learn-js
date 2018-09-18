import BaseAction from '../base';
import Config from '../../config'

class ConfigNewAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare() {
        return {
            checkLogin: false,
            request: [{
                path: Config.RESETfulConfig.host + '/config/',
                method: 'post',
                body: [{
                    key: 'key'
                }, {
                    key: 'value'
                }]
            }]
        }
    }
}

export default {
    path: '/interface/config/new',
    method: 'post',
    action: ConfigNewAction
};
