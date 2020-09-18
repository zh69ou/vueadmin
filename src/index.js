import Vue from 'vue'
import router from '~/config/router.js'
import App from './App.vue'

Vue.prototype.$baseconfig = process.env.BaseConfig

new Vue({
	router,
	render:h=>h(App)
}).$mount('#app')