<template>
	<div v-if="homePageContents">
		<flickity ref="flickity"
			:options="flickityOptions"
		>
			<template v-for="(item, index) in homePageContents">
				<!-- eslint-disable-next-line vue/no-v-for-template-key-on-child-->
				<div :key="index"
					class="carousel-cell"
				>
					<v-img class="carousel-image"
						:src="item.image"
						dark
						gradient="to top, rgb(0 0 0 / 0%), rgb(0 0 0 / 60%), rgb(0 0 0 / 20%)"
					>
						<slider-image-content
							:heading="item.heading"
							:subtitle="item.subtitle"
							:button-icon="item.button_icon"
							:button-text="item.button_text"
							:button-color="colors[index % colors.length]"
						/>
					</v-img>
				</div>
			</template>
		</flickity>
	</div>
</template>
<script>
import Flickity from "vue-flickity"
import { mapGetters } from "vuex"

export default {
	name: "ShowCaseSliderComponent",
	components: {
		Flickity,
		SliderImageContent: () => import("@/components/SwiperImageContent")
	},
	data: () => ({
		loading: false,
		groupMembers: null,
		leading: null,
		clapping: null,
		praying: null,
		flickityOptions: {
			initialIndex: 0,
			autoPlay: 4000,
			pauseAutoPlayOnHover: true,
			prevNextButtons: false,
			pageDots: true,
			wrapAround: true,
			selectedAttraction: 0.01,
			friction: 0.25,
		},
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

<style scoped>

* { box-sizing: border-box; }

.carousel-cell {
	display: block;
	height: 55vh;
	width: 100vw;
}
.carousel-image {
	object-fit: cover;
	width: 100%;
	height: 100%;
}
</style>
