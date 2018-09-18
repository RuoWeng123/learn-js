import Express from 'express';
import config from './config';
import bodyParser from 'body-parser';
import RESETfulMap from './RESETful';
import Ejs from 'ejs';
import session from 'express-session';
import path from 'path';

// 实例express
const app = new Express();

// 资源路径
const assetPath = path.resolve(__dirname, '../dist');
app.use(Express.static(assetPath));

// 中间件参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
    const _send = res.send;
    let sent = false;
    res.send = function(data) {
        if (sent) {
            return;
        }

        _send.bind(res)(data);
        sent = true;
    };
    next();
});

// session
app.set('trust proxy', 1);
app.use(session({
    secret: 'keyboard cat',
    key: 'sid',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

// 模板引擎
if (config.render.engine === 'jade') {
    app.set('view engine', config.render.engine);
}
else {
    app.set('view engine', 'html');
    app.engine('html', Ejs.__express);
}

// 模板目录
app.set('views', __dirname + '/views');

// 初始化路由&RESETful
RESETfulMap.forEach((RESETful) => {
    const { path, action, method } = RESETful;

    app[method](path, (req, res) => {
        new action(req, res);
    });
});

const server = app.listen(config.server.port, () => {
    console.log('running http://localhost:' + config.server.port);
});
