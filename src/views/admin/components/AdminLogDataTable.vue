<template>
	<v-data-table
		:loading="isLoading"
		:headers="headers"
		:items="adminLogs"
		:search="search"
	>
		<template #top>
			<v-toolbar height="auto">
				<v-app-bar-nav-icon>
					<v-icon size="40">
						recent_actors
					</v-icon>
				</v-app-bar-nav-icon>
				<v-toolbar-title>Recent Activities</v-toolbar-title>
				<v-spacer />
				<v-text-field
					v-model="search"
					prepend-inner-icon="search"
					label="Search"
					single-line
					solo
					hide-details
					clearable
				/>
			</v-toolbar>
		</template>
		<template #no-data>
			No logs generated yet.
		</template>
	</v-data-table>
</template>
<script>
import { mapGetters } from "vuex"

export default {
	data: () => ({
		isLoading: false,
		search: "",
		headers: [
			{
				text: "TimeStamp",
				align: "start",
				value: "timestamp",
			},
			{ text: "Type", value: "mode" },
			{ text: "Actor", value: "actor.username" },
			{ text: "Details", value: "detail" },
		],
	}),
	computed: {
		...mapGetters({
			adminLogs: "log/allLogs"
		})
	},
	created() {
		this.initialize()
	},
	methods: {
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async initialize() {
			this.isLoading = true
			const fetched = this.$store.dispatch("log/fetchAllLogs")
			if (!fetched) {
				await this.openSnack("Internal server error. Please try again.")
			} else { this.isLoading = false }
		}
	}
}
</script>
