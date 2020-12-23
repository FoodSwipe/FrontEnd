<template>
	<div v-if="$vuetify.breakpoint.smAndUp">
		<v-card flat>
			<v-card-title class="px-0 recommend">
				Recommendations:
			</v-card-title>
		</v-card>
		<div class="overflow-y">
			<v-card v-for="(food, index) in foodItems"
				:key="index"
				:class="(index + 1 !== foodItems.length) ? 'mb-4' : ''"
				max-width="270"
			>
				<v-img
					:src="food.src"
					height="100"
				/>
				<v-card-title class="recommendation-item-name pt-2 pb-1">
					{{ food.name }}
					<span class="px-1">
						<v-avatar size="22">
							<v-img
								contain
								src="https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
							/>
						</v-avatar>
					</span>
				</v-card-title>
				<v-divider class="mx-4" />
				<v-card-text class="d-flex align-center py-2">
					<div><span class="nrs">NRs</span><span class="recommendation-item-price">249</span></div>
					<v-spacer />
					<v-btn dark depressed
						small
						color="indigo"
						@click="addedToCart = !addedToCart"
					>
						<v-scale-transition>
							<v-icon v-if="!addedToCart"
								size="18"
							>
								add_shopping_cart
							</v-icon>
							<span v-else><v-icon>shopping_cart</v-icon>Added to cart</span>
						</v-scale-transition>
					</v-btn>
				</v-card-text>
			</v-card>
		</div>
	</div>
</template>
<script>
export default {
	name: "RecommendationsList",
	data: () => ({
		addedToCart: false,
		foodItems: [
			{
				src: "https://www.listchallenges.com/f/lists/3d06c742-15cc-49b2-8845-7ef42d0c9f97.jpg",
				name: "Burger with chips"
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
	})
}
</script>
<style lang="sass" scoped>
.overflow-y
	max-width: 300px
	height: 810px
	overflow-y: auto
	-ms-overflow-style: none
	scrollbar-width: none
	padding: 10px
	border: 6px solid goldenrod
	border-radius: 10px
.overflow-y::-webkit-scrollbar
	display: none
.recommendation-item-name
	font-size: .9rem
	padding-left: .5rem
.nrs
	color: darkgoldenrod
	font-size: .8rem
.recommendation-item-price
	font-size: 1.2rem
	line-height: 1.2rem
	color: green
	font-weight: 500
	padding: 0 0 0 .5rem
.recommend
	background: linear-gradient(to right, green, transparent)
	max-width: 300px
	padding-left: 10px !important
	color: #153b3b
	margin-bottom: 10px
	font-family: 'Sacramento', cursive
	font-size: 2.4rem
</style>
