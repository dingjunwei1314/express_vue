<template>
  <div class="section" style="background:#eee">
    <h1>这一部分将是聊天室</h1>
  </div>
</template>

<script>

export default {
  name: 'tab',
  components: {
   
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
      this.$http.post('/').then(function(res){
        if(res.data.code == -100){
          console.log(1)
          that.$router.push({ path: '/Login' })        
        }else if(res.data.code==1){
          that.data=res.data;
        }
      },function(err){
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
    
</style>
