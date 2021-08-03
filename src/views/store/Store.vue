<template>
	<v-card width="100vw"
		flat tile
		color="orange"
		:loading="loading"
		style="background-color: #fff5e6 !important;"
	>
		<store-tool-bar />
		<v-row class="ma-0 pa-0"
			no-gutters
		>
			<v-col cols="12">
				<store-item-group />
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
export default {
	name: "ItemStoreView",
	components: {
		StoreToolBar: () => import("@/views/store/StoreToolBar"),
		StoreItemGroup: () => import("@/views/store/StoreItemGroup"),
	},
	data: () => ({
		loading: true
	}),
	async created() {
		await this.$store.dispatch("menuItemGroup/fetchAll")
		await this.$store.dispatch("itemType/fetchAllItemTypes")
		this.loading = false
	},
	methods: {
		setSearchValue(e) {
			this.search = e.target.value
		},
		searchMenuItems() {
			this.$bus.emit("search-menu-item", { search: this.search})
		}
	}
}
</script>
