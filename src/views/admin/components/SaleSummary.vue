<template>
	<v-card dark
		color="primary"
		:loading="isLoading"
	>
		<v-card-title>Items summary</v-card-title>
		<v-card-text>
			<v-sheet color="rgba(0, 0, 0, .12)">
				<v-sparkline
					class="item-summary-sparkline"
					:value="itemSummary"
					:labels="itemSummaryLabels"
					:smooth="16"
					color="white"
					:gradient="['#f72047', '#ffd200', '#1feaea']"
					auto-draw
					auto-draw-easing="ease"
					height="100"
					padding="24"
					label-size="4"
					stroke-linecap="round"
				/>
			</v-sheet>
		</v-card-text>
		<v-card-text>
			<div class="display-1 font-weight-thin text-center">
				Sales Last Month
			</div>
		</v-card-text>

		<v-divider />

		<v-card-actions class="justify-center">
			<v-btn
				block
				text
			>
				Go to Report
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script>

import { mapGetters } from "vuex"

export default {
	name: "SalesSummaryChart",
	data: () => ({
		isLoading: false,
		itemSummary: [],
		itemSummaryLabels: [],
	}),
	computed: {
		...mapGetters({
			saleSummary: "order/saleSummary"
		})
	},
	async created() {
		await this.initialize()
	},
	methods: {
		getThisMonthTopTenSummary() {
			this.itemSummary = []
			this.saleSummary.forEach(item => {
				this.itemSummary.push(item["sale_count"])
				this.itemSummaryLabels.push(item["menu_item"])
			})
		},
		async initialize() {
			this.isLoading = true
			const fetched = await this.$store.dispatch("order/fetchSaleSummary")
			if (!fetched) {
				this.itemSummary = []
				this.itemSummaryLabels = []
			} else {
				this.getThisMonthTopTenSummary()
			}
			this.isLoading = false
		}
	},
}
</script>
<style lang="scss" scoped>
</style>
