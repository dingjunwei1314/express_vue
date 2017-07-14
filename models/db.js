//链接数据库
var mongoose = require('mongoose');
var db=mongoose.createConnection('localhost','mytest')

db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
    console.log('open');
});

module.exports = db;