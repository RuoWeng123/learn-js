import BaseAction from '../base';

class LogoutAction extends BaseAction {

    constructor(req, res) {
        super(req, res);
        this.req = req;
    }

    declare() {
        return {
            request: null
        }
    }

    compute() {
        this.session.token = null;
        this.__send();
    }
}

export default {
    path: '/interface/users/logout',
    method: 'post',
    action: LogoutAction
}
