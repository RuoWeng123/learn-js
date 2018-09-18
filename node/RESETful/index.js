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

]
