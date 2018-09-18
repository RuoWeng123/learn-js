//获取曲线
/*
* key说明
* 1、data_set 字符串， 点的数组字符串
* 2、target 聚合字段 可选max、min、avg
* 3、granularity 时间粒度 可选hour、day、month、year
* */
import BaseAction from '../base';
import Config from '../../config';

class PolymericCurve extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare(){
        return {
            request: [{
                path:Config.RESETfulCommon.host + "/polymeric-curve",
                method:"get",
                params: [
                    {key: 'data_set'},
                    {key: 'target'},
                    {key: 'granularity'}
                ]
            }]
        };
    }
}

export default{
    path: '/interface/polymeric-curve',
    method: 'get',
    action: PolymericCurve
};
