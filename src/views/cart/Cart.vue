<template>
	<v-card flat
		class="rounded-0 mt-4 mx-auto" width="1200"
	>
		<v-snackbar
			v-model="snack"
			top
			right
			:timeout="3000"
			color="error"
			style="margin-top: -60px;"
		>
			{{ snackText }}

			<template #action="{ attrs }">
				<v-btn
					v-bind="attrs"
					text
					@click="snack = false"
				>
					Close
				</v-btn>
			</template>
		</v-snackbar>
		<v-row class="ma-0 pa-0">
			<v-col cols="12"
				xl="8"
				lg="8"
				md="8"
			>
				<transition-group
					appear
					:css="false"
					@before-enter="beforeEnter"
					@enter="enter"
					@leave="leave"
				>
					<v-card
						v-for="(item, index) in desserts"
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
									src="https://i.ndtvimg.com/i/2017-10/spicy-chicken-recipe_620x330_71508233435.jpg"
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
								{{ item.name }}
								<p class="subtitle-2">
									<v-avatar tile
										size="16"
									>
										<v-img
											src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Indian-vegetarian-mark.svg/1200px-Indian-vegetarian-mark.svg.png"
										/>
									</v-avatar>
									<v-avatar
										color="white"
										max-width="20"
										max-height="22"
										tile
										class="ml-2"
									>
										<v-img
											src="https://cdna.artstation.com/p/assets/images/images/022/547/676/large/dinh-trang-bui-spicy.jpg?1575846866"
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
										:disabled="item.quantity === 1"
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
									Rs {{ item.quantity * item.price }}
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

export default {
	name: "CartView",
	data() {
		return {
			snack: false,
			snackText: "",
			search: "",
			pagination: {},
			headers: [
				{ text: "ACTION", value: "actions", sortable: false},
				{ text: "CART ITEM", value: "name", },
				{ text: "QUANTITY", value: "quantity" },
				{ text: "SUB TOTAL (Rs)", value: "totalPrice" },
			],
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
		}
	},
	computed: {
		getCartSummary() {
			return [
				{
					icon: "location_on",
					field: "Delivery Location",
					value: "Amarsingh-7, Pokhara"
				},
				{
					icon: "shopping_cart",
					field: "Total items in cart.",
					value: this.desserts.length
				},
				{
					icon: "title",
					field: "Sub-Total (Rs)",
					value: 15000
				},
				{
					icon: "card_giftcard",
					field: "Loyalty Discount Awarded",
					value: "5%",
				},
				{
					icon: "text_fields",
					field: "Grand Total (Rs)",
					value: 565656,
					divider: true
				}
			]
		}
	},
	methods: {
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
		},
		subtractQuantity(item) {
			if (item.quantity === 1) return
			item.quantity -=1
		},
		save() {
			this.snack = true
			this.snackColor = "success"
			this.snackText = "Data saved"
		},
		openSnack(text) {
			this.snack = true
			this.snackText = text
		},
		removeItemFromCart(item) {
			const indexOfItemToRemove = this.desserts.indexOf(item)
			this.desserts.splice(indexOfItemToRemove, 1)
			this.openSnack(item.name + " removed from cart.")
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
