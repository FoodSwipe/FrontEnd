<template>
	<v-card flat
		tile
		class="mx-auto"
		min-height="100vh"
		color="#fff5e6"
	>
		<simple-toolbar />
		<v-card max-width="1200"
			class="mx-auto transparent"
			flat tile
		>
			<v-row class="ma-0 pa-0 px-3"
				justify="center"
				align="center"
			>
				<v-breadcrumbs v-if="!isLoading"
					:items="cartBreadcrumbs"
					class="px-1"
				>
					<template #item="{ item }">
						<v-breadcrumbs-item
							class="home-breadcrumb-item"
							:to="item.href"
							:disabled="item.disabled"
						>
							{{ item.text.toUpperCase() }}
						</v-breadcrumbs-item>
					</template>
				</v-breadcrumbs>
				<v-spacer />
				<v-tooltip bottom>
					<template #activator="{on, attrs}">
						<v-btn icon
							v-bind="attrs"
							v-on="on"
							@click="$router.go(-1)"
						>
							<v-icon>arrow_back</v-icon>
						</v-btn>
					</template>
					<span>Go Back</span>
				</v-tooltip>
			</v-row>
			<v-row class="ma-0 pa-0">
				<v-col v-if="cartItemsList.length === 0"
					cols="12"
				>
					<v-card
						color="#f9f2ed"
					>
						<v-card-title class="d-flex justify-center align-center">
							<v-icon>shopping_cart</v-icon><span class="ml-3">Your cart is empty!</span>
						</v-card-title>
						<v-card-subtitle class="text-center">
							Add our fantastic menu items to your cart and start shopping.
						</v-card-subtitle>
						<v-divider />

						<v-img
							height="200"
							contain
							:src="require('@/assets/empty_cart.gif')"
						/>
						<v-card-actions class="d-flex justify-center">
							<v-btn color="blue-gradient"
								dark
								to="/store"
							>
								<v-icon size="24">
									store
								</v-icon>
								<span v-if="$vuetify.breakpoint.width > 165"
									class="ml-2"
								>Visit Store</span>
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
				<v-col v-else
					cols="12"
					xl="8"
					lg="8"
					md="8"
				>
					<transition-group
						appear
						:css="false"
						@before-enter="beforeEnter"
						@enter="enter"
					>
						<v-card
							v-for="(item, index) in cartItemsList"
							:key="index"
							class="cart-item-card pa-0"
							:class="
								(index+1 === cartItemsList.length) ? '' : 'mb-4'
							"
						>
							<v-row class="ma-0 pa-0"
								align="center"
							>
								<!-- image column-->
								<v-col cols="12"
									xl="3"
									lg="3"
									md="3"
									sm="3"
								>
									<v-img
										:src="(item.item !== undefined) ? item.item.image : ''"
										width="100%"
										height="100%"
										max-height="150"
									/>
								</v-col>
								<v-col cols="12"
									xl="3"
									lg="3"
									md="3"
									sm="3"
								>
									<p>
										{{ item.item.name }}
										<span class="subtitle-2">
											<v-avatar v-for="(typeOfItem, indic) in item.item.item_type"
												:key="typeOfItem.id +55 *37"
												tile
												size="20"
												:class="
													(indic +1 === item.item.item_type.length) ? '' : 'pr-2'
												"
												class="slight-up"
											>
												<v-img
													:src="typeOfItem.badge"
												/>
											</v-avatar>
										</span>
									</p>
									<div class="d-flex mb-0 align-center">
										<v-btn icon
											color="error"
											:x-small="$vuetify.breakpoint.width < 280"
											@click="removeItemFromCart(item)"
										>
											<v-icon>delete</v-icon>
										</v-btn>
										<v-btn v-if="$vuetify.breakpoint.width > 205"
											icon
											disabled
											:x-small="$vuetify.breakpoint.width < 280"
										>
											<v-icon class="pl-2">
												favorite
											</v-icon>
										</v-btn>
										<v-spacer />
										<div v-if="$vuetify.breakpoint.xsOnly"
											class="py-2 d-flex align-center mb-0"
										>
											<v-icon v-if="$vuetify.breakpoint.width > 255"
												size="18"
												class="today-icon"
											>
												today
											</v-icon>
											<span class="pl-2 cart-item-created-at">{{ item.created_at }}</span>
										</div>
									</div>
								</v-col>
								<v-col cols="7"
									xl="4"
									lg="4"
									md="4"
									sm="3"
								>
									<div class="d-flex align-center">
										<v-btn
											icon
											color="error"
											height="56"
											class="rounded-0"
											:disabled="item.quantity <= 1"
											@click="subtractQuantity(item)"
										>
											<v-icon>remove</v-icon>
										</v-btn>
										<v-text-field v-model="item.quantity"
											class="cart-item-quantity"
											filled
											type="number"
											hide-details="auto"
											persistent-hint
											@change="quantityChanged(item)"
										/>
										<v-btn icon
											height="56"
											color="primary"
											class="rounded-0"
											@click="addQuantity(item)"
										>
											<v-icon>add</v-icon>
										</v-btn>
									</div>
								</v-col>
								<v-col cols="5"
									xl="2"
									lg="2"
									md="2"
									sm="3"
								>
									<p
										v-if="$vuetify.breakpoint.smAndUp"
										class="py-2 d-flex align-center cart-item-created-at"
									>
										<span><v-icon size="18">
											history
										</v-icon></span>
										<span class="pl-2">{{ item.created_at }}</span>
									</p>
									<div class="item-sub-total py-2">
										NRs {{ item.quantity * item.item.price }}
									</div>
								</v-col>
							</v-row>
						</v-card>
					</transition-group>
				</v-col>
				<v-scale-transition
					mode="out-in"
				>
					<v-col
						v-if="cartItemsList.length > 0"
						cols="12"
						xl="4"
						lg="4"
						md="4"
					>
						<cart-summary />
					</v-col>
				</v-scale-transition>
			</v-row>
		</v-card>
	</v-card>
