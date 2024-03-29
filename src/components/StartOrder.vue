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
			<v-card-subtitle class="pb-2">
				Please register and login to the system so that we can track your orders and serve you more effectively.
			</v-card-subtitle>
			<v-divider class="pb-4" />
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
			<v-card-actions class="px-8">
				<v-btn
					color="red darken-1"
					text
					small
					@click="startOrder = false"
				>
					Discard
				</v-btn>
				<v-spacer />
				<v-btn
					:loading="loadingLater"
					color="grey darken-1"
					text
					small
					@click="skipWithMakeOrder()"
				>
					LATER
				</v-btn>
				<v-btn
					:loading="loadingBtn"
					color="green darken-1"
					text
					small
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
import Snack from "@/mixin/Snack"

export default {
	name: "StartOrder",
	mixins: [Snack],
	data: () => ({
		loadingBtn: false,
		loadingLater: false,
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
		this.$bus.on("add-item-to-cart", this.addItemToCart)
	},
	beforeUnmount() {
		this.$bus.off("start-order")
		this.$bus.off("start-order-prefill")
		this.$bus.off("add-item-to-cart")
	},
	methods: {
		async startOrderDialog(args) {
			await this.$store.dispatch("order/clearFormErrors")
			this.startOrder = true
			if(args.withItem) this.withItem = args.withItem
		},
		prefillStartOrderForm(args) {
			this.order = args.order
			this.startOrderDialog(args)
		},
		async addItemToCart(args) {
			if(args.withItem) this.withItem = args.withItem
			await this.$store.dispatch("cart/addToCart", {
				order: this.$helper.getCookingOrderId(),
				item: this.withItem.id
			})
			await this.$store.dispatch("order/withCartItems", {id: this.$helper.getCookingOrderId()})
			await this.openSnack(`Cheers! ${this.withItem.name} added to cart.`, "success")
		},
		async skipWithMakeOrder() {
			this.loadingLater = true
			await this.startOrderProcess()
			this.loadingLater = false
		},
		async makeOrder() {
			if(!this.order.custom_contact && !this.order.custom_location) {
				await this.openSnack("Please fill the form to start your order.")
				return
			}
			await this.startOrderProcess()
		},
		async startOrderProcess() {
			this.loadingBtn = true
			const started = await this.$store.dispatch("order/startOrder", this.order)
			this.loadingBtn = false
			if (started === true) {
				this.loadingBtn = true
				await this.addItemToCart({withItem: this.withItem})
				this.loadingBtn = false
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
				this.startOrder = false
			}
		}
	}
}
</script>
