//获取报警页面
import BaseAction from '../base';
import Config from '../../config';
class GetWarninOverview extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare(){
        return {
            request: [{
                path:Config.RESETfulCommon.host+"/alarm/unconfirmed-count",
                method:"get",
            }]
        };
    }
}

export default{
    path: '/interface/warning/getWarningOverview',
    method: 'get',
    action: GetWarninOverview
};
