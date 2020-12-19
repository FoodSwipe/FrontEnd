import Vue from "vue"
import Vuex from "vuex"
import snack from "@/store/modules/snack"
import homePageContent from "@/store/modules/homepageContent"
import user from "@/store/modules/users"
import auth from "@/store/modules/auth"
import itemType from "@/store/modules/itemType"
import menuItem from "@/store/modules/menuItem"
import menuItemGroup from "@/store/modules/menuItemGroup"
import menuItemType from "@/store/modules/menuItemType"

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		homePageContent,
		snack,
		auth,
		user,
		itemType,
		menuItem,
		menuItemGroup,
		menuItemType
	}
})
