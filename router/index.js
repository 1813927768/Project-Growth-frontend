import Vue from 'vue'
import Router from 'vue-router'
import Menus from '@/config/header-config'
import menus from '@/config/menu-config'

Vue.use(Router)

var routes = [];
var croutes = [];



Menus.forEach(element => {
  routes.push({
    path: `/${element.componentName}`,
    name: element.componentName,
    component: () => import(`@/components/${element.componentName}`)
  })
});

menus.forEach(element => {
  element.sub.forEach((sub) => {
    croutes.push({
      path: `/${sub.componentName}`,
      name: sub.componentName,
      component: () => import(`@/components/${sub.componentName}`)
    })
  })
});

//二级路由
routes[2].children = croutes;

routes.push({
  path: `/Login`,
  name: 'Login',
  component: () => import(`@/components/Login`),
  // props: true,
})

routes.push({
  path: `/Reg`,
  name: 'Reg',
  component: () => import(`@/components/Register`),
  // props: true,
})

routes.push({
  path: `/`,
  name: 'FrontPage',
  component: () => import(`@/components/FrontPage`),
  // props: true,
})

routes.push({
  path: `/FeedBack`,
  name: 'FeedBack',
  component: () => import(`@/components/FeedBack`),
})

routes.push({
  path: `/FeedHandle`,
  name: 'FeedHandle',
  component: () => import(`@/components/AdminFeedHandle`),
})

export default new Router({
  routes
})
