<template>
	<v-card
		dark
		:loading="loading"
		height="100vh"
		tile
		style="position: relative"
	>
		<flickity ref="flickity"
			:options="flickityOptions"
		>
			<v-card
				v-for="item in homePageContents"
				:key="item.id"
				flat
				tile
				class="carousel-cell"
				height="100vh"
			>
				<v-img
					eager
					class="carousel-image"
					:src="item.image"
					dark
					gradient="to top, rgb(0 0 0 / 0%), rgb(0 0 0 / 60%), rgb(0 0 0 / 20%)"
					height="100vh"
				/>
			</v-card>
		</flickity>
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
	</v-card>
</template>
<script>
import { mapGetters } from "vuex"
import Snack from "@/mixin/Snack"
import Flickity from "vue-flickity"


export default {
	name: "ShowCaseSlider",
	components: {
		Flickity
	},
	mixins: [Snack],
	data: () => ({
		loading: false,
		colors: [
			"green-gradient-rgba",
			"peach-gradient-rgba",
			"blue-gradient",
			"green-gradient-rgba"
		],
		flickityOptions: {
			initialIndex: 0,
			autoPlay: 6000,
			prevNextButtons: false,
			pauseAutoPlayOnHover: true,
			pageDots: false,
			wrapAround: true,
			selectedAttraction: 0.01,
			friction: 0.25,
		},
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

<style lang="scss" scoped>
.carousel-cell {
	display: block;
	height: 40vh;
	width: 100vw;
}
.carousel-image {
	object-fit: cover;
	width: 100%;
	height: 100%;
}
</style>
