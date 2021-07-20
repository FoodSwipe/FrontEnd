<template>
	<v-dialog v-model="startOrder"
		persistent
		max-width="400"
		transition="fab-transition"
	>
		<v-card>
			<v-card-title class="d-flex align-center">
				Start your order right now!
			</v-card-title>
			<v-card-subtitle>
				Please register and login to the system so that we can track your orders and serve you more effectively.
			</v-card-subtitle>
			<v-card-text>
				<v-row class="ma-0 pa-0">
					<v-col cols="12">
						<v-text-field
							id="custom-location"
							v-model="order.custom_location"
							filled
							prepend-inner-icon="room"
							hide-details="auto"
							label="Your exact location"
							clearable
							:error-messages="startOrderFormErrors.custom_location"
						/>
					</v-col>
					<v-col cols="12">
						<v-text-field
							id="custom-contact"
							v-model="order.custom_contact"
							filled
							type="number"
							prepend-inner-icon="call"
							hide-details="auto"
							label="Contact number"
							clearable
							:error-messages="startOrderFormErrors.custom_contact"
						/>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn
					color="red darken-1"
					text
					@click="startOrder = false"
				>
					Discard
				</v-btn>
				<v-btn
					color="green darken-1"
					text
					@click="makeOrder()"
				>
					Proceed
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script>
import { mapGetters } from "vuex"

export default {
	name: "StartOrderComponent",
	data: () => ({
		startOrder: false,
		withItem: null,
		order: {
			custom_location: "",
			custom_contact: ""
		}
	}),
	computed: {
		...mapGetters({
			pendingOrder: "order/detailOrder",
			startOrderFormErrors: "order/orderFormFieldErrors",
		})
	},
	created() {
		this.$bus.on("start-order", this.startOrderDialog)
		this.$bus.on("start-order-prefill", this.prefillStartOrderForm)
	},
	beforeUnmount() {
		this.$bus.off("start-order", this.startOrderDialog)
		this.$bus.off("start-order-prefill", this.prefillStartOrderForm)
	},
	methods: {
		async startOrderDialog(args) {
			await this.$store.dispatch("order/clearFormErrors")
			this.startOrder = true
			this.withItem = args.withItem
		},
		prefillStartOrderForm(args) {
			this.order = args.order
		},
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async makeOrder() {
			const started = await this.$store.dispatch("order/startOrder", this.order)
			if (started === true) {
				await this.$store.dispatch("cart/addToCart", {
					order: this.$helper.getCookingOrderId(),
					item: this.withItem.id
				})
				this.$bus.emit("add-cart-count-by-one")
				await this.openSnack(`Cheers! ${this.withItem.name} added to cart.`, "success")
				this.startOrder = false
			} else if (started === 500) {
				await this.openSnack("Internal Server Error.")
			} else if (started === false) {
				await this.openSnack("Please load a valid form.")
			} else {
				await this.openSnack("You have a pending order. Please check your cart.")
				await this.$store.dispatch("order/withCartItems", {
					id: this.$helper.getCookingOrderId()
				})
				await this.$bus.emit("set-cart-count", this.pendingOrder.total_items)
				this.startOrder = false
			}
		},
	}
}
</script>
