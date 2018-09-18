import fs from 'fs';
import path from 'path';
// import config from '../config';
//用户相关接口
import LoginAction from './users/login';
import LogoutAction from './users/logout';
import GetUserInfoAction from './users/getUserInfo';
import UsersAction from './users/getUsers'
import UsersNewAction from './users/new';
import UsersUpdateAction from './users/update'
import UsersUpdateAuthAction from './users/updateAuth'
import UsersUpdatePasswordAction from './users/updatePassword'
import UsersDeleteAction from './users/delete'
import UpdateToken  from './users/updateToken';
import SystemsAction from './users/getSystems'
import PasswordVerifyAction from './users/verifyPassword'
import KeyVerifyAction from './users/verifyKey'

//通用接口
import PointMap from './common/pointMap';
import PolymericCurve from './common/polymericCurve';
import HistoryData from './common/getHistory'
import ReportList from './common/reportList';
import ReportDetail from './common/reportDetail';
import TargetReportList from './common/targetReportList';
import Control from './common/control';

// 视频监控
import CamerasNewAction from './cameras/new'
import CamerasUpdateAction from './cameras/update'
import GetCamerasAction from './cameras/getCameras'
import GetFavAction from './cameras/getFavCameras'
import UpdateFavCamerasAction from './cameras/updateFavCameras'
import GetCameraGlobalInfoAction from './cameras/getGlobalInfo'
import CamerasTranscodeAction from './cameras/transcode'

//报警系统
import GetWarningList from './notification/getWarningList'
import UpdateTargetWarning from './notification/updateTargetWarning'
import GetWarninOverview from './notification/getWarningOverview'

// 配置中心
import ConfigNew from './config/new'
import ConfigGetText from './config/getTextData'

const IndexAction = {
    path: '/',
    method: 'get',
    action(req, res) {
        const html = fs.readFileSync(path.resolve(__dirname, '../../dist/index.html'), 'utf-8');
        res.send(html);
    }
}

const downloadPdf = {
    path: '/interface/download/help',
    method: 'get',
    action(req, res) {
        // const pdf = fs.readFileSync(path.resolve(__dirname, '../static/RED-MOS.pdf'), 'utf-8')
        // res.send({
        //     code: 10000,
        //     data: pdf
        // })

        let filePath = path.resolve(__dirname, '../static/RED-MOS.pdf')
        let fileName = 'RED-MOS.pdf'
        let stats = fs.statSync(filePath);

        res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename='+fileName,
            'Content-Length': stats.size
        });
        fs.createReadStream(filePath).pipe(res);
    }
}

const AQJKFEPort = {
    path: '/interface/ports/aqjk',
    method: 'get',
    action(req, res) {
        // let WebSocketAQJK = process.env
        res.send({
            code: 10000,
            port: process.env.FRONTEND_AQJK_PORT || 8000
        })
    }
}

export default [
    IndexAction,
    LogoutAction,
    LoginAction,
    GetUserInfoAction,
    UsersAction,
    UsersNewAction,
    UsersUpdateAction,
    UsersUpdateAuthAction,
    UsersUpdatePasswordAction,
    UsersDeleteAction,
    downloadPdf,
    UpdateToken,
    SystemsAction,
    PasswordVerifyAction,
    KeyVerifyAction,

    //通用接口
    PointMap,
    PolymericCurve,
    HistoryData,
    ReportList,
    ReportDetail,
    TargetReportList,
    Control,
    
    // 视频监控
    CamerasNewAction,
    CamerasUpdateAction,
    GetCamerasAction,
    GetFavAction,
    UpdateFavCamerasAction,
    GetCameraGlobalInfoAction,
    CamerasTranscodeAction,

    //warning
    GetWarningList,
    UpdateTargetWarning,
    GetWarninOverview,

    // 配置中心
    ConfigNew,
    ConfigGetText
]
