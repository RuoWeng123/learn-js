//获取历史数据
/*
* key说明
* 1、data_set 字符串， 点的数组字符串
* 2、start_time 开始时间 ISODateString
* 3、end_time 结束时间 ISODateString
* 4、limit 分页 每页多少条
* 5、offset 分页 从多少条开始查
* */
import BaseAction from '../base';
import Config from '../../config';

class HistoryData extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare(){
        return {
            request: [{
                path:Config.RESETfulCommon.host + "/history",
                method:"get",
                params: [
                    {key: 'data_set'},
                    {key: 'start_time'},
                    {key: 'end_time'},
                    {key: 'limit'},
                    {key: 'offset'}
                ]
            }]
        };
    }
}

export default{
    path: '/interface/data/history',
    method: 'get',
    action: HistoryData
};
