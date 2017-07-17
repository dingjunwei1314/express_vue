<template>
  <div class="section" style="background:#eee">
    <div class="user_wap" @click="updata_user_img">
        <img :src="data.user_img">
        <p>用户名：{{data.name}}</p>
        <p>更换头像</p>
        <input name="user_img" ref='update_user_img_input' type="file" accept="image/png,image/jpeg" @change="update"/>
    </div>
    <div style="padding:10px">
        <x-button plain type="primary" style="margin-top:20px" @click.native="login_out">退出</x-button>
    </div>
  </div>
</template>

<script>
import { XButton } from 'vux'
export default {
    name: 'person',
    components: {
        XButton
    },
    data(){
        return {
            data:{}
        }
    },

    created () {
        this.getData()
    },
    methods: {
        updata_user_img(){
            this.$refs.update_user_img_input.click()
        },
        getData:function(){
          var that=this;
          this.$http('get','/person')
          .then(function(res){
            if(res.data.code == -100){
              that.$router.push({ path: '/Login' })        
            }else if(res.data.code==1){
              that.data=res.data;
            }
          })
          .catch(function(err){
            console.log(err)
          })  
        },
        update(e){
          let file = e.target.files[0];
          if(!file) return;           
          let param = new FormData(); //创建form对象
        
          param.append('user',file,file.name);//通过append向form对象添加数据
          param.append('chunk','0');//添加form表单中其他数据
          
          console.log(param.get('user')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          // let config = {
          //   headers:{'Content-Type':'multipart/form-data'}
          // };  
          //添加请求头

          this.$http('post','/person',param,{'Content-Type':'multipart/form-data'})
          .then(res=>{
            if(res.data.code==1){
                this.data.user_img=res.data.user_img;
            }
          })        
        },
        login_out(){
            var that=this;
            this.$http('post','/login_register',{act:'login_out'})
            .then(res=>{
              if(res.data.code==1){
                  that.$router.push({ path: '/Login' })
              }
            })
            .catch(function(err){
              console.log(err)
            })
        }
    },
    mounted:function(){
        this.$store.dispatch('TabbarAction',true);
        this.$store.dispatch('tabActiveAction',2);
        this.$store.dispatch('LeftBackAction',false);
        this.$store.dispatch('headerTitleAction','我的')
    },
    activated:function(){
        
    }
  
}
</script> 

<style scoped>
    .user_wap{width: 100%;height: 150px;background-image:url('../../assets/img/user_bj.jpg');background-repeat: no-repeat;background-size: 100% 100%;}
    .user_wap img{width: 70px;height:70px;border-radius: 100%;border:2px solid white;float: left;margin-left: 40px;margin-top: 40px;}
    .user_wap p:nth-child(2){line-height: 125px;padding-left: 130px}
    .user_wap p:nth-child(3){position: absolute;left: 130px;top: 80px}
    .user_wap input{display: none}
</style>