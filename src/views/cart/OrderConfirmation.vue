<template>
	<v-card max-width="600"
		flat
		class="mx-auto delivery-details-card"
	>
		<v-card-title class="grey--text text--darken-3">
			<v-icon>explore</v-icon>
			<span class="pl-3">Delivery Address</span>
		</v-card-title>
		<v-card-subtitle class="grey--text text--darken-3">
			Confirm your shipment details. <v-icon>local_shipping</v-icon>
		</v-card-subtitle>
		<v-divider class="mx-4" />
		<v-card-text>
			<v-row class="ma-0 pa-0">
				<v-col cols="12">
					<v-text-field filled
						dense
						prepend-inner-icon="account_circle" label="First name *"
						clearable hide-details="auto"
					/>
				</v-col>
				<v-col cols="12">
					<v-text-field
						v-model="order.first_name"
						filled
						dense
						prepend-inner-icon="account_circle" label="Last name *"
						clearable hide-details="auto"
					/>
				</v-col>
				<v-col cols="12">
					<v-text-field
						v-model="order.last_name"
						filled
						dense
						prepend-inner-icon="gps_fixed" label="Address Line *"
						hint="Provide your GPS location sharable link here so that we can deliver at your doorstep."
						clearable hide-details="auto"
					/>
				</v-col>
				<v-col cols="12">
					<v-text-field
						v-model="order.phoneNumber"
						filled
						dense type="number"
						prepend-inner-icon="call" label="Phone number *"
						clearable hide-details="auto"
					/>
				</v-col>
				<v-col cols="12">
					<v-text-field
						v-model="order.emailAddress"
						filled
						dense type="email"
						prepend-inner-icon="alternate_email" label="Email Address *"
						clearable hide-details="auto"
					/>
				</v-col>
			</v-row>
			<v-row class="ma-0 pa-0 pt-8 pb-6"
				justify="space-around"
			>
				<v-card-actions>
					<v-btn filled>
						<v-icon>arrow_back</v-icon>
						<span v-if="$vuetify.breakpoint.width > 320"
							class="pl-2"
						>Back to cart</span>
					</v-btn>
				</v-card-actions>
				<v-card-actions>
					<v-btn filled
						@click="proceedToPayment()"
					>
						<span v-if="$vuetify.breakpoint.width > 320"
							class="pr-2"
						>Next</span>
						<v-icon>card_travel</v-icon>
					</v-btn>
				</v-card-actions>
			</v-row>
		</v-card-text>
	</v-card>
</template>
<script>
import router from "@/router"

export default {
	name: "OrderConfirmation",
	data: () =>  ({
		order: {
			first_name: "",
			last_name: "",
			phoneNumber: null,
			emailAddress: "",
		}
	}),
	methods: {
		proceedToPayment() {
			router.push({ name: "Confirm Payment"})
		}
	}
}
</script>
<style lang="scss" scoped>
.delivery-details-card {
	transition: all .3s ease;
	margin: -180px 0 20px 0;
	background-color: #ffc1072b;
	@media only screen and (max-width: 475px) {
		margin: -50px 0 20px 0;
	}
}
</style>
