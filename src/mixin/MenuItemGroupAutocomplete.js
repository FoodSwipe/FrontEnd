import { mapGetters } from "vuex"

const MenuItemGroupAutocomplete = {
	data() {
		return {
			itemGroup: null,
			itemGroupLoading: null,
		}
	},
	computed: {
		...mapGetters({
			itemGroups: "menuItemGroup/allMenuItemGroups"
		})
	},
	watch: {
		async itemGroup(val) {
			if (val) {
				this.itemGroupLoading = true
				await this.$store.dispatch("menuItemGroup/fetchAll", {search: val})
				this.itemGroupLoading = false
			}
		}
	},
}

export default MenuItemGroupAutocomplete
