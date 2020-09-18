const menu = [
	{path:'/',name:'index',title:'首页',component:() => import('~/view/index.vue')},
	{path:'/error404',name:'404',title:'404',component:() => import('~/view/error404.vue')},
	{path:'/login',name:'login',title:'登录',component:()=> import('~/view/login.vue')},
	{path:'*',redirect:{name:'404'}}
]

export default menu