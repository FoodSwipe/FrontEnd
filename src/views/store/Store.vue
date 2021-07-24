<template>
	<v-card width="100vw"
		flat tile
		color="#fff5e6"
	>
		<store-tool-bar />
		<v-row class="ma-0 pa-0"
			no-gutters
		>
			<v-col cols="12">
				<store-item-group />
			</v-col>
			<start-order-dialog />
		</v-row>
	</v-card>
</template>
<script>
export default {
	name: "ItemStoreView",
	components: {
		StoreToolBar: () => import("@/views/store/StoreToolBar"),
		StoreItemGroup: () => import("@/views/store/StoreItemGroup"),
		StartOrderDialog: () => import("@/components/StartOrder")
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
