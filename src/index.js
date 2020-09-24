import Vue from 'vue'
import router from '~/config/router.js'
import App from './App.vue'

Vue.prototype.$baseconfig = process.env.BaseConfig

import 'vant/lib/toast/style/index.js'
import 'vant/lib/dialog/style/index.js'

new Vue({
	router,
	render:h=>h(App)
}).$mount('#app')