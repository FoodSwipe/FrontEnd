<template>
	<div class="pa-4">
		<v-overlay :value="overlay">
			<v-progress-circular
				indeterminate
				size="64"
			/>
		</v-overlay>
		<div class="display-1">
			Search results for <strong>{{ searchText }}</strong>
		</div>
		<div v-if="searchResults"
			class="headline"
		>
			Search count: <strong>{{ searchResults.length }}</strong>
		</div>
		<v-divider />
		<v-row
			class="ma-0 pa-0"
			align="center"
			no-gutters
		>
			<v-col v-for="(item, i) in searchResults"
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
	</div>
</template>
<script>
import { mapGetters } from "vuex"

export default {
	name: "SearchView",
	components: {
		StoreItemCard: () => import("@/views/store/StoreItemCard")
	},
	data: () => ({
		overlay: null,
		searchText: null,
	}),
	computed: {
		...mapGetters({
			searchResults: "menuItem/allMenuItems"
		})
	},
	created() {
		this.initSearch()
	},
	methods: {
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async initSearch() {
			this.searchText = this.$route.params.name
			console.log("here   :", this.searchText)
			await this.searchMenuItem()
		},
		async searchMenuItem() {
			this.overlay = true
			const searched = await this.$store.dispatch("menuItem/filter", {
				name: encodeURIComponent(this.searchText)
			})
			if (!searched) {
				await this.openSnack("Internal Server Error.")
			}
			this.overlay = false
		},
	}
}
</script>
