import Vue from "vue"
import Vuex from "vuex"
import adminDrawer from "@/store/modules/adminDrawer"
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		adminDrawer,
	}
})
