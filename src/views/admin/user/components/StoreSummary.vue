<template>
	<v-card dark
		:loading="isLoading"
	>
		<v-card-title>
			Store Summary
		</v-card-title>
		<v-divider />
		<v-list v-if="userStoreSummary">
			<v-list-item
				v-for="(item, index) in miniList"
				:key="index"
			>
				<v-list-item-avatar>
					<v-avatar color="blue">
						{{ item.field[0] }}
					</v-avatar>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title class="number-font one-point-two-rem">
						{{ item.value }}
					</v-list-item-title>
					<v-list-item-subtitle>{{ item.field }}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider inset />
			<v-list-item>
				<v-list-item-avatar>
					<v-avatar color="blue">
						I
					</v-avatar>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>
						<v-row class="ma-0 pa-0">
							<v-badge
								v-for="(topItem, index) in userStoreSummary['top_items']"
								:key="(index+1)*21"
								bordered
								right
								overlap
								offset-x="20"
								offset-y="19"
								color="black"
								dark
								:content="topItem.count"
							>
								<v-avatar
									size="40"
									class="mb-2"
									:class="
										(index === userStoreSummary['top_items'].length -1) ? '': 'mr-3'
									"
								>
									<v-img :src="topItem.image" />
								</v-avatar>
							</v-badge>
						</v-row>
					</v-list-item-title>
					<v-list-item-subtitle>
						Top Items
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider inset />
			<v-list-item>
				<v-list-item-avatar>
					<v-avatar color="blue">
						L
					</v-avatar>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list dense
						one-line
					>
						<v-list-item
							v-for="(recentLocation, index) in userStoreSummary['most_recent_locations']"
							:key="index*37"
							@click="1"
						>
							<v-list-item-content>
								<v-list-item-title>{{ recentLocation.location }}</v-list-item-title>
							</v-list-item-content>
							<v-list-item-action-text class="one-rem number-font">
								{{ recentLocation.count }}
							</v-list-item-action-text>
						</v-list-item>
					</v-list>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-card>
</template>
<script>
import { mapGetters } from "vuex"

export default {
	name: "UserStoreSummaryCard",
	data: () => ({
		isLoading: false,
	}),
	computed: {
		...mapGetters({
			userStoreSummary: "order/userStoreSummary"
		}),
		miniList() {
			if (!this.userStoreSummary) return []
			return [
				{
					field: "Total Orders",
					value: this.userStoreSummary["total_orders"]
				},
				{
					field: "Total Cart Items",
					value: this.userStoreSummary["total_cart_items_count"]
				},
			]
		},
	},
	async created() {
		await this.initialize()
	},
	methods: {
		async initialize() {
			this.isLoading = true
			await this.$store.dispatch("order/fetchUserStoreSummary", {
				id: this.$route.params.id
			})
			this.isLoading = false
		}
	}
}
</script>
<style lang="scss" scoped>
.one-rem {
	font-size: 1rem;
}
.one-point-two-rem {
	font-size: 1.2rem;
}
</style>
