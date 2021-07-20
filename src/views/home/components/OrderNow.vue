<template>
	<v-card width="100vw"
		flat
		tile
		color="transparent"
		class="px-2"
	>
		<v-card-title class="order-heading">
			Think food think foodswipe
		</v-card-title>
		<v-card
			color="orange lighten-4"
			rounded
			max-width="820"
			class="mx-auto"
		>
			<v-row class="ma-0 pa-1"
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
					class="pa-2"
				>
					<v-text-field
						v-model="order.custom_contact"
						light
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
					class="d-flex justify-center pa-2"
				>
					<v-btn block
						color="#f36d00"
						height="50"
						dark
						:disabled="isDisabled"
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
			const started = await this.$store.dispatch("order/startOrder", this.order)
			if (started === true) {
				this.order = {
					custom_location: "",
					custom_contact: ""
				}
				this.isDisabled = true
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
}
</style>
