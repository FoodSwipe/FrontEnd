<template>
	<div>
		<flickity ref="flickity"
			:options="flickityOptions"
		>
			<template v-for="(item, index) in items">
				<!-- eslint-disable-next-line vue/no-v-for-template-key-on-child-->
				<div :key="index"
					class="carousel-cell"
				>
					<v-img class="carousel-image"
						:src="item.src"
						dark
						gradient="to top, rgb(0 0 0 / 0%), rgb(0 0 0 / 60%), rgb(0 0 0 / 20%)"
					>
						<slider-image-content
							:main-heading="item.mainHeading"
							:subtitle="item.subtitle"
							:button-icon="item.buttonIcon"
							:button-text="item.buttonText"
							:button-color="item.buttonColor"
						/>
					</v-img>
				</div>
			</template>
		</flickity>
	</div>
</template>
<script>
import Flickity from "vue-flickity"

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
		items: [
			{
				src: "https://i.ytimg.com/vi/fovrUHwf0e8/maxresdefault.jpg",
				mainHeading: "Hello Welcome Tasty Momo",
				subtitle: "Vivamus suscipit tortor eget felis porttitor volutpat." +
					" Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
				buttonIcon: "hdr_weak",
				buttonText: "Get Momo'ed",
				buttonColor: "peach-gradient-rgba"
			},
			{
				src: "https://i.pinimg.com/originals/6d/79/e6/6d79e62312ae92757667ca1dae5289d9.jpg",
				mainHeading: "Get Hot & Spicy Foods at your location",
				subtitle: "Donec molestie malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
				buttonIcon: "local_grocery_store",
				buttonText: "Order Now",
				buttonColor: "aqua-gradient-rgba"
			},
			{
				src: "https://s1.1zoom.me/b5050/401/Drinks_Bar_Bottle_468131_1920x1080.jpg",
				mainHeading: "Enjoy our bar service online",
				subtitle: "Cras ultricies ligula sed magna dictum porta. Donec sollicitudin molestie malesuada.",
				buttonIcon: "store",
				buttonText: "Visit Store",
				buttonColor: "blue-gradient"
			},
			{
				src: "https://wallpaperaccess.com/full/235960.jpg",
				mainHeading: "Get booz'ed and oozed with our beverages",
				subtitle: "Vivamus suscipit tortor eget felis porttitor volutpat. Donec rutrum congue leo eget malesuada.",
				buttonIcon: "local_bar",
				buttonText: "Get booz'ed",
				buttonColor: "green-gradient-rgba"
			},
		],
	}),
}
</script>

<style>
.green-gradient-rgba {
	background: linear-gradient(40deg, rgb(153, 208, 117), rgb(16, 157, 105)) !important
}
</style>

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
