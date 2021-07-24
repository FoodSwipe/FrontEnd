<template>
	<v-badge
		:dark="dark"
		color="orange"
		offset-x="10"
		offset-y="15"
	>
		<template #badge>
			<span class="white--text number-font">{{ cartCount }}</span>
		</template>
		<v-tooltip bottom>
			<template #activator="{on, attrs}">
				<v-btn
					:disabled="$route.name === 'Cart'"
					icon
					small
					class="mr-2"
					v-bind="attrs"
					to="/cart"
					v-on="on"
				>
					<v-icon size="26">
						shopping_cart
					</v-icon>
				</v-btn>
			</template>
			<span>Cart</span>
		</v-tooltip>
	</v-badge>
</template>

<script>
import { mapGetters } from "vuex"
import router from "@/router"

export default {
	name: "CartIndicator",
	props: {
		dark: {
			type: Boolean,
			default: true
		}
	},
	data: () => ({
		currentUser: null,
		cartCount: "0",
	}),
	computed: {
		...mapGetters({
			alreadyCookingOrder: "order/detailOrder"
		}),
	},
	async created() {
		this.$bus.on("set-cart-count", this.setCartCount)
		this.$bus.on("add-cart-count-by-one", this.addCartCountByOne)
		this.$bus.on("subtract-cart-count", this.subtractCartCount)
		this.$bus.on("update-cart-count", this.updateCartCount)
		await this.initialize()
	},
	beforeUnmount() {
		this.$bus.off("set-cart-count", this.setCartCount)
		this.$bus.off("add-cart-count-by-one", this.addCartCountByOne)
		this.$bus.off("subtract-cart-count", this.subtractCartCount)
		this.$bus.on("update-cart-count", this.updateCartCount)
	},
	methods: {
		updateCartCount(expression) {
			this.cartCount = (parseInt(this.cartCount) + expression).toString()
		},
		subtractCartCount(value) {
			this.cartCount = (parseInt(this.cartCount) - parseInt(value)).toString()
		},
		addCartCountByOne() {
			this.cartCount = (parseInt(this.cartCount) + 1).toString()
		},
		setCartCount(count) {
			this.cartCount = count.toString()
		},
		async initialize() {
			this.currentUser = this.$helper.getCurrentUser()
			this.showAdminButton = this.$helper.isAdminUser()
			const cookingOrder = this.$helper.getCookingOrderId()
			if (cookingOrder) {
				await this.$store.dispatch("order/withCartItems", {
					id: cookingOrder
				})
				this.cartCount = this.alreadyCookingOrder.total_items.toString()
			}
		},
	},
}
</script>

<style scoped>

</style>
