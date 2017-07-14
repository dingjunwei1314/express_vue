import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

// 这里定义初始值
let state = {
    tabActive:1,
    isShowTabbar:true,
    LeftBack:false,
    headerTitle:'壹医考',
};

const mutations = {
    changeTabActive:function(state,n){
        state.tabActive=n
    },
    showOrHideTabbar:function(state,n){
        if(n){
            state.isShowTabbar=true;
        }else{
            state.isShowTabbar=false;
        }
    },
    showOrHideLeftBack:function(state,n){
        if(n){
            state.LeftBack=true;
        }else{
            state.LeftBack=false;
        }
    },
    changeHeaderTitle:function(state,n){
        state.headerTitle=n;
    }

};

//事件触发后的逻辑操作
const actions = {
    tabActiveAction:function({commit},n){
        commit('changeTabActive',n)
    },
    TabbarAction:function({commit},n){
        commit('showOrHideTabbar',n)
    },
    LeftBackAction:function({commit},n){
        commit('showOrHideLeftBack',n)
    },
    headerTitleAction:function({commit},n){
        commit('changeHeaderTitle',n)
    }
};


const getters = {
    GetIsShowTabbar:function(state){
        return state.isShowTabbar
    },
    GetTabActive:function(){
        return state.tabActive
    },
    GetIsLeftBack:function(){
        return state.LeftBack
    },
    GetHeaderTitle:function(){
        return state.headerTitle
    }
};


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
