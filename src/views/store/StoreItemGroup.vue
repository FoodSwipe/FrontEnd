<template>
	<v-card flat
		tile
		:loading="loading"
		color="transparent"
	>
		<v-card v-if="itemTypes"
			class="pa-4 d-flex justify-start align-center flex-wrap mx-auto"
			flat
			max-width="1150"
			color="transparent"
		>
			<v-chip label
				class="ma-1 py-5"
			>
				<v-icon>
					filter_list
				</v-icon>
				<span class="pl-2">Filter</span>
			</v-chip>
			<v-chip v-for="item in itemTypes"
				:key="item.id"
				class="ma-1 py-5"
				label
				color="grey lighten-3"
				@click="filter(item)"
			>
				<v-avatar>
					<v-img :src="item.badge" />
				</v-avatar>
				<span class="pl-2 font-weight-bold"
					style="font-size: 12px; !important;"
				>{{ item.name.toUpperCase() }}</span>
			</v-chip>
			<v-spacer />
		</v-card>
		<v-divider />
		<v-card max-width="1200"
			class="mx-auto" flat
			color="transparent"
		>
			<v-row
				class="ma-0 pa-0"
				align="start"
				no-gutters
			>
				<v-col cols="12"
					xl="3"
					lg="3"
					md="3"
					sm="3"
				>
					<v-list class="ma-3 px-0 rounded"
						flat
						color="rgb(255 251 246)"
					>
						<v-subheader>Menu Item Groups</v-subheader>
						<v-divider />
						<v-list-item-group class="pa-1">
							<v-list-item v-for="groupItem in storeItemGroups"
								:key="groupItem.id"
								class="rounded"
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
		menuItemType: null
	}),
	computed: {
		...mapGetters({
			storeItemGroups: "menuItemGroup/allMenuItemGroups",
			storeItems: "menuItem/allMenuItems",
			itemTypes: "itemType/allItemTypes"
		})
	},
	async created(){
		await this.initialize()
	},
	methods: {
		async initialize() {
			this.loading = true
			await this.$store.dispatch("menuItem/fetchAll")
			await this.$store.dispatch("menuItemGroup/fetchAll")
			await this.$store.dispatch("itemType/fetchAllItemTypes")
			this.loading = false
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
</style>
