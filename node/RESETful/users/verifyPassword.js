import BaseAction from '../base';
import Config from '../../config';
class PasswordVerifyAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
        this.req = req;
    }

    declare() {
        return {
            request: [{
                path: Config.RESETful.host + '/users/password-verify',
                method: 'post',
                body: [{
                    key: 'username'
                }, {
                    key: 'password'
                }]
            }]
        }
    }
}

export default {
    path: '/interface/users/passwordVerify',
    method: 'post',
    action: PasswordVerifyAction
};