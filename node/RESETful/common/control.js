/**
 * 通用控制接口
 * @param points Array 
 * eg: {"points":[{"point":"0014_00_00_TF_1_DY.PV","action":true}]}
 */
import BaseAction from '../base';
import Config from '../../config';

class Control extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare(){
        return {
            request: [{
                path:Config.RESETfulCommon.host + "/control",
                method:"post",
                body: [
                    {key: 'points'},
                ]
            }]
        };
    }
}

export default{
    path: '/interface/control',
    method: 'post',
    action: Control
};
