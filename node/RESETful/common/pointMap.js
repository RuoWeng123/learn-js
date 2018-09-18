//获取点表
import BaseAction from '../base';
import Config from '../../config';

class PointMap extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare(){
        return {
            request: [{
                path:Config.RESETfulCommon.host + "/web-api/point-map",
                method:"get"
            }]
        };
    }
}

export default{
    path: '/interface/point-map',
    method: 'get',
    action: PointMap
};
