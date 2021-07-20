<template>
	<v-card :loading="loading"
		height="100vh"
		tile
	>
		<v-img
			:src="homePageContents[0].image"
			dark
			height="100vh"
		>
			<home-toolbar-component />
		</v-img>
	</v-card>
</template>
<script>
import { mapGetters } from "vuex"
import HomeToolbarComponent from "@/views/home/components/Toolbar"

export default {
	name: "ShowCaseSliderComponent",
	components: { HomeToolbarComponent },
	data: () => ({
		loading: false,
		colors: [
			"green-gradient-rgba",
			"peach-gradient-rgba",
			"blue-gradient",
			"green-gradient-rgba"
		],
	}),
	computed: {
		...mapGetters({
			homePageContents: "homePageContent/allContent",
		}),
	},
	created() {
		this.initialize()
	},
	methods: {
		async initialize() {
			this.isLoading = true
			const fetched = await this.$store.dispatch("homePageContent/fetchAllHomePageContent")
			if (!fetched) {
				await this.openSnack("Internal server error. Please try again")
			} else { this.isLoading = false}
		},
	}
}
</script>
