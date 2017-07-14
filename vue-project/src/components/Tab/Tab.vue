<template>
    <view-box class="main" style="background:white;height:100%;width:100%;" body-padding-top="44px" body-padding-bottom="53px">
    <x-header

    class="appHeader"
    :left-options="{showBack:isShowLeftBack}" 
    >{{headerTit}}</x-header>
    
    <transition :name="transitionName">
     
        <router-view></router-view>
      
    </transition>
    

    
    <tabbar class="tabbar"  v-show="showOrHideTabbar">
      <tabbar-item v-bind:selected="tabActive==1"  link="/Tab/Home">
        <img slot="icon"   src="../../assets/img/bottom_nav_1.png">
        <img slot="icon-active"   src="../../assets/img/bottom_nav_1_active.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item  v-bind:selected="tabActive==2" link="/Tab/Person">
        <img slot="icon"   src="../../assets/img/bottom_nav_4.png">
        <img slot="icon-active"   src="../../assets/img/bottom_nav_4_active.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  

  </view-box>
</template>

<script>
import './Tab.css'
import { XHeader} from 'vux'
import { Tabbar, TabbarItem,ViewBox } from 'vux'
export default {
  name: 'tab',
  components: {
    XHeader,
    Tabbar,
    TabbarItem,
    ViewBox
  },
  data () {
    return{
      transitionName:'vux-pop-in'
    }
  },
  watch: {
    '$route'(to, from){
      
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      if(toDepth < fromDepth){
        this.transitionName='vux-pop-out'
      }else if(toDepth > fromDepth){
        this.transitionName='vux-pop-in'
      }else{
        this.transitionName='fade'
      }
    }
  },
  computed: {
      isShowLeftBack:function(){
        return this.$store.getters.GetIsLeftBack
      },
      showOrHideTabbar:function() {
        return this.$store.getters.GetIsShowTabbar
      },
      tabActive:function(){
        return this.$store.getters.GetTabActive
      },
      headerTit:function(){
        return this.$store.getters.GetHeaderTitle
      }
  },
  mounted:function(){
  
  }
}
</script>

<style scoped>
    .tab .tabbar img{width: 23px;height: 23px;margin-top: 3px}
    .tabbar{position: fixed!important;}
    .vux-pop-out-enter-active,
    .vux-pop-out-leave-active,
    .vux-pop-in-enter-active,
    .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    }
    .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
    }
    .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    }
    .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    }
    .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
    }
</style>
