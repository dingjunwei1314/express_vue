import Vue from 'vue'
import Router from 'vue-router'
import Tab from '@/components/Tab/Tab'

const Home=function(resolve){
  require.ensure([],function(){
    resolve(require('@/components/Home/Home'))
  })
}

const Person=function(resolve){
  require.ensure([],function(){
    resolve(require('@/components/Person/Person'))
  })
}

const Login=function(resolve){
  require.ensure([],function(){
    resolve(require('@/components/Login/Login'))
  })
}

const Chatroom=function(resolve){
  require.ensure([],function(){
    resolve(require('@/components/Chatroom/Chatroom'))
  })
}


Vue.use(Router)

const router=new Router({
    mode: 'hash',
    base: __dirname,
    routes: [
        { path: '/', redirect: '/Tab/Home' },
        {
          path: '/Tab',
          component: Tab,
          children:[
            {
              path:'/Tab/Home',
              component:Home
            },
            {
              path:'/Tab/Person',
              component:Person
            },
            {
              path:'/Tab/Chatroom',
              component:Chatroom
            }
          ]
        },
        {
          path:'/Login',
          component:Login
        }

    ]
})

export default router