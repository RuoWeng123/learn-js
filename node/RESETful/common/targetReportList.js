//获取报表列表
import BaseAction from '../base';
import Config from '../../config';

class TargetReportList extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare(){
        return {
            request: [{
                path:Config.RESETfulCommon.host + "/daily-report/detail",
                method:"post",
                body: [
                    {key: 'date'},
                    {key: 'template'}
                ]
            }]
        };
    }
}

export default{
    path: '/interface/daily-report/report_list',
    method: 'post',
    action: TargetReportList
};
