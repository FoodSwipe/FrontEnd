<template>
	<v-card max-width="600"
		flat
		class="mx-auto delivery-details-card transparent"
	>
		<div class="order-card-header">
			<v-card-title class="grey--text text--darken-3">
				<v-icon>explore</v-icon>
				<span class="pl-3">Delivery Address</span>
			</v-card-title>
			<v-card-subtitle class="grey--text text--darken-3">
				Confirm your shipment details. <v-icon>local_shipping</v-icon>
			</v-card-subtitle>
		</div>
		<!--		<v-divider class="mx-4" />-->
		<v-card-text class="card-text">
			<v-row class="ma-0 pa-0">
				<v-col cols="12">
					<v-text-field
						v-model="order.custom_location"
						filled
						dense
						prepend-inner-icon="gps_fixed" label="Address Line (*)"
						hint="Provide your GPS location sharable link here so that we can deliver at your doorstep."
						clearable hide-details="auto"
						:error-messages="orderFormErrors.custom_location"
					/>
				</v-col>
				<v-col cols="12">
					<v-text-field
						v-model="order.custom_contact"
						filled
						dense type="number"
						prepend-inner-icon="call" label="Phone number (*)"
						clearable hide-details="auto"
						hint="You may be called for location verification during order delivery at this phone number."
						:error-messages="orderFormErrors.custom_contact"
					/>
				</v-col>
				<v-col
					cols="12"
				>
					<v-text-field
						v-model="order.custom_email"
						filled
						dense type="email"
						prepend-inner-icon="email" label="Email address"
						hint="Fill accessible email address to track your order"
						clearable hide-details="auto"
					/>
				</v-col>
			</v-row>
		</v-card-text>
		<v-row class="ma-0 pa-0 py-6"
			justify="space-around"
		>
			<v-card-actions>
				<v-btn
					to="/cart"
					text
					color="red lighten-1"
				>
					<v-icon>shopping_cart</v-icon>
					<span v-if="$vuetify.breakpoint.width > 320"
						class="pl-2"
					>Back to cart</span>
				</v-btn>
			</v-card-actions>
			<v-card-actions>
				<v-btn
					:loading="loadingBtn"
					text
					color="orange"
					@click="proceedToPayment()"
				>
					<span v-if="$vuetify.breakpoint.width > 320"
						class="pr-2"
					>Next</span>
					<v-icon>card_travel</v-icon>
				</v-btn>
			</v-card-actions>
		</v-row>
	</v-card>
</template>
<script>
import router from "@/router"
import { mapGetters } from "vuex"
import Snack from "@/mixin/Snack"

export default {
	name: "OrderConfirmation",
	mixins: [Snack],
	data: () =>  ({
		loadingBtn: false,
		order: {
			custom_location: null,
			custom_contact: null,
			custom_email: null,
		}
	}),
	computed: {
		...mapGetters({
			orderFormErrors: "order/orderFormFieldErrors",
			cookingOrder: "order/detailOrder"
		})
	},
	async created() {
		await this.initialize()
	},
	methods: {
		async initialize() {
			await this.$store.dispatch("order/clearFormErrors")
			await this.$store.dispatch("order/withCartItems", {
				id: this.$helper.getCookingOrderId()
			})
			this.order = {
				custom_location: this.cookingOrder.custom_location,
				custom_contact: (this.cookingOrder.custom_contact) ? this.cookingOrder.custom_contact.replace(/\D/g, "") : "",
				custom_email: this.cookingOrder.custom_email,
			}
		},
		async proceedToPayment() {
			if(!this.order.custom_location && !this.order.custom_email) {
				await this.openSnack("Please provide your delivery address and contact details.", "error")
				return
			}
			this.loadingBtn = true
			const patched = await this.$store.dispatch("order/unauthorizedUpdateOrder", {
				id: this.$helper.getCookingOrderId(),
				body: {
					...this.order
				}
			})
			this.loadingBtn = false
			if (patched === true) {
				await this.$store.dispatch("order/clearFormErrors")
				await router.push({name: "Confirm Payment"})
			} else if (patched === 500) {
				await this.openSnack("Internal Server Error")
			} else if(patched === false) {
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.delivery-details-card {
	transition: all .3s ease;
	background-color: transparent;
}
.card-text {
	background-color: #ffc1072b;
	border-radius: 20px !important;
	margin-top: -30px;
	padding-top: 45px;
}
</style>
