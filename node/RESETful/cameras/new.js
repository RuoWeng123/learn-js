import BaseAction from '../base';
import Config from '../../config'

class CamerasNewAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare() {
        return {
            checkLogin: true,
            request: [{
                path: Config.RESETfulVideo.host + '/api/Cameras',
                method: 'post',
                body: [{
                    key: 'name'
                }, {
                    key: 'url'
                }]
            }]
        }
    }
}

export default {
    path: '/interface/cameras/new',
    method: 'post',
    action: CamerasNewAction
};
