<template>
	<div>
		<v-subheader class="px-0 recommend"
			:class="
				($vuetify.breakpoint.mdAndUp)
					? 'd-flex justify-center py-10'
					: 'd-flex justify-start'
			"
		>
			Our Recommendations
		</v-subheader>
		<v-list three-line dark
			class="blue-gradient rounded"
			:max-width="
				($vuetify.breakpoint.mdAndUp) ? '500' : '100%'
			"
		>
			<div v-for="(food, index) in recommendedItemsSet"
				:key="index"
			>
				<v-list-item>
					<v-list-item-avatar size="50"
						class="golden-rod-border-2"
					>
						<v-avatar>
							<v-img :src="food.menu_item.image" />
						</v-avatar>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title class="recommendation-item-name cursor"
							@click="routeToItemDetail(food.menu_item)"
						>
							{{ food.menu_item.name }}
						</v-list-item-title>
						<v-list-item-subtitle>
							<span class="px-1">
								<v-avatar v-for="type in food.menu_item.item_type"
									:key="type.id * 27 +47" size="22"
								>
									<v-img :src="type.badge" />
								</v-avatar>
							</span>
						</v-list-item-subtitle>
						<v-list-item-subtitle>
							<span class="nrs">NRs</span><span class="recommendation-item-price">{{ food.menu_item.price }}</span>
						</v-list-item-subtitle>
					</v-list-item-content>
					<v-list-item-action>
						<v-btn icon
							@click="addItemToCart(food.menu_item)"
						>
							<v-icon>
								add_shopping_cart
							</v-icon>
						</v-btn>
					</v-list-item-action>
				</v-list-item>
				<v-divider v-if="index !== recommendedItemsSet.length -1"
					inset
				/>
			</div>
		</v-list>
	</div>
</template>
<script>
import { mapGetters } from "vuex"
import router from "@/router"

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
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async addItemToCart(item) {
			if (this.$helper.isAuthenticated()) {
				const currentUser = this.$helper.getCurrentUser()
				this.$bus.emit("start-order-prefill", {
					order: {
						custom_location: currentUser.profile.address,
						custom_contact: (currentUser.profile.contact)
							? currentUser.profile.contact.replace(/\D/g, "")
							: null
					}
				})
			}
			if (this.$helper.getCookingOrderId()) {
				const addedToCart = await this.$store.dispatch("cart/addToCart", {
					order: parseInt(this.$helper.getCookingOrderId()),
					item: item.id
				})
				if (addedToCart === true) {
					await this.openSnack(`Cheers! ${item.name} is added to cart.`, "success")
					this.$bus.emit("add-cart-count-by-one")
					await this.$store.dispatch("order/withCartItems", {
						id: this.$helper.getCookingOrderId()
					})
				} else {
					if (addedToCart.non_field_errors !== undefined) {
						if (Array.isArray(addedToCart.non_field_errors)) {
							if (addedToCart.non_field_errors[0] === "The fields order, item must make a unique set.") {
								await this.openSnack("Item already added to cart.")
							}
						}
					}
				}
			} else {
				this.$bus.emit("start-order", {
					withItem: item
				})
			}
		},
		async initialize() {
			this.isLoading = true
			const fetched = await this.$store.dispatch("menuItem/fetchRecommendedItems")
			if (fetched) {
				this.recommendedItemsSet = this.recommendedItems
			}
			this.isLoading = false
		},
		routeToItemDetail(item) {
			router.push("/product/"+item.id)
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
	font-size: 1.4rem
	line-height: 1.6rem
	font-weight: 500
	letter-spacing: 0
	padding-left: .5rem
	font-family: 'Jura', sans-serif
.nrs
	color: #e5ba50
	font-size: .8rem
	font-weight: bold
.recommendation-item-price
	font-size: 1.2rem
	line-height: 1.2rem
	color: #5cdb5c
	font-weight: 500
	padding: 0 0 0 .5rem
.recommend
	max-width: 500px
	padding-left: 10px !important
	color: #153b3b
	margin-bottom: 10px
	font-family: 'Sacramento', cursive
	font-size: 2.4rem
.blue-gradient
	background: linear-gradient(40deg, #2d9cf4, #303f9f) !important
</style>
