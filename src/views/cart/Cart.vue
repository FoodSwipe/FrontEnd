<template>
	<v-card flat
		class="rounded-0 mt-4 mx-auto" width="1200"
	>
		<v-row class="ma-0 pa-0">
			<v-col cols="12"
				xl="8"
				lg="8"
				md="8"
			>
				<v-card v-if="cartItemsList.length === 0"
					color="error" dark
				>
					<v-card-title>No items added yet</v-card-title>
				</v-card>
				<transition-group
					v-else
					appear
					:css="false"
					@before-enter="beforeEnter"
					@enter="enter"
					@leave="leave"
				>
					<v-card
						v-for="(item, index) in cartItemsList"
						:key="index"
						class="mb-4 cart-item-card"
					>
						<v-row class="ma-0 pa-0"
							align="center"
						>
							<v-col cols="6"
								xl="3"
								lg="3"
								md="3"
								sm="3"
							>
								<v-img
									:src="item.item.image"
									max-width="200"
									min-width="50"
									height="100"
								/>
							</v-col>
							<v-col cols="6"
								xl="3"
								lg="3"
								md="3"
								sm="3"
							>
								{{ item.item.name }}
								<p class="subtitle-2">
									<v-avatar v-for="(typeOfItem, indic) in item.item.item_type"
										:key="typeOfItem.id +55 *37"
										tile
										size="20"
										:class="
											(indic +1 === item.item.item_type.length) ? '' : 'pr-2'
										"
									>
										<v-img
											:src="typeOfItem.badge"
										/>
									</v-avatar>
								</p>
								<p class="d-flex">
									<v-btn icon
										color="error"
										@click="removeItemFromCart(item)"
									>
										<v-icon>delete</v-icon>
									</v-btn>
									<v-icon class="pl-2">
										favorite
									</v-icon>
								</p>
							</v-col>
							<v-col cols="8"
								xl="4"
								lg="4"
								md="4"
								sm="4"
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
										filled
										type="number"
										hide-details="auto"
										persistent-hint
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
							<v-col cols="4"
								xl="2"
								lg="2"
								md="2"
								sm="2"
							>
								<div class="item-sub-total">
									Rs {{ item.quantity * item.item.price }}
								</div>
							</v-col>
						</v-row>
					</v-card>
				</transition-group>
			</v-col>
			<v-scale-transition mode="out-in">
				<v-col
					cols="12"
					xl="4"
					lg="4"
					md="4"
				>
					<v-card class="mx-auto"
						max-width="960"
					>
						<v-toolbar class="px-4 orange-gradient"
							dark
						>
							<v-app-bar-nav-icon>
								<v-avatar color="#fd966d"
									class="golden-rod-border-2"
								>
									<v-img
										src="https://image.freepik.com/free-vector/beard-man-barber-shop-logo-vector-illustration_56473-434.jpg"
									/>
								</v-avatar>
							</v-app-bar-nav-icon>
							<v-toolbar-title class="font-weight-bold">
								Cart Summary
							</v-toolbar-title>
						</v-toolbar>
						<v-list two-line>
							<v-list-item
								v-for="(summaryItem, summaryIndex) of getCartSummary"
								:key="summaryIndex"
							>
								<v-list-item-icon>
									<v-icon>{{ summaryItem.icon }}</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title class="summary-item-value">
										{{ summaryItem.value }}
									</v-list-item-title>
									<v-list-item-subtitle>{{ summaryItem.field }}</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-list>
						<v-card-actions>
							<v-btn class="brown-gradient"
								block
								large
								dark
								:disabled="cartItemsList.length === 0"
								@click="routeToOrderConfirmation()"
							>
								Proceed
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-scale-transition>
		</v-row>
	</v-card>
</template>
<script>
import router from "@/router"
import Velocity from "velocity-animate"
import { mapGetters } from "vuex"

export default {
	name: "CartView",
	data() {
		return {
			desserts: [
				{
					name: "Frozen Yogurt",
					quantity: 5,
					price: 200,
				},
				{
					name: "Ice cream sandwich",
					quantity: 3,
					price: 300,
				},
				{
					name: "Eclair",
					quantity: 2,
					price: 20,
				},
				{
					name: "Cupcake",
					quantity: 3,
					price: 50,
				},
			],
			cartItemsList: []
		}
	},
	computed: {
		getCartSummary() {
			const today = new Date()
			let totalPrice = 0
			let totalItems = 0
			let loyaltyDiscount = 0
			this.cartItemsList.forEach(item => {
				totalPrice += item.quantity * item.item.price
				totalItems += item.quantity
			})
			if (totalPrice > 2000) loyaltyDiscount = 5
			const deliveryCharge = (today.getHours() > 16 || today.getHours() <= 4) ? 100 : 0
			const grandTotal = totalPrice - (loyaltyDiscount/100)*totalPrice - deliveryCharge
			if (this.currentOrder) return [
				{
					icon: "location_on",
					field: "Delivery Location",
					value: "Amarsingh-7, Pokhara"
				},
				{
					icon: "shopping_cart",
					field: "Total items in cart",
					value: totalItems,
				},
				{
					icon: "title",
					field: "Sub-Total (NRs)",
					value: totalPrice
				},
				{
					icon: "two_wheeler",
					field: "Delivery Charge (NRs)",
					value: deliveryCharge
				},
				{
					icon: "card_giftcard",
					field: "Loyalty Discount Awarded",
					value: loyaltyDiscount + "%",
				},
				{
					icon: "text_fields",
					field: "Grand Total (Rs)",
					value: grandTotal,
					divider: true
				}
			]
			else return []
		},
		...mapGetters({
			currentOrder: "order/detailOrder"
		})
	},
	created() {
		this.initialize()
	},
	methods: {
		async initialize() {
			const cookingOrder = localStorage.getItem("cookingOrder")
			if (cookingOrder) {
				await this.$store.dispatch("order/withCartItems", {
					id: cookingOrder
				})
			}
			this.cartItemsList = this.currentOrder.cart_items
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

		addQuantity(item) {
			item.quantity += 1
			this.$store.dispatch("cart/patch", {
				id: item.id,
				body: {
					quantity: item.quantity
				}
			})
		},
		subtractQuantity(item) {
			if (item.quantity === 1) return
			item.quantity -=1
			this.$store.dispatch("cart/patch", {
				id: item.id,
				body: {
					quantity: item.quantity
				}
			})
		},
		openSnack(text, color) {
			this.$store.dispatch("snack/setSnackState", true)
			this.$store.dispatch("snack/setSnackColor", color)
			this.$store.dispatch("snack/setSnackText", text)
		},
		async removeItemFromCart(item) {
			await this.$store.dispatch("cart/removeFromCart", {
				id: item.id
			})
			this.openSnack(item.item.name + " removed from cart.", "error")
			await this.initialize()
		},
		routeToOrderConfirmation() {
			router.push({name: "Confirm Order"})
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
	@media only screen and (max-width: 640px) and (min-width: 600px) {
		font-size: 1rem;
		line-height: 1rem;
	}
	@media only screen and (max-width: 300px) {
		font-size: 1.2rem;
		line-height: 1.2rem;
	}
}
.cart-item-card {
	background-color: #e5e5e5 !important;
	:hover {
		background-color: #fff7e3 !important;
	}
}
.summary-item-value {
	font-size: 1rem; font-weight: 500;
}
</style>
