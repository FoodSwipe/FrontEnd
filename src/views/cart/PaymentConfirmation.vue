<template>
	<v-card max-width="600" flat
		class="mx-auto payment-details-card"
	>
		<div class="order-card-header">
			<v-card-title class="grey--text text--darken-3">
				<v-icon>money</v-icon>
				<span class="pl-3">Payment Information</span>
			</v-card-title>
			<v-card-subtitle class="grey--text text--darken-3">
				Confirm your payment details. <v-icon>shopping_basket</v-icon>
			</v-card-subtitle>
		</div>
		<v-card-text class="card-text">
			<v-card color="peach-gradient">
				<v-row class="ma-0 pa-0 py-4 fill-height"
					justify="center" align="center"
					no-gutters
				>
					<v-col cols="2"
						class="d-flex justify-center"
					>
						<v-checkbox v-model="isCashOnDeliverySelected"
							color="black"
							readonly
						/>
					</v-col>
					<v-col cols="10"
						xl="7"
						lg="7"
						md="7"
						sm="7"
					>
						<v-card-title>Cash on delivery</v-card-title>
						<v-card-subtitle>Pay at your doorstep</v-card-subtitle>
					</v-col>
					<v-col cols="12"
						xl="3"
						lg="3"
						md="3"
						sm="3"
						class="d-flex justify-center align-center"
					>
						<v-avatar color="#eec661"
							size="84"
							class="golden-rod-border-4"
						>
							<v-img
								src="https://i.gifer.com/EnnH.gif"
							/>
						</v-avatar>
					</v-col>
				</v-row>
			</v-card>
			<v-card color="purple-gradient"
				class="mt-6"
			>
				<v-row class="ma-0 pa-0 py-4 fill-height"
					justify="center" align="center"
					no-gutters
				>
					<v-col cols="2"
						class="d-flex justify-center"
					>
						<v-checkbox v-model="isOnlinePaymentSelected"
							color="black"
							disabled
						/>
					</v-col>
					<v-col cols="10"
						xl="7"
						lg="7"
						md="7"
						sm="7"
					>
						<v-card-title>Online Payment System</v-card-title>
						<v-card-subtitle>
							Under construction
						</v-card-subtitle>
					</v-col>
					<v-col cols="12"
						xl="3"
						lg="3"
						md="3"
						sm="3"
						class="d-flex justify-center align-center"
					>
						<v-avatar color="#eec661"
							size="84"
							class="golden-rod-border-4"
						>
							<v-img
								src="https://goingdigitalx.files.wordpress.com/2020/08/mp.gif"
							/>
						</v-avatar>
					</v-col>
				</v-row>
			</v-card>
		</v-card-text>
		<v-card-text class="py-0">
			<v-card-subtitle>💌 By clicking <code>Done</code> your order placement will complete. Be sure, you will not be able to modify this order further. Happy shopping with Food Swipe 🎉</v-card-subtitle>
		</v-card-text>
		<v-row class="ma-0 pa-0 py-6"
			justify="space-around"
		>
			<v-card-actions>
				<v-btn filled
					dark
					color="deep-blue-gradient"
					to="/order/shipping-confirmation"
				>
					<v-icon>explore</v-icon>
					<span v-if="$vuetify.breakpoint.width > 320"
						class="pl-2"
					>Back to shipping</span>
				</v-btn>
			</v-card-actions>
			<v-card-actions>
				<v-btn filled
					dark
					color="teal-gradient"
					@click="doneOrder()"
				>
					<span v-if="$vuetify.breakpoint.width > 320"
						class="pr-2"
					>Done</span>
					<v-icon>check</v-icon>
				</v-btn>
			</v-card-actions>
		</v-row>
	</v-card>
</template>
<script>
import router from "@/router"

export default {
	name: "OrderConfirmation",
	data: () =>  ({
		isCashOnDeliverySelected: true,
		isOnlinePaymentSelected: false,
	}),
	methods: {
		async openSnack(text, color="success") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async doneOrder() {
			const done = await this.$store.dispatch("order/doneFromCustomer", {
				id: this.$helper.getCookingOrderId(),
				body: {
					done_from_customer: true
				}
			})
			if (done === true) {
				await this.openSnack("Order placement completed successfully.")
				this.$bus.emit("set-cart-count", 0)
				await router.push(`review-order/${this.$helper.getCookingOrderId()}`)
				this.$helper.removeCookingOrderIdFromLocalStorage()
				await this.$store.dispatch("order/clearOrderDetail")
			} else {
				await this.openSnack("Internal server error. Try again.", "error")
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.payment-details-card {
	border-radius: 0;
	//margin: -120px 0 20px 0;
	background-color: transparent;
}
.card-text {
	background-color: #ffc1072b;
	border-radius: 20px !important;
	margin-top: -30px;
	padding-top: 45px;
}
</style>
