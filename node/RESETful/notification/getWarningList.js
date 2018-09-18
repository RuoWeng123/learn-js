//获取报警页面
import BaseAction from '../base';
import Config from '../../config';
class GetWarningList extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare(){
        return {
            request: [{
                path:Config.RESETfulCommon.host+"/alarm",
                method:"get",
                params:[
                    {key: 'system'},
                    {key: 'alert_type'},
                    {key: 'start_date'},
                    {key: 'end_date'},
                    {key: 'limit'},
                    {key: 'offset'},
                    {key: 'is_confirmed'},
                ]
            }]
        };
    }
}

export default{
    path: '/interface/warning/getWarningList',
    method: 'get',
    action: GetWarningList
};
