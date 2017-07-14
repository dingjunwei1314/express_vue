<template>
  <div class="form_wap">
    <group style="border-top:none">
      <x-input title="姓名" name="username" v-model="username" placeholder="请输入姓名" :min="6" :max="16"></x-input>
    </group>
    <group style="border-top:none">
      <x-input title="密码" name="userpsd" v-model="userpsd" placeholder="请输入密码" :min="6" :max="16"></x-input>
    </group>
    <x-button type="primary" @click.native="login_register('login')" style="margin-top:20px">登录</x-button>
    <x-button type="primary" @click.native="login_register('register')">注册</x-button>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell ,Alert } from 'vux'
export default {
    name: 'Login',
    data(){
        return{
            username:'',
            userpsd:''
        }
    },
    components: {
        XInput,
        Group,
        XButton,
        Cell,
        XButton,
        Alert 
    },
    mounted:function(){
        
    },
    methods:{
        login_register(is){
            var that=this;
            if(this.username.length>16||this.username.length<6){
                this.$vux.alert.show({
                  title: '提示',
                  content: '用户名必须是6-16位字母或数字',
                })
                return;
            }
            if(this.userpsd.length>16||this.userpsd.length<6){
                this.$vux.alert.show({
                  title: '提示',
                  content: '密码必须是6-16位字母或数字',
                })
                return;
            }

            var data='';
            if(is=='login'){
                data={uname:this.username,psd:this.userpsd,act:'login'};
            }else if(is=='register'){
                data={uname:this.username,psd:this.userpsd,act:'register'};
            }
            
            this.$http.post('/login_register',data).then(function(res){
                if(res.data.code==1){
                    if(is=='login'){
                        that.$router.push({ path: '/Tab/Home' })
                    }else{
                        that.$vux.alert.show({
                            title: '提示',
                            content:res.data.message,
                        })
                    }
                    
                }else{
                    that.$vux.alert.show({
                        title: '提示',
                        content:res.data.message,
                    })
                }
                
            },function(err){
                console.log(err)
            })
        }
    }
  
}
</script>

<style scoped>
    .form_wap{
        padding: 150px 20px 0px;
    }
    .weui-cells:before{border-top:none;}
</style>