//获取报表详情
/*
* key说明
* 1、date 日期 格式为YYYY-MM-DD 例2018-07-24
* 2、data_set 测点数组字符串
* */
import BaseAction from '../base';
import Config from '../../config';

class ReportDetail extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare(){
        return {
            request: [{
                path:Config.RESETfulCommon.host + "/daily-report/detail",
                method:"get",
                params: [
                    {key: 'date'},
                    {key: 'data_set'}
                ]
            }]
        };
    }
}

export default{
    path: '/interface/daily-report/detail',
    method: 'get',
    action: ReportDetail
};
