import Vue from "vue"
import Vuex from "vuex"
import snack from "@/store/modules/snack"
import homePageContent from "@/store/modules/homepageContent"
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		snack,
		homePageContent
	}
})
