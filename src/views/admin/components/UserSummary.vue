<template>
	<v-card dark
		:loading="isLoading"
		color="green"
	>
		<v-card-title>Users summary</v-card-title>
		<v-card-text>
			<v-sheet color="rgba(0, 0, 0, .12)">
				<v-sparkline
					:value="itemSummary"
					:labels="itemSummaryLabels"
					:smooth="16"
					color="white"
					:gradient="['#f72047', '#ffd200', '#1feaea']"
					auto-draw
					auto-draw-easing="ease"
					height="100"
					padding="24"
					stroke-linecap="round"
				/>
			</v-sheet>
		</v-card-text>
		<v-card-text>
			<div class="display-1 font-weight-thin text-center">
				User Registration This Year
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
	data: () => ({
		isLoading: false,
		itemSummary: [],
		itemSummaryLabels: [],
	}),
	computed: {
		...mapGetters({
			userSummary: "user/registrationSummary"
		})
	},
	async created() {
		await this.initialize();
	},
	methods: {
		getThisYearSummary() {
			const current_year = new Date().getFullYear()
			this.userSummary.forEach(summaryItem => {
				if (summaryItem.year === current_year.toString()) {
					this.itemSummary.push(summaryItem["count"])
					this.itemSummaryLabels.push(summaryItem["month"].slice(0,3))
				}
			})
		},
		async initialize() {
			this.isLoading = true
			const fetched = await this.$store.dispatch("user/fetchRegistrationSummary")
			if (!fetched) {
				this.itemSummary = []
				this.itemSummaryLabels = []
			} else {
				this.getThisYearSummary()
			}
			this.isLoading = false
		}
	}
}
</script>
