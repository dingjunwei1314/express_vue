var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoStore  = require('connect-mongo')(session),
    routes=require('./routes/router'),    
    app = express();
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    upload=require('./mids/multer'),/*需要通过multer中间件处理上传的文件，express默认不会对文件进行处理*/
    my_soket=require('./socket/index');
//设置请求头跨域
app.all('*',function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "http://localhost:8088");//设置可以跨域的前端域名
    res.header("Access-Control-Allow-Credentials", true);//设置可以携带cookie
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");//设置请求方法
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();

});

/*
如果是用ejs模板全后端不分离的话需要进行如下设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
*/

app.use(logger('dev'));

/*需要通过bodyParser中间件处理json数据,express默认不处理*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//将vue项目设置为静态文件实现前后端分离
// app.use(express.static(path.join(__dirname, 'vue-project')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

//这里传入了一个密钥加session id
app.use(cookieParser('dingjunwei'));

//session中间件设置服务端session
app.use(session({
    name: 'djw',   // 设置cookie中保存session id的字段名称
    secret: 'dingjunwei',// 通过设置secret，来计算hash值并放在cookie中，使产生的signedcookie防篡改
    saveUninitialized: false,   // 设置为false，强制创建一个session，即使用户未登录
    resave: true,               // 强制更新session
    cookie: {
      path:'/',
      maxAge: 300000000// 过期时间，过期后cookie中的sessionId自动删除
    },
    store: new MongoStore({          // 将sessionId存储到mongodb
        url: "mongodb://localhost:27017/mytest"
    })
}))

//路由
routes(app);
//socket
my_soket()
server.listen(3000);




