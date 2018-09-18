import BaseAction from '../base';
import Config from '../../config'

class GetGlobalInfoAction extends BaseAction {

  constructor(req, res) {
    super(req, res);
  }

  declare() {
    return {
      checkLogin: true,
      request: [{
        path: Config.RESETfulVideo.host + '/api/Global/info',
        method: 'get'
      }]
    }
  }
}

export default {
  path: '/interface/cameras/info',
  method: 'get',
  action: GetGlobalInfoAction
}
