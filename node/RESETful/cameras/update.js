import BaseAction from '../base';
import Config from '../../config'

class CamerasUpdateAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare() {
        return {
            checkLogin: true,
            request: [{
                path: Config.RESETfulVideo.host + '/api/Cameras/${id}',
                method: 'PATCH',
                body: [{
                    key: 'name'
                }]
            }]
        }
    }
}

export default {
    path: '/interface/cameras/update/:id',
    method: 'post',
    action: CamerasUpdateAction
};
