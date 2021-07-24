import { mapGetters } from "vuex"

const MenuItemTypeAutocomplete = {
	data() {
		return {
			itemType: null,
			itemTypeLoading: null,
		}
	},
	computed: {
		...mapGetters({
			itemTypes: "itemType/allItemTypes"
		})
	},
	watch: {
		async itemType(val) {
			if (val) {
				this.itemTypeLoading = true
				await this.$store.dispatch("itemType/fetchAllItemTypes", {search: val})
				this.itemTypeLoading = false
			}
		}
	},
}

export default MenuItemTypeAutocomplete
