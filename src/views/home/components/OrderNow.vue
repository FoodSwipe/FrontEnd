<template>
	<v-card width="100vw"
		flat
		tile
		color="transparent"
		class="px-4"
	>
		<v-carousel :show-arrows="false"
			height="100"
			hide-delimiters
			cycle
			continuous
			interval="3000"
			touchless
		>
			<v-carousel-item>
				<v-card-title class="order-heading">
					Think food think food-swipe
				</v-card-title>
			</v-carousel-item>
			<v-carousel-item>
				<v-card-title class="order-heading">
					Quality food simply delivered
				</v-card-title>
			</v-carousel-item>
		</v-carousel>
		<v-card
			v-if="cookingOrderId"
			flat
			rounded
			max-width="820"
			class="mx-auto"
		>
			<v-card-title class="d-flex justify-space-between align-center">
				<div>
					You have an ongoing order.
				</div>
				<v-btn icon
					to="/cart"
				>
					<v-icon>shopping_cart</v-icon>
				</v-btn>
			</v-card-title>
			<v-divider />
			<v-card-text v-if="pendingOrder"
				class="pt-1"
			>
				<div class="pa-2 d-flex align-center flex-wrap">
					<v-chip class="ml-1 mb-2">
						<v-icon size="20">
							person_pin_circle
						</v-icon>
						<div class="px-1">
							{{ pendingOrder.custom_location }}
						</div>
					</v-chip>
					<v-chip class="ml-1 mb-2">
						<v-icon size="20">
							phone
						</v-icon>
						<div class="px-1">
							{{ pendingOrder.custom_contact }}
						</div>
					</v-chip>
					<v-chip v-if="pendingOrder.custom_email"
						class="ml-1 mb-2"
					>
						<v-icon size="20">
							email
						</v-icon>
						<div class="px-1">
							{{ pendingOrder.custom_email }}
						</div>
					</v-chip>
					<v-chip class="ml-1 mb-2">
						<div class="px-1">
							<span><b>Rs</b></span><span class="number-font">{{ pendingOrder.total_price }}</span>
						</div>
						<span>
							Total
						</span>
					</v-chip>
				</div>
				<div v-if="$vuetify.breakpoint.width > 600" class="pr-16"
					style="position: relative;"
				>
					<div class="d-flex align-center flex-wrap">
						<div v-if="pendingOrder['cart_items'].length > 0"
							class="d-flex align-center flex-wrap"
						>
							<v-card v-for="item in pendingOrder['cart_items']"
								:key="item.id"
								class="pa-2 ml-2 mb-1 text-center"
								color="grey darken-3"
							>
								<v-avatar>
									<v-img :src="item.item.image" />
								</v-avatar>
								<div class="subtitle-2 cursor"
									@click="$router.push({ name: 'Product', params: { id: item.item.id }})"
								>
									{{ item.item.name }}
								</div>
								<div class="point875">
									Quantity: <v-chip small
										class="number-font"
									>
										{{ item.quantity }}
									</v-chip>
								</div>
							</v-card>
						</div>
						<div v-else>
							<div class="px-2">
								<v-btn to="/store">
									<v-icon size="16">
										fastfood
									</v-icon>
									<span v-if="$vuetify.breakpoint.smAndUp"
										style="font-size: 12px;"
										class="pl-2"
									>Start order</span>
								</v-btn>
							</div>
						</div>
					</div>
					<v-tooltip bottom>
						<template #activator="{on, attrs}">
							<v-btn
								style="position: absolute; right: 1%; top: 0;"
								:icon="$vuetify.breakpoint.width < 600"
								v-bind="attrs"
								v-on="on"
								@click="$router.push({name: 'Confirm Order'})"
							>
								<v-icon size="16">
									shopping_basket
								</v-icon>
							</v-btn>
						</template>
						<span>Checkout</span>
					</v-tooltip>
				</div>
				<div v-else>
					<v-btn v-if="pendingOrder['cart_items'].length === 0"
						to="/store"
						block
					>
						<v-icon size="16">
							fastfood
						</v-icon>
					</v-btn>
					<v-btn
						v-else
						block
						@click="routeToOrderConfirmation()"
					>
						Checkout
					</v-btn>
				</div>
			</v-card-text>
		</v-card>
		<v-card
			v-else
			color="#ffeebcdb"
			rounded
			max-width="820"
			class="mx-auto"
		>
			<v-row class="ma-0 pa-0"
				justify="center"
				align="center"
			>
				<v-col cols="12"
					class="pa-2"
					xl="6"
					lg="6"
					md="6"
					sm="6"
				>
					<v-text-field
						v-model="order.custom_location"
						light
						background-color="rgb(255 255 255 / 33%)"
						color="#f36d00"
						clearable
						filled
						prepend-inner-icon="explore"
						label="Your location here... (*)"
						hint="Try to be more precise with your location information."
						hide-details="auto"
						:error-messages="startOrderFormErrors.custom_location"
					/>
				</v-col>
				<v-col cols="12"
					xl="6"
					lg="6"
					md="6"
					sm="6"
					class="pa-2"
				>
					<v-text-field
						v-model="order.custom_contact"
						color="#f36d00"
						background-color="rgb(255 255 255 / 33%)"
						light
						filled
						type="number"
						prepend-inner-icon="call"
						hide-details="auto"
						label="Contact number (*)"
						clearable
						hint="Please only provide your reachable contact number."
						:error-messages="startOrderFormErrors.custom_contact"
					/>
				</v-col>
				<v-col cols="12"
					class="d-flex justify-center pa-2"
				>
					<v-btn block
						color="#f36d00"
						height="50"
						dark
						@click="startShopping()"
					>
						<v-icon>fastfood</v-icon>
						<span v-if="$vuetify.breakpoint.width > 255"
							class="ml-2"
						>Start Order</span>
					</v-btn>
				</v-col>
			</v-row>
		</v-card>
	</v-card>
