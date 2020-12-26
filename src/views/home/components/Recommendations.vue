<template>
	<div v-if="$vuetify.breakpoint.smAndUp">
		<v-card flat>
			<v-card-title class="px-0 recommend">
				Recommendations:
			</v-card-title>
		</v-card>
		<div class="overflow-y">
			<v-card
				v-for="(food, index) in recommendedItemsSet"
				:key="index"
				dark
				:loading="isLoading"
				:class="(index + 1 !== recommendedItemsSet.length) ? 'mb-4' : ''"
				max-width="270"
				:color="
					colors[index%colors.length]
				"
			>
				<v-img
					:src="food.menu_item.image"
					height="150"
				/>
				<v-card-title class="recommendation-item-name pt-2 pb-1">
					{{ food.name }}
					<span class="px-1">
						<v-avatar v-for="type in food.menu_item.item_type"
							:key="type.id * 27 +47" size="22"
						>
							<v-img :src="type.badge" />
						</v-avatar>
					</span>
				</v-card-title>
				<v-divider class="mx-4" />
				<v-card-text class="d-flex align-center py-2">
					<div><span class="nrs">NRs</span><span class="recommendation-item-price">{{ food.menu_item.price }}</span></div>
					<v-spacer />
					<v-btn icon
						@click="addedToCart = !addedToCart"
					>
						<v-scale-transition>
							<v-icon v-if="!addedToCart"
								size="22"
							>
								add_shopping_cart
							</v-icon>
							<v-icon v-else>
								shopping_cart
							</v-icon>
						</v-scale-transition>
					</v-btn>
				</v-card-text>
			</v-card>
		</div>
	</div>
</template>
<script>
import { mapGetters } from "vuex"

export default {
	name: "RecommendationsList",
	data: () => ({
		addedToCart: false,
		recommendedItemsSet: [],
		colors: [
			"our-blue-gradient",
			"red-gradient",
			"orange-gradient",
			"deep-blue-gradient",
			"teal-gradient",
			"green-gradient",
			"dark-purple-gradient",
			"brown-gradient",
		],
	}),
	computed: {
		...mapGetters({
			recommendedItems: "menuItem/allRecommendedItems"
		}),
	},
	async created() {
		await this.initialize()
	},
	methods: {
		async initialize() {
			this.isLoading = true
			const fetched = await this.$store.dispatch("menuItem/fetchRecommendedItems")
			if (fetched) {
				this.recommendedItemsSet = this.recommendedItems
			}
			this.isLoading = false
		}
	}
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
	border-top: 6px solid goldenrod
	border-bottom: 6px solid goldenrod
	border-radius: 10px
.overflow-y::-webkit-scrollbar
	display: none
.recommendation-item-name
	font-size: .9rem
	padding-left: .5rem
.nrs
	color: #e5ba50
	font-size: .8rem
.recommendation-item-price
	font-size: 1.2rem
	line-height: 1.2rem
	color: #5cdb5c
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