</template>
<script>
import Velocity from "velocity-animate"
import { mapGetters } from "vuex"
import SimpleToolbar from "@/components/SimpleToolbar"
import Snack from "@/mixin/Snack"
import CartSummary from "@/views/cart/CartSummary"

export default {
	name: "CartView",
	components: { CartSummary, SimpleToolbar },
	mixins: [Snack],
	data() {
		return {
			isLoading: false,
			cartItemsList: [{
				item: {
					name: ""
				}
			}], // do not show empty card while loading (just a workaround),
			cartBreadcrumbs: [
				{
					text: "> Home",
					disabled: false,
					href: "/",
				},
				{
					text: "Cart",
					disabled: true,
					href: "",
				}
			]
		}
	},
	computed: {
		...mapGetters({
			currentOrder: "order/detailOrder",
			cartItemDetail: "cart/detailCartItem"
		})
	},
	async created() {
		this.$bus.on("refresh-cart", this.initialize)
		await this.initialize()
	},
	beforeUnmount() {
		this.$bus.off("refresh-cart", this.initialize)
	},
	methods: {
		async quantityChanged(item) {
			await this.$store.dispatch("cart/patch", {
				id: item.id,
				body: {
					quantity: item.quantity
				}
			})
		},
		async initialize() {
			this.isLoading = true
			const cookingOrder = this.$helper.getCookingOrderId()
			if (cookingOrder) {
				await this.$store.dispatch("order/withCartItems", {
					id: cookingOrder
				})
				this.cartItemsList = this.currentOrder["cart_items"]
			} else {
				this.cartItemsList = []
			}
			this.isLoading = false
		},
		beforeEnter(el) {
			el.style.opacity = 0
			el.style.width = "0em"
		},
		enter(el, done) {
			Velocity(
				el,
				{opacity: 1, width: "100%"},
				{duration: 1500, easing: [70, 8], complete: done}
			)
		},
		leave(el, done) {
			Velocity(el,
				{opacity: 0, width: "0em"},
				{
					duration: 300,
					ease: "easeOutCubic",
					complete: done
				}
			)
		},

		async addQuantity(item) {
			item.quantity += 1
			await this.$store.dispatch("cart/patch", {
				id: item.id,
				body: {
					quantity: item.quantity
				}
			})
			await this.initialize()
		},
		async subtractQuantity(item) {
			if (item.quantity === 1) return
			item.quantity -=1
			await this.$store.dispatch("cart/patch", {
				id: item.id,
				body: {
					quantity: item.quantity
				}
			})
			await this.initialize()
		},
		async removeItemFromCart(item) {
			await this.$store.dispatch("cart/removeFromCart", {
				id: item.id
			})
			await this.initialize()
			await this.openSnack(item.item.name + " removed from cart.", "success")
		}
	},
}
</script>
<style lang="scss">
.item-quantity {
	transition: all .3s ease-in-out;
	font-size: 1.6rem;
	line-height: 1.6rem;
	border: 2px solid darkslategrey;
	border-radius: 8px;
	padding: 6px 12px;
	color: #3c3c3c;
	@media only screen and (max-width: 640px) and (min-width: 600px) {
		font-size: 1.2rem;
		line-height: 1.2rem;
	}
	@media only screen and (max-width: 300px) {
		font-size: .875rem;
		line-height: .875rem;
	}
}
.item-sub-total {
	transition: all .3s ease-in-out;
	font-size: 1.4rem;
	line-height: 1.4rem;
	color: green;
	font-weight: bold;
	font-family: Lato, serif;
	@media only screen and (max-width: 300px) {
		font-size: 1.2rem;
		line-height: 1.2rem;
	}
}
.cart-item-card {
	background-color: #e5e5e5 !important;
	&:hover {
		background-color: #fff7e3 !important;
	}
}
.summary-item-value {
	font-size: 1rem; font-weight: 500;
}
.cart-item-quantity input {
	text-align: center;
	font-weight: 500;
	color: darkslategrey !important;
	font-size: 1.2rem;
}
.slight-up {
	margin-top: -4px;
}
.cart-item-created-at {
	font-size: .8rem; line-height: .8rem; letter-spacing: .01rem;
	color: #ea9c68;
	font-weight: 450;
}
.today-icon {
	margin-top:-2px;
}
.cart-item-quantity {
	max-width: 100px;
}
.summary-title {
	font-size: .875rem; line-height: .84rem;
}
</style>
