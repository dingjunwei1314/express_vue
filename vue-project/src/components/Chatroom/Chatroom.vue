<template>
  <div class="section" style="background:#eee;">
    <div class="history_con">

      <div class="list_con" v-for="(item,index) in history_data" :key="index" v-if="item.type=='sys_in'">
          <img class="header" src="../../assets/img/sys.png">
          <div class="con">
            用户 <span style="color:#1AAD19">{{item.name}}</span> 进入了聊天室
          </div>
      </div>

      <div class="list_con" v-else-if="item.type=='sys_out'">
         <img class="header" src="../../assets/img/sys.png">
          <div class="con">
            用户 <span style="color:#1AAD19">{{item.name}}</span> 离开了聊天室
          </div>
      </div>

      <div class="list_con me" v-else-if="item.type=='me'">
         <img class="header"   :src="item.img_src">
          <div class="con">
            {{item.content}}
          </div>
      </div>

      <div class="list_con me" v-else-if="item.type=='me_img'">
         <img class="header"   :src="item.img_src">
          <div class="con">
            <img @click="show(item.img_content)" style="max-width:100px;" :src="item.img_content">
          </div>
      </div>

      <div class="list_con" v-else-if="item.type=='others_img'">
         <img class="header"   :src="item.img_src">
          <div class="con">
            <img @click="show(item.img_content)" style="max-width:100px;" :src="item.img_content">
          </div>
      </div>

    </div>

    <div v-transfer-dom>
      <previewer :list="img_list" ref="previewer"></previewer>
    </div>

    <div class="send_con">
      <input ref='img_input' style="display:none" type="file" accept="image/png,image/jpeg" @change="update($event)"/>
      <x-icon type="images" @click="send_img" style="vertical-align:middle" size="25"></x-icon>
      <input type="text" v-model="msg" name="content"> 
      <x-button mini type="primary" @click.native="send_text">发送</x-button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client' 
import {XButton,Previewer, TransferDom } from 'vux'
export default {
  name: 'home',
  directives: {
    TransferDom
  },
  components: {
    XButton,
    io,
    Previewer 
  },
  data () {
    return{
      socket_io:'',
      history_data:[],
      username:'',
      msg:'',
      user_img:'',
      img_list:[{src:''}]
    }
  },
  created(){
    
  },
  methods:{
    show(src){
      this.img_list[0].src=src;
      this.$refs.previewer.show(0)
    },
    send_text(){
      if(this.msg==''){
        return false;
      }
      this.socket_io.emit('newmessage',{user:this.username,msg:this.msg});
      this.msg='';
    },
    send_img(){
      this.$refs.img_input.click()
    },
    update(event){
      var that=this
      var file=event.target.files;
      if (file.length != 0) {
          
          var reader = new FileReader();
          if (!reader) {
              console.log('不支持fileReader')
          }
          reader.readAsDataURL(file[0]);
          reader.onload = function(e) {
              //读取成功，显示到页面并发送到服务器
              that.socket_io.emit('img',{user:that.username,img:e.target.result})
          };
          
      }
    },
    socket_connect(){
      var that=this;
      that.socket_io=io.connect('http://localhost:3000');
      that.socket_io.on('login',function(data){
        that.socket_io.emit('login_info',{user:that.username});
      });
      that.socket_io.on('login_info',function(data){
        that.history_data.push({type:'sys_in',name:data.user,content:'',img_src:''})
      });
      that.socket_io.on('login_out',function(data){
        that.history_data.push({type:'sys_out',name:data,content:'',img_src:''})
      });

      that.socket_io.on('img',function(data){
        console.log(data)
        if(data.name==that.username){
          that.history_data.push({type:'me_img',name:data.name,img_content:data.img_content,img_src:data.img_src})
        }else{
          that.history_data.push({type:'others_img',name:data.name,img_content:data.img_content,img_src:data.img_src})
        }
      })

      that.socket_io.on('newmessage',function(data){
        console.log(data)
        if(data.name==that.username){
          that.history_data.push({type:'me',name:data.name,content:data.content,img_src:data.img_src})
        }else{
          that.history_data.push({type:'others',name:data.name,content:data.content,img_src:data.img_src})
        }
      });


    },
    getData:function(){
      var that=this;
      this.$http('post','/chat')
      .then(function(res){
        if(res.data.code == -100){
          that.$router.push({ path: '/Login' })        
        }else if(res.data.code==1){
          that.username=res.data.username;
          that.user_img=res.data.user_img
          that.socket_connect()
        }
      })
      .catch(function(err){
        console.log(err)
      })  
    }
    
  },
  computed: {
     
  },
  mounted:function(){
    this.getData()
    this.$store.dispatch('TabbarAction',false);
    this.$store.dispatch('tabActiveAction',1);
    this.$store.dispatch('LeftBackAction',true);
    this.$store.dispatch('headerTitleAction','群聊室')    
  }
}
</script>

<style scoped>
  .section{bottom: 0px!important;display: flex;flex: 1;flex-direction: column;}
  .history_con{flex:1;background: #f7f7f7;padding: 10px;overflow-x: hidden;overflow-y: scroll}
  .history_con::-webkit-scrollbar-thumb{background: #ccc;width: 3px}
  .history_con::-webkit-scrollbar-track{background: #f7f7f7;width: 3px}
  .history_con::-webkit-scrollbar{width: 5px}
  .send_con{width: 100%;height: 40px;background: white;display: flex;align-items: center;padding: 0px 10px;box-sizing: border-box;display: flex;flex-direction: row;border-top:1px solid #aaa;}
  .send_con input{height: 30px;line-height: 30px;font-size: 14px;color: #313131;border-bottom: 1px solid #1AAD19;flex: 1;text-indent: 10px;padding: 0px}
  .list_con{flex-direction:row;display:flex;flex-direction:row;align-items:flex-start;margin-bottom: 10px}
  .list_con .header{width: 40px;height: 40px;border-radius: 1px}
  .list_con .con{background:white;margin-left:10px;margin-right:40px;padding:10px;border-radius:3px;}
  .me{flex-direction: row-reverse;}
  .me .con{margin-right: 10px;margin-left: 40px}
</style>
