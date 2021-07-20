<template>
	<v-card flat
		max-width="1200" class="mx-auto rounded-0 mt-2"
	>
		<v-expansion-panels v-model="panel"
			multiple
			popout
		>
			<v-expansion-panel
				v-for="(group, index) in storeItemGroups"
				:key="index"
				dense
				class="px-0"
			>
				<v-expansion-panel-header class="panel-header"
					ripple
				>
					<template #default>
						<v-avatar size="52"
							max-width="52"
							class="elevation-4 golden-rod-border-3"
						>
							<v-img :src="group.image" />
						</v-avatar>
						<span class="pl-2">{{ group.name }}</span>
					</template>
				</v-expansion-panel-header>
				<v-expansion-panel-content
					class="px-0"
				>
					<v-row
						class="ma-0 pa-0"
						align="center"
						no-gutters
					>
						<v-col v-for="(item, i) in group['menu_items']"
							:key="i"
							cols="12"
							xl="2"
							lg="2"
							md="2"
							sm="3"
							class="pa-2"
						>
							<store-item-card
								:item="item"
							/>
						</v-col>
					</v-row>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
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
		panel: []
	}),
	computed: {
		...mapGetters({
			storeItemGroups: "menuItemGroup/allMenuItemGroups"
		})
	},
	async created(){
		await this.initialize()
	},
	methods: {
		async initialize() {
			await this.$store.dispatch("menuItemGroup/withItems")
			this.storeItemGroups.forEach((item, index) => {
				if (item["menu_items"].length !== 0) this.panel.push(index)
			})
		}
	}
}
</script>
<style lang="scss" scoped>
.panel-header{
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
