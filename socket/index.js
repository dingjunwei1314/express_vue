//socket部分
var UserModel=require('../models/user');
const my_socket=function(){

    io.on('connection', function(socket){
        console.log('已连接')
        socket.emit("login",'logined');
        
        socket.on('login_info', function(data) {
            socket.name=data.user
            io.sockets.emit("login_info",data);
        })

        socket.on('newmessage', function(data) {
            console.log(data)
            UserModel.chat_info(data,function(err,doc){
                if(err){
                    console.log(err)
                }else{
                    var doc=doc.toObject();
                    io.sockets.emit("newmessage",{name:doc.name,img_src:'http://localhost:3000/'+doc.user_img.slice(8),content:data.msg})
                }
                
            })
            
        })

        socket.on('img', function(data){
            console.log(data.user)
            UserModel.chat_info(data,function(err,doc){
                if(err){
                    console.log(err)
                }else{
                    var doc=doc.toObject();
                    io.sockets.emit("img",{name:doc.name,img_src:'http://localhost:3000/'+doc.user_img.slice(8),img_content:data.img})
                }
                
            })
        })

        socket.on('disconnect', function () {
            console.log(socket.name)
            io.sockets.emit("login_out",socket.name);
        });
    })

}

module.exports=my_socket;