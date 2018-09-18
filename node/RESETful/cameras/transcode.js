import BaseAction from '../base';
import Config from '../../config'

class CamerasTranscodeAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare() {
        return {
            checkLogin: true,
            request: [{
                path: Config.RESETfulTranscode.host + '/retainTask',
                method: 'POST',
                body: [{
                    key: 'url'
                }]
            }]
        }
    }
}

export default {
    path: '/interface/cameras/transcode',
    method: 'post',
    action: CamerasTranscodeAction
};
