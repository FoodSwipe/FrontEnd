<template>
	<v-card :loading="loading"
		height="100vh"
		tile
	>
		<v-img
			v-if="homePageContents"
			:src="homePageContents[0].image"
			dark
			height="100vh"
			style="position: relative"
		>
			<home-toolbar style="position: absolute; top:0;" />
			<order-now style="position: absolute; top: 40vh;" />
		</v-img>
	</v-card>
</template>
<script>
import { mapGetters } from "vuex"

export default {
	name: "ShowCaseSlider",
	components: {
		HomeToolbar: () => import("@/views/home/components/Toolbar"),
		OrderNow: () => import("@/views/home/components/OrderNow"),
	},
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
