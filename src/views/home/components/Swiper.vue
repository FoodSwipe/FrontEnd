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
			<order-now style="position: absolute; top: 30vh;" />
			<div
				style="position: absolute; top: 90vh; width: 100vw; display: flex; justify-content: center"
			>
				<v-btn icon
					large
					@click="scrollDown"
				>
					<v-icon x-large>
						expand_more
					</v-icon>
				</v-btn>
			</div>
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
		scrollDown() {
			window.scroll({
				top: window.innerHeight,
				behavior: "smooth"
			})
		}
	}
}
</script>
