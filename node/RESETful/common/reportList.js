//获取报表列表
import BaseAction from '../base';
import Config from '../../config';

class ReportList extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare(){
        return {
            request: [{
                path:Config.RESETfulCommon.host + "/daily-report/list",
                method:"get"
            }]
        };
    }
}

export default{
    path: '/interface/daily-report/list',
    method: 'get',
    action: ReportList
};
