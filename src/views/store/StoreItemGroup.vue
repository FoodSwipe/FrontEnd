<template>
	<v-card flat
		tile
		:loading="loading"
		color="transparent"
	>
		<v-card flat
			tile color="#fcf8f2"
			width="100vw"
		>
			<v-card v-if="itemTypes"
				class="py-4 px-2 d-flex justify-start align-center flex-wrap mx-auto"
				flat
				max-width="1200"
				color="transparent"
			>
				<v-chip label
					class="ma-1 py-5"
					@click="clearFilterMode()"
				>
					<v-icon>
						{{ filterMode ? 'clear' : 'filter_list' }}
					</v-icon>
					<span class="pl-2 filter-text">
						{{ filterMode ? 'CLEAR FILTER' : 'FILTER' }}
					</span>
				</v-chip>
				<v-chip
					v-for="item in itemTypes['results']"
					:key="item.id"
					class="ma-1 py-5"
					label
					color="grey lighten-3"
					@click="filter({item_type: item.id})"
				>
					<v-avatar>
						<v-img :src="item.badge" />
					</v-avatar>
					<span class="pl-2 font-weight-bold filter-text">
						{{ item.name.toUpperCase() }}
					</span>
				</v-chip>
				<v-spacer />
				<v-chip label
					class="ma-1"
					@click="filter({is_veg: true})"
				>
					<v-avatar>
						<v-img :src="require('@/assets/veglogo.png')"
							contain
						/>
					</v-avatar>
					<span class="pl-1 filter-text">VEG</span>
				</v-chip>
				<v-chip label
					class="ma-1"
					@click="filter({is_veg: false})"
				>
					<v-avatar>
						<v-img :src="require('@/assets/nonveglogo.png')"
							contain
						/>
					</v-avatar>
					<span class="pl-1 filter-text">NON VEG</span>
				</v-chip>
				<v-chip label
					class="ma-1"
					@click="filter({is_bar_item: true})"
				>
					<v-avatar>
						<v-img :src="require('@/assets/bar_item_png.png')"
							contain
						/>
					</v-avatar>
					<span class="pl-1 filter-text">BAR</span>
				</v-chip>
			</v-card>
		</v-card>
		<div style="height: 2px; background-color: darkorange" />
		<v-card max-width="1200"
			class="mx-auto" flat
			color="transparent"
			min-height="80vh"
		>
			<v-row no-gutters
				class="ma-0 pa-0"
			>
				<v-col
					xl="3"
					lg="3"
					md="3"
					sm="3"
				>
					<v-list
						class="rounded ma-2 mt-3"
						color="rgb(255 251 246)"
					>
						<v-subheader>Menu Item Groups</v-subheader>
						<v-divider />
						<v-list-item-group v-model="selection"
							class="pa-1"
						>
							<v-list-item
								v-for="groupItem in storeItemGroups['results']"
								:key="groupItem.id"
								class="rounded"
								active-class="menu-item-group-active"
								exact-active-class="menu-item-group-active"
								:class="{'menu-item-group-active': activeGroup[groupItem.id]}"
								@click="filterMenuItemGroup(groupItem)"
							>
								<v-list-item-avatar>
									<v-img :src="groupItem.image" />
								</v-list-item-avatar>
								<v-list-item-title>
									{{ groupItem.name }}
								</v-list-item-title>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-col>
				<v-col cols="12"
					xl="9"
					lg="9"
					md="9"
					sm="9"
				>
					<v-row
						class="ma-0 pa-0"
						no-gutters
					>
						<v-col v-for="(item, i) in storeItems"
							:key="i"
							cols="12"
							xl="3"
							lg="3"
							md="4"
							sm="6"
							class="pa-2"
						>
							<store-item-card
								:item="item"
							/>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-card>
	</v-card>
</template>
<script>
import { mapGetters } from "vuex"

export default {
	name: "StoreItemGroupView",
	components: {
		StoreItemCard: () => import("./StoreItemCard")
	},
	data: () => ({
		selection: null,
		loading: false,
		menuItemType: null,
		filterMode: false,
		menuItemGroupNav: true,
	}),
	computed: {
		...mapGetters({
			storeItemGroups: "menuItemGroup/allMenuItemGroups",
			storeItems: "menuItem/allMenuItems",
			itemTypes: "itemType/allItemTypes"
		}),
		activeGroup() {
			let activeGroupObj = {}
			const routerParam = this.$route.params.filter
			if (!routerParam) return activeGroupObj
			if (!this.storeItemGroups) return activeGroupObj
			this.storeItemGroups.results.forEach(group => {
				const routeId =routerParam.split("=")[1]
				activeGroupObj[group.id] = (parseInt(routeId) === group.id)
			})
			return activeGroupObj
		}
	},
	watch: {
		"$route.params.filter": {
			handler: function () {
				this.initialize()
			},
			deep: true,
			immediate: true
		}
	},
	async created(){
		if(this.$helper.getCookingOrderId()) {
			await this.$store.dispatch("order/withCartItems", {
				id: this.$helper.getCookingOrderId()
			})
		}
		this.$bus.on("search-menu-item", this.search)
		await this.initialize()
	},
	beforeUnmount() {
		this.$bus.off("search-menu-item")
	},
	methods: {
		filterMenuItemGroup(groupItem) {
			const url ="/store/menu_item_group="+ groupItem.id
			if (this.$route.params.filter !== url) this.$router.push(url)
		},
		async initialize() {
			let payload = {}
			this.loading = true
			let routeFilter = this.$route.params.filter
			if (routeFilter && routeFilter.includes("menu_item_group=")) {
				this.filterMode = true
				payload["menu_item_group"] = routeFilter.split("=")[1]
			}
			await this.$store.dispatch("menuItem/fetchAll", payload)
			this.loading = false
		},
		search(e) {
			this.filter(e)
		},
		async filter(payload = null) {
			this.loading = true
			await this.$store.dispatch("menuItem/fetchAll", payload)
			this.filterMode = true
			this.loading = false
		},
		async clearFilterMode() {
			if(this.filterMode) {
				if(this.$route.params.filter) {
					await this.$router.push("/store")
				}
				console.log(this.selection)
				this.selection = null
				this.filterMode = false
				await this.$store.dispatch("menuItem/fetchAll")
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.filter-text {
	font-size: 12px !important;
}
.menu-item-group-active {
	background-color: #d0d0d0;
}
</style>
