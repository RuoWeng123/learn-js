import BaseAction from '../base';
import Config from '../../config';

class GetCamerasAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare() {

        return {
            checkLogin: true,
            request: [{
                path: Config.RESETfulVideo.host + '/api/Cameras',
                method: 'get'
            }]
        }
    }
}

export default {
    path: '/interface/cameras',
    method: 'get',
    action: GetCamerasAction
}