</template>
<script>
import { mapGetters } from "vuex"
import router from "@/router"
import Snack from "@/mixin/Snack"

export default {
	name: "OrderNowComponent",
	mixins: [Snack],
	data: () => ({
		itemsFieldRequiredErrorMessage: null,
		cookingOrderId: null,
		currentUser: null,
		order: {
			custom_location: "",
			custom_contact: ""
		},
		isUpdating: false,
	}),
	computed: {
		...mapGetters({
			startOrderFormErrors: "order/orderFormFieldErrors",
			pendingOrder: "order/detailOrder"
		}),
	},
	async created() {
		this.$bus.on("refresh-order-now", this.preFillForm)
		await this.initialize()
		await this.preFillForm()
	},
	async beforeUnmount() {
		this.$bus.off("refresh-order-now", this.preFillForm)
	},
	methods: {
		routeToOrderConfirmation() {
			router.push({name: "Confirm Order"})
		},
		async initialize() {
			this.cookingOrderId = this.$helper.getCookingOrderId()
		},
		async preFillForm() {
			this.currentUser = this.$helper.getCurrentUser()
			this.cookingOrderId = this.$helper.getCookingOrderId()
			console.log(this.cookingOrderId, this.currentUser)

			if(this.currentUser && !this.cookingOrderId) {
				this.order = {
					custom_location: this.currentUser.profile.address,
					custom_contact: (this.currentUser.profile.contact) ? this.currentUser.profile.contact.replace(/\D/g, "") : null,
				}
			} else if (this.currentUser && this.cookingOrderId) {
				await this.$store.dispatch("order/withCartItems", {
					id: this.cookingOrderId
				})
			} else if (!this.currentUser && !this.cookingOrderId) {
				this.order = {
					custom_contact: "",
					custom_location: ""
				}
			}
		},
		async startShopping() {
			const started = await this.$store.dispatch("order/startOrder", this.order)
			if (started === true) {
				this.order = {
					custom_location: "",
					custom_contact: ""
				}
				this.cookingOrderId = this.$helper.getCookingOrderId()
				await this.openSnack("Cheers! Lets start shopping now!", "success")
				await router.push({"name": "Store"})
			} else if (started === 500) {
				await this.openSnack("Internal Server Error.")
			} else if (started === false) {
				await this.openSnack("Please load a valid form.")
			} else {
				await this.$store.dispatch("order/clearFormErrors")
				await this.openSnack(started[0])
				await this.$store.dispatch("order/withCartItems", {
					id: this.$helper.getCookingOrderId()
				})
				this.$bus.emit("set-cart-count", this.pendingOrder.total_items)
			}
		}
	},
}
</script>
<style scoped>
::v-deep.v-autocomplete:not(.v-input--is-focused).v-select--chips input {
	max-height: 25px;
	color: black;
}
.order-heading {
	display: flex;
	justify-content: center;
	align-items: center;
	text-transform: uppercase;
	font-size: 2rem;
	line-height: 2.2rem;
	font-weight: bold;
	text-align: center;
}
</style>
