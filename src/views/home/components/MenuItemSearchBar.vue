<template>
	<v-text-field
		v-model="search"
		placeholder="Search our amazing store"
		solo
		dense
		hide-details
		clearable
		background-color="orange lighten-4"
		color="black"
		@keydown="submitIfEnter"
	>
		<template #append>
			<v-btn icon
				color="orange darken-4"
				@click="searchMenuItem"
			>
				<v-icon>search</v-icon>
			</v-btn>
		</template>
	</v-text-field>
</template>
<script>
import router from "@/router"

export default {
	name: "MenuItemSearchBar",
	data: () => ({
		search: null,
	}),
	methods: {
		async searchMenuItem() {
			if (this.$route.name === "Search" && this.$route.params.name === this.search) return

			await router.push({name: "Search", params: {name: encodeURIComponent(this.search)}})
		},
		async submitIfEnter(e) {
			if (e.key === "Enter") await this.searchMenuItem()
		}
	}
}
</script>
