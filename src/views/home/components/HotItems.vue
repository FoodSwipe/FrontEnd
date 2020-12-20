<template>
	<v-card
		flat
		class="rounded-0 pa-4"
	>
		<v-card-title class="hot-items">
			<u>Hot Items</u>
		</v-card-title>
		<v-card class="pa-0 mx-auto"
			flat max-width="1000"
			color="transparent"
		>
			<div class="swiper-container pa-1">
				<div class="swiper-wrapper">
					<v-card
						v-for="(item, index) in foodItems"
						:key="index"
						flat
						class="swiper-slide"
						max-width="140"
					>
						<!-- eslint-disable-next-line vue/no-v-for-template-key-on-child-->
						<v-badge
							color="#2196f380"
							avatar
							bordered
							overlap
							bottom
							offset-x="30"
							offset-y="20"
						>
							<template #badge>
								<v-avatar color="transparent">
									<v-img
										:src="item.badge"
									/>
								</v-avatar>
							</template>

							<v-avatar size="100"
								color="transparent"
							>
								<v-img
									class="car-image"
									:src="item.src"
									max-width="100%"
								/>
							</v-avatar>
						</v-badge>

						<p class="mb-0 text-center item-name">
							{{ item.name }}
						</p>
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
		badges: {
			spicy: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg",
			cheesy: "https://images.vexels.com/media/users/3/157209/isolated/preview/725aa2473489db2e550656210c557f18-cheesy-pizza-icon-by-vexels.png",
			bar: "https://balithisweek.com/wp-content/uploads/2016/10/btw-icon-bar.png",
			crispy: "https://image.flaticon.com/icons/png/512/3149/3149091.png",
			hot: "https://static.wikia.nocookie.net/god-of-slaughter/images/d/dd/Earth_Flame.png/revision/latest?cb=20180515205947"
		},
	}),
	computed: {
		foodItems() {
			return [
				{
					src: "https://www.listchallenges.com/f/lists/3d06c742-15cc-49b2-8845-7ef42d0c9f97.jpg",
					name: "Chrispy Burger",
					badge: this.badges.cheesy
				},
				{
					src: "https://2.bp.blogspot.com/-H94lYgSr1XQ/XFzvxImlHEI/AAAAAAAANak/M4S7t2KkN0QWXHtSx0aM9zmmRprK8ot3ACLcBGAs/s1600/Cover.PNG",
					name: "Old Durbar",
					badge: this.badges.bar
				},
				{
					src: "https://img.theweek.in/content/dam/week/webworld/feature/lifestyle/2017/december/chicken-biriyani.jpg",
					name: "Chicken Biryani",
					badge: this.badges.spicy
				},
				{
					src: "https://i.ndtvimg.com/i/2016-07/chicken-korma_625x350_71467713811.jpg",
					name: "Chicken Korma",
					badge: this.badges.hot
				},
				{
					src: "https://www.jocooks.com/wp-content/uploads/2019/03/chow-mein-1-5.jpg",
					name: "Chowmein",
					badge: this.badges.spicy
				},
				{
					src: "https://static.toiimg.com/photo/76481989.cms",
					name: "Pizza",
					badge: this.badges.cheesy
				},
				{
					src: "https://daily.jstor.org/wp-content/uploads/2015/09/SpicyChinese_1050x700.jpg",
					name: "Chicken Spicy",
					badge: this.badges.spicy
				},
			]
		}
	},
	mounted() {
		Swiper.use([Navigation]);

		const mySwiper = new Swiper(".swiper-container", {
			slidesPerView: "auto",
			direction: "horizontal",
			loop: false,
			centeredSlides: true,
			spaceBetween: 0,
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
.item-name
	width: 100px
	font-size: 1rem
</style>
