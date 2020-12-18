import Vue from "vue"
import Vuex from "vuex"
import snack from "@/store/modules/snack"
import homePageContent from "@/store/modules/homepageContent"
import user from "@/store/modules/users"
import auth from "@/store/modules/auth"

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		homePageContent,
		snack,
		auth,
		user,
	}
})
