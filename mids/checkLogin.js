/*检测登录中间件*/

module.exports=function(req,res,next){
    console.log(req.session.user)

    if(req.session.user){  
        next();  
    }else{  
        res.send({code:-100,message:'未登录'})
    }  
    
}