<template>
  <div class="section" style="background:#eee">
   
    <cell-box is-link link="/Tab/Chatroom">
      群聊室
    </cell-box>
    
  </div>
</template>

<script>
import {Group, Cell, CellBox} from 'vux'
export default {
  name: 'home',
  components: {
    Group, 
    Cell, 
    CellBox
  },
  data () {
    return{
      data:''
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData:function(){
      var that=this;
      this.$http('post','/')
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
  },
  computed: {
     
  },
  mounted:function(){
    this.$store.dispatch('TabbarAction',true);
    this.$store.dispatch('tabActiveAction',1);
    this.$store.dispatch('LeftBackAction',false);
    this.$store.dispatch('headerTitleAction','首页')
  }
}
</script>

<style scoped>
    .weui-cell{background: white}
</style>
