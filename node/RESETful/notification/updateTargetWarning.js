//报警确认接口
import BaseAction from '../base';
import Config from '../../config';
class UpdateTargetWarning extends BaseAction {

    constructor(req, res) {
        super(req, res);
    }

    declare(){
        return {
            request: [{
                path:Config.RESETfulCommon.host+"/alarm/confirm",
                method:"post",
                body:[
                    {key:'ids'},
                ]
            }]
        };
    }
}

export default{
    path: '/interface/warning/updateTargetWarning',
    method: 'post',
    action: UpdateTargetWarning
};
