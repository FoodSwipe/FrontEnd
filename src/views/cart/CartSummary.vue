<template>
	<v-card
		v-if="currentOrder"
		id="cart-summary"
		class="mx-auto"
		max-width="960"
	>
		<v-toolbar class="px-4 light-orange-gradient"
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
			<v-spacer />
			<v-btn fab
				elevation="1"
				color="white"
				small @click="confirmRemoveOrder"
			>
				<v-icon color="red lighten-1">
					delete
				</v-icon>
			</v-btn>
		</v-toolbar>
		<v-expand-transition mode="ease">
			<v-list two-line>
				<v-list-item
					v-for="(summaryItem, summaryIndex) of getCartSummary"
					:key="summaryIndex"
				>
					<v-list-item-icon class="fill-height my-auto">
						<v-icon>{{ summaryItem.icon }}</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title class="summary-title">
							{{ summaryItem.field }}
						</v-list-item-title>
					</v-list-item-content>
					<v-list-item-action-text class="summary-item-value">
						{{ summaryItem.value }}
					</v-list-item-action-text>
				</v-list-item>
			</v-list>
		</v-expand-transition>
		<v-card-actions>
			<v-btn class="light-orange-gradient-x"
				block
				large
				dark
				:disabled="currentOrder['total_items'] === 0"
				@click="$router.push({name: 'Confirm Order'})"
			>
				Proceed
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { mapGetters } from "vuex"
import Snack from "@/mixin/Snack"

export default {
	name: "CartSummary",
	mixins: [Snack],
	computed: {
		...mapGetters({
			currentOrder: "order/detailOrder",
		}),
		getCartSummary() {
			if (!this.currentOrder) return []
			const summary = this.$helper.getCartSummary(
				this.currentOrder,
				this.currentOrder["cart_items"]
			)
			return [
				{
					icon: "call",
					field: "Contact Number",
					value: this.currentOrder.custom_contact
				},
				{
					icon: "shopping_cart",
					field: "Total Items",
					value: summary.totalItems,
				},
				{
					icon: "title",
					field: "Sub-Total (NRs)",
					value: summary.totalPrice
				},
				{
					icon: "location_on",
					field: "Delivery To",
					value: this.currentOrder.custom_location
				},
				{
					icon: "two_wheeler",
					field: "Delivery Charge (NRs)",
					value: summary.deliveryCharge
				},
				{
					icon: "card_giftcard",
					field: "Loyalty Discount Awarded",
					value: summary.loyaltyDiscount + "%",
				},
				{
					icon: "money",
					field: "Grand Total (NRs)",
					value: summary.grandTotal,
					divider: true
				}
			]
		},
	},
	methods: {
		async confirmRemoveOrder() {
			confirm("Are you sure you want to remove this on going order?") && await this.removeThisOrder()
		},
		async removeThisOrder() {
			const deleted = await this.$store.dispatch("order/delete", {id: this.currentOrder.id})
			if (deleted) {
				await this.$router.push("/store")
				localStorage.removeItem("cookingOrder")
				await this.$store.dispatch("order/clearOrderDetail")
				await this.openSnack("Order remove success. Please continue swiping.", "success")
			} else {
				await this.openSnack("Order remove failed. We're trying to fix the case. Please be with us.")
			}
		},
	}
}
</script>

<style scoped>

</style>
