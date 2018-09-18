import BaseAction from '../base';
import Config from '../../config';
class UpdateToken extends BaseAction {

  constructor(req, res) {
    super(req, res);
    this.req = req;
  }

  declare() {
    return {
      request: [{
        path: Config.RESETful.host+'/token/refresh',
        method: 'post',
        body: [{
          key: 'token'
        }]
      }]
    }
  }
    beforeCompute() {
        //console.log(this.httpRes[Config.RESETful.host+'/api/v1/token/api-token-refresh/'])

        this.session.token = this.httpRes[Config.RESETful.host+'/token/refresh'].token;
        console.log('token:' + this.session.token)
    }
}

export default {
  path: '/interface/users/updateToken',
  method: 'post',
  action: UpdateToken
};
