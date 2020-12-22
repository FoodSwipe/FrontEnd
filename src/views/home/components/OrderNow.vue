<template>
	<div class="pa-4">
		<v-card
			color="brown lighten-4"
			max-width="100vw"
			class="mx-auto pa-2 order-now-card"
		>
			<v-row class="ma-0 pa-0"
				justify="center"
				align="center"
			>
				<v-col cols="12"
					class="pa-1"
					xl="4"
					lg="4"
					md="12"
					sm="12"
				>
					<v-autocomplete
						v-model="selectedItems"
						:disabled="isUpdating"
						:items="orderNowRefinedList"
						filled
						chips
						deletable-chips
						color="orange darken-4"
						placeholder="Select menu items (*)"
						item-text="name"
						item-value="id"
						item-color="orange darken-2"
						multiple
						prepend-inner-icon="emoji_food_beverage"
						hide-details="auto"
						attach=""
						clearable
						hint="Order as much as you can, service guaranteed!"
						:open-on-clear="false"
						:error-messages="itemsFieldRequiredErrorMessage"
					>
						<template #selection="data">
							<v-chip
								v-bind="data.attrs"
								:input-value="data.selected"
								close
								@click="data.select"
								@click:close="removeItemFromSelectedOrderInput(data.item)"
							>
								<v-avatar left>
									<v-img :src="data.item.avatar" />
								</v-avatar>
								{{ data.item.name }}
							</v-chip>
						</template>
						<template #item="data">
							<template v-if="typeof data.item !== 'object'">
								<v-list-item-content v-text="data.item" />
							</template>
							<template v-else>
								<v-list-item-avatar>
									<v-img :src="data.item.avatar" />
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title>{{ data.item.name }}"</v-list-item-title>
									<v-list-item-subtitle>{{ data.item.group }}"</v-list-item-subtitle>
								</v-list-item-content>
								<v-list-item-action-text>{{ data.item.price }}</v-list-item-action-text>
							</template>
						</template>
					</v-autocomplete>
				</v-col>
				<v-col cols="12"
					class="pa-1"
					xl="3"
					lg="3"
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
					xl="3"
					lg="3"
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
					xl="2"
					lg="2"
					md="12"
					sm="12"
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
						>start my order</span>
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
		selectedItems: [],
		order: {
			custom_location: "",
			custom_contact: ""
		},
		isUpdating: false,
		orderNowRefinedList: []
	}),
	computed: {
		...mapGetters({
			orderNowList: "menuItem/allMenuItems",
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
			await this.$store.dispatch("menuItem/fetchOrderNowList")
			this.isDisabled = (localStorage.getItem("cookingOrder") !== null)
			this.isUpdating = true
			this.orderNowRefinedList = refineOrderNowList(this.orderNowList)
			this.isUpdating = false
		},
		preFillForm() {
			if(this.$helper.isAuthenticated()) {
				const currentUser = JSON.parse(localStorage.getItem("currentUser"))
				this.order = {
					custom_location: currentUser.profile.address,
					custom_contact: currentUser.profile.contact.replace(/\D/g, ""),
				}
			} else {
				this.order = {
					custom_location: "",
					custom_contact: ""
				}
			}
		},
		removeItemFromSelectedOrderInput(item) {
			const index = this.selectedItems.indexOf(item.id)
			if (index >= 0) this.selectedItems.splice(index, 1)
		},
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async startShopping() {
			if (this.selectedItems.length === 0) {
				this.itemsFieldRequiredErrorMessage = "This field is required."
				return
			}
			const started = await this.$store.dispatch("order/startOrder", this.order)
			if (started === true) {
				for (const itemId of this.selectedItems) {
					await this.$store.dispatch("cart/addToCart", {
						order: localStorage.getItem("cookingOrder"),
						item: itemId
					})
				}
				this.$bus.emit("set-cart-count", this.selectedItems.length)
				this.selectedItems = []
				this.order = {
					custom_location: "",
					custom_contact: ""
				}
				this.isDisabled = true
				await this.openSnack("Cheers! Selected items has been added to cart.", "success")
				await router.push({"name": "Cart"})
			} else if (started === 500) {
				await this.openSnack("Internal Server Error.")
			} else if (started === false) {
				await this.openSnack("Please load a valid form.")
			} else {
				await this.$store.dispatch("order/clearFormErrors")
				await this.openSnack(started[0])
				await this.$store.dispatch("order/withCartItems", {
					id: localStorage.getItem("cookingOrder")
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
