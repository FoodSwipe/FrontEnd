<template>
	<div class="pa-4">
		<v-card
			color="brown lighten-4"
			max-width="800"
			class="mx-auto pa-2 order-now-card"
		>
			<v-row class="ma-0 pa-0"
				justify="center"
				align="center"
			>
				<v-col cols="12"
					class="pa-1"
					xl="6"
					lg="6"
					md="6"
					sm="6"
				>
					<v-text-field
						v-model="order.custom_location"
						color="orange darken-4"
						clearable
						filled
						prepend-inner-icon="explore"
						label="Your location here... (*)"
						hint="Try to be more precise so that we can know your doorstep."
						hide-details="auto"
						:error-messages="startOrderFormErrors.custom_location"
					/>
				</v-col>
				<v-col cols="12"
					xl="6"
					lg="6"
					md="6"
					sm="6"
					class="pa-1"
				>
					<v-text-field
						id="custom-contact"
						v-model="order.custom_contact"
						filled
						type="number"
						prepend-inner-icon="call"
						hide-details="auto"
						label="Contact number (*)"
						clearable
						:error-messages="startOrderFormErrors.custom_contact"
					/>
				</v-col>
				<v-col cols="12"
					class="d-flex justify-center pa-1"
				>
					<v-btn depressed
						class="purple-gradient"
						dark
						:disabled="isDisabled"
						@click="startShopping()"
					>
						<v-icon>fastfood</v-icon>
						<span v-if="$vuetify.breakpoint.width > 255"
							class="ml-2"
						>start Shopping</span>
					</v-btn>
				</v-col>
			</v-row>
		</v-card>
	</div>
</template>
<script>
import { refineOrderNowList } from "@/Helper"
import { mapGetters } from "vuex"
import router from "@/router"

export default {
	name: "OrderNowComponent",
	data: () => ({
		itemsFieldRequiredErrorMessage: null,
		isDisabled: false,
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
		this.preFillForm()
	},
	async beforeUnmount() {
		this.$bus.off("refresh-order-now", this.preFillForm)
	},
	methods: {
		async initialize() {
			this.isDisabled = (this.$helper.getCookingOrderId() !== null)
		},
		preFillForm() {
			if(this.$helper.isAuthenticated()) {
				const currentUser = this.$helper.getCurrentUser()
				this.order = {
					custom_location: currentUser.profile.address,
					custom_contact: (currentUser.profile.contact) ? currentUser.profile.contact.replace(/\D/g, "") : null,
				}
			} else {
				this.order = {
					custom_location: "",
					custom_contact: ""
				}
			}
		},
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async startShopping() {
			console.log("here")
			const started = await this.$store.dispatch("order/startOrder", this.order)
			if (started === true) {
				this.order = {
					custom_location: "",
					custom_contact: ""
				}
				this.isDisabled = true
				await this.openSnack("Cheers! Lets start shopping now!", "success")
				await router.push({"name": "Cart"})
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
.order-now-card {
	/*background: linear-gradient(rgba(248, 249, 250, 0), rgba(246, 242, 248, 0)), url("https://media-cdn.tripadvisor.com/media/photo-s/0b/05/09/21/dessert.jpg") no-repeat fixed center;*/
	/*background-size: cover;*/
}
</style>
