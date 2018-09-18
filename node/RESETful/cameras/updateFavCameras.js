import BaseAction from '../base';
import Config from '../../config'

class UpdateFavCamerasAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare() {

        return {
            checkLogin: true,
            request: [{
                path: Config.RESETfulVideo.host + '/api/Cameras/favorite',
                method: 'post', 
                body: [{
                    key: 'cameras'
                }]
            }]
        }
    }
}

export default {
    path: '/interface/cameras/favorite/update',
    method: 'post',
    action: UpdateFavCamerasAction
}
