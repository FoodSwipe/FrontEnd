import Vue from "vue"
import App from "@/App.vue"
import router from "@/router"
import store from "@/store"
import vuetify from "@/plugins/vuetify"
import VueBus from "vue-bus"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "material-design-icons-iconfont/dist/material-design-icons.css"
import "swiper/swiper-bundle.css"
import api from "@/handler/axios"
import helper from "@/Helper"
import constants from "@/constants"

import vueScrollBehavior from "vue-scroll-behavior"

Vue.use(vueScrollBehavior, { router: router })

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$helper = helper
Vue.prototype.$constants = constants

Vue.use(VueBus)

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount("#app")
