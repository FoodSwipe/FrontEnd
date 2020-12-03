<template>
	<v-card
		flat
		color="peach-gradient"
		class="rounded-0 pa-4"
	>
		<v-card-title class="hot-items d-flex justify-center">
			<u>Hot Items</u>
		</v-card-title>
		<v-card class="pa-0 mx-auto"
			flat max-width="1000"
			color="transparent"
		>
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<v-card
						v-for="(item, index) in foodItems"
						:key="index"
						class="swiper-slide"
						max-width="150"
					>
						<!-- eslint-disable-next-line vue/no-v-for-template-key-on-child-->
						<v-img
							class="car-image"
							:src="item.src"
							max-width="100%"
							height="120"
							dark
						/>
						<div class="px-2">
							<p class="ma-0 pt-2">
								{{ item.name }}
							</p>
							<div class="d-flex justify-start align-start">
								<v-avatar size="20">
									<v-img src="https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg" />
								</v-avatar>
								<v-avatar size="20">
									<v-img src="https://lh3.googleusercontent.com/proxy/MqGKMZqxrEwdFXOMC0JkHsmquJqT2LJ1uxg6M4whw61xpRNH9U80Hk_zkSYAa3rvuJCWLchcxnFEYBYhKbirt4QY_bfQrajTWTJP_lQADK-NH8uOdsn2mK-jlM1_EJLjUaqf" />
								</v-avatar>
							</div>
							<v-divider class="mx-4 mt-1" />
							<v-row
								class="ma-0 pa-0"
							>
								<p class="mb-0">
									<span style="color: grey; font-size: 12px">Rs</span>
									<span style="color: green; font-size: 18px; font-weight: bold">150</span>
								</p>
								<v-spacer />
								<v-btn v-ripple
									icon
									small
									width="20"
									class="pa-0"
								>
									<v-icon small>
										add_shopping_cart
									</v-icon>
								</v-btn>
								<v-btn icon
									small
									width="20"
									class="pa-0"
								>
									<v-icon small>
										visibility
									</v-icon>
								</v-btn>
							</v-row>
						</div>
					</v-card>
				</div>
				<div class="swiper-button-next" />
				<div class="swiper-button-prev" />
			</div>
		</v-card>
	</v-card>
</template>
<script>
import Swiper, { Navigation } from "swiper"

export default {
	name: "HotItemsComponent",
	data: () => ({
		foodItems: [
			{
				src: "https://www.listchallenges.com/f/lists/3d06c742-15cc-49b2-8845-7ef42d0c9f97.jpg",
				name: "Burger with chips"
			},
			{
				src: "https://www.skymetweather.com/themes/skymet/images/gallery/toplists/Top-Not-to-miss-food-items-in-Monsoon/4.jpg",
				name: "Samosa Tarkari"
			},
			{
				src: "https://img.theweek.in/content/dam/week/webworld/feature/lifestyle/2017/december/chicken-biriyani.jpg",
				name: "Chicken Biryani"
			},
			{
				src: "https://i.ndtvimg.com/i/2016-07/chicken-korma_625x350_71467713811.jpg",
				name: "Chicken Korma"
			},
			{
				src: "https://www.jocooks.com/wp-content/uploads/2019/03/chow-mein-1-5.jpg",
				name: "Chowmein"
			},
			{
				src: "https://static.toiimg.com/photo/76481989.cms",
				name: "Pizza"
			},
			{
				src: "https://daily.jstor.org/wp-content/uploads/2015/09/SpicyChinese_1050x700.jpg",
				name: "Chicken Spicy"
			},
		],
	}),
	mounted() {
		Swiper.use([Navigation]);

		const mySwiper = new Swiper(".swiper-container", {
			slidesPerView: "auto",
			direction: "horizontal",
			loop: false,
			centeredSlides: true,
			spaceBetween: 15,
			speed: 400,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			}
		})
	},
}
</script>
<style scoped>
.swiper-pagination{
	bottom: -1px !important;
}
</style>

<style scoped lang="sass">
.hot-items
	text-transform: uppercase
	font-size: 1.5rem
	line-height: 1.5rem
	font-family: "Rasa SemiBold", cursive
</style>
