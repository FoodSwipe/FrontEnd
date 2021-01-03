<template>
	<div class="pa-4 order-now-wrapper">
		<v-card
			color="brown lighten-4"
			max-width="820"
			class="mx-auto order-now-card pa-0"
		>
			<span class="top-test" />
			<div class="custom-shape-divider-top-1609674495">
				<svg data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
					preserveAspectRatio="none"
				>
					<path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
						opacity=".25" class="shape-fill"
					/>
					<path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
						opacity=".5" class="shape-fill"
					/>
					<path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
						class="shape-fill"
					/>
				</svg>
			</div>
			<v-row class="ma-0 pa-1"
				justify="center"
				align="center"
			>
				<v-col cols="12"
					class="ma-0 pa-0"
				>
					<div class="text-center pa-2">
						<v-avatar size="120"
							tile
						>
							<v-img :src="logo" />
						</v-avatar>
					</div>
				</v-col>
				<v-col cols="12"
					class="pa-2"
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
					class="pa-2"
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
					class="d-flex justify-center pa-2"
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
		logo: require("@/assets/food_swipe_logo.png"),
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
.order-now-card {
	position: relative;

}
.order-now-wrapper {
	margin-top: -70px;
}
.custom-shape-divider-top-1609674495 {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
}

.custom-shape-divider-top-1609674495 svg {
	position: relative;
	display: block;
	width: calc(100% + 1.3px);
	height: 115px;
}

.custom-shape-divider-top-1609674495 .shape-fill {
	fill: #b8afac;
}
</style>
