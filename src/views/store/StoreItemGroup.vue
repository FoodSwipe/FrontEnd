<template>
	<v-card flat
		tile
		:loading="loading"
		color="transparent"
	>
		<v-card v-if="itemTypes"
			class="py-4 px-2 d-flex justify-start align-center flex-wrap mx-auto"
			flat
			max-width="1200"
			color="#fcf8f2"
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
		<v-divider />
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
						class="rounded ma-2 mt-3" flat
						color="rgb(255 251 246)"
					>
						<v-subheader>Menu Item Groups</v-subheader>
						<v-divider />
						<v-list-item-group class="pa-1">
							<v-list-item v-for="groupItem in storeItemGroups['results']"
								:key="groupItem.id"
								class="rounded"
								@click="filter({ menu_item_group: groupItem.id })"
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
		panel: [],
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
		})
	},
	async created(){
		this.$bus.on("search-menu-item", this.search)
		await this.initialize()
	},
	beforeUnmount() {
		this.$bus.off("search-menu-item")
	},
	methods: {
		async initialize() {
			console.log(this.itemTypes)
			console.log(this.storeItems)
			this.loading = true
			await this.$store.dispatch("menuItem/fetchAll")
			await this.$store.dispatch("menuItemGroup/fetchAll")
			await this.$store.dispatch("itemType/fetchAllItemTypes")
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
				this.filterMode = false
				await this.$store.dispatch("menuItem/fetchAll")
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.panel-header {
	transition: all .3s;
	background-color: aliceblue;
	font-family: "Open Sans Condensed", sans-serif;
	font-weight: 500;
	font-size: 1.6rem;
	line-height: 1.6rem;
	color: #3c3c3c;
	@media only screen and (max-width: 1200px) {
		font-size: 1.2rem;
		line-height: 1.2rem;
	}
	@media only screen and (max-width: 300px) {
		font-size: 1rem;
		line-height: 1rem;
	}
	:hover > & {
		background-color: #fffaf0;
	}
}
::v-deep.v-expansion-panel-content > div {
	padding: 0 6px 4px;
}
.filter-text {
	font-size: 12px !important;
}
</style>
