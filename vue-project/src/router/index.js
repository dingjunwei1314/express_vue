import Vue from 'vue'
import Router from 'vue-router'
import Tab from '@/components/Tab/Tab'
import Home from '@/components/Home/Home'
import Person from '@/components/Person/Person'
import Login from '@/components/Login/Login'

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
          ]
        },
        {
          path:'/Login',
          component:Login
        }

    ]
})

export default router