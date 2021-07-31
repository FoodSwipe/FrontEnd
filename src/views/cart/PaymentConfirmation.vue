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
				<v-btn
					text
					color="primary"
					to="/order/shipping-confirmation"
				>
					<v-icon>explore</v-icon>
					<span v-if="$vuetify.breakpoint.width > 320"
						class="pl-2"
					>Back to shipping</span>
				</v-btn>
			</v-card-actions>
			<v-card-actions>
				<v-btn
					:loading="loadingBtn"
					text
					color="teal"
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
import Snack from "@/mixin/Snack"

export default {
	name: "OrderConfirmation",
	mixins: [Snack],
	data: () =>  ({
		loadingBtn: false,
		isCashOnDeliverySelected: true,
		isOnlinePaymentSelected: false,
	}),
	methods: {
		async doneOrder() {
			this.loadingBtn = true
			const done = await this.$store.dispatch("order/doneFromCustomer", {
				id: this.$helper.getCookingOrderId(),
				body: {
					done_from_customer: true
				}
			})
			if (done === true) {
				await this.openSnack("Order placement completed successfully.")
				await router.push(`review-order/${this.$helper.getCookingOrderId()}`)
			} else {
				await this.openSnack("Internal server error. Try again.", "error")
			}
			this.loadingBtn = false
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
