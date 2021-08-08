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
				<v-list-item-content>
					<v-list-item-subtitle>{{ item.field }}</v-list-item-subtitle>
					<v-list-item-title class="number-font one-point-two-rem">
						{{ item.value }}
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-divider inset />
			<v-list-item>
				<v-list-item-content>
					<v-list-item-subtitle>
						Top Items
					</v-list-item-subtitle>
					<v-list-item-title>
						<div class="d-flex flex-wrap justify-start">
							<v-card v-for="(topItem, index) in userStoreSummary['top_items']"
								:key="(index+1)*21"
								max-width="50"
								class="ma-1 pa-1"
							>
								<div class="d-flex justify-center">
									<v-avatar
										size="40"
									>
										<v-img :src="topItem.image" />
									</v-avatar>
								</div>
								<div class="py-1" />
								<div style="font-size: 12px; text-align: center">
									{{ topItem.name }}
								</div>
								<div class="py-1" />
								<div class="d-flex justify-center align-center">
									<v-avatar class="text-center number-font"
										color="indigo"
										size="30"
									>
										{{ topItem.count }}
									</v-avatar>
								</div>
							</v-card>
						</div>
					</v-list-item-title>
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
							style="min-height: 20px;"
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
					<v-list-item-subtitle>Recent delivery locations</v-list-item-subtitle>
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
					field: "Total Transaction (NRs)",
					value: this.userStoreSummary["total_transaction"]
				},
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
			console.log(this.userStoreSummary)
			this.isLoading = false
		}
	}
}
</script>
