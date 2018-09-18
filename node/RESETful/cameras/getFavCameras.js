import BaseAction from '../base';
import Config from '../../config'

class GetFavCamerasAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare() {

        return {
            checkLogin: true,
            request: [{
                path: Config.RESETfulVideo.host + '/api/Cameras/favorite',
                method: 'get'
            }]
        }
    }
}

export default {
    path: '/interface/cameras/favorite',
    method: 'get',
    action: GetFavCamerasAction
}
