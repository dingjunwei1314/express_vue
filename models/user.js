var mongoose = require('mongoose');
var db=require('./db');

var UserSchema = new mongoose.Schema({          
    name : { type: String },                
    password: {type: String},
    user_img:{type:String}                      
});

UserSchema.statics.user_login=function(req,cb){
    var name=req.body.uname;
    return this.model('User').findOne({name:name},cb)
}

UserSchema.statics.user_info=function(req,cb){
    var name=req.session.user;
    return this.model('User').findOne({name:name},cb)
}

UserSchema.statics.updata_user_img=function(req,cb){
    var name=req.session.user,
        user_img=req.file.path;
    return this.model('User').update({name:name},{$set:{user_img:user_img}},cb);
}

UserSchema.statics.chat_info=function(data,cb){
    var name=data.user;
    return this.model('User').findOne({name:name},cb)
}


var UserModel=db.model('User',UserSchema);
module.exports = UserModel;