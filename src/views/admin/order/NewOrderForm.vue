<template>
	<v-row justify="center">
		<v-dialog
			v-model="dialog"
			:loading="isLoading"
			fullscreen
			hide-overlay
			transition="dialog-bottom-transition"
			dark
		>
			<v-card class="rounded-0">
				<v-toolbar
					dark
				>
					<v-btn
						icon
						dark
						@click="dialog = false"
					>
						<v-icon>close</v-icon>
					</v-btn>
					<v-toolbar-title>Start New Order</v-toolbar-title>
					<v-spacer />
					<v-toolbar-items>
						<v-btn
							dark
							text
							@click="saveOrder"
						>
							Save
						</v-btn>
					</v-toolbar-items>
				</v-toolbar>
				<v-card flat
					class="mt-4 mx-auto pa-4"
					max-width="1000"
				>
					<v-row class="ma-0 pa-0"
						justify="center" align="center"
					>
						<v-col cols="12"
							class="form-group-heading"
						>
							Menu Item Information
						</v-col>
						<v-col cols="12">
							<v-autocomplete
								id="menu-items"
								v-model="selectedItems"
								:disabled="isUpdating"
								:items="orderNowRefinedList"
								filled
								chips
								deletable-chips
								color="orange lighten-1"
								placeholder="Add menu items in this order (*)"
								item-text="name"
								item-value="id"
								item-color="orange darken-2"
								multiple
								prepend-inner-icon="emoji_food_beverage"
								hide-details="auto"
								clearable
							>
								<template #no-data>
									No <code>menu items</code> available
								</template>
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
										<v-list-item-content>
											<v-list-item-title>{{ data.item.name }}</v-list-item-title>
											<v-list-item-subtitle>{{ data.item.group }}</v-list-item-subtitle>
										</v-list-item-content>
										<v-list-item-action-text>{{ data.item.price }}</v-list-item-action-text>
									</template>
								</template>
							</v-autocomplete>
						</v-col>
						<v-col cols="12"
							class="form-group-heading"
						>
							Customer Information
						</v-col>
						<v-col cols="12"
							xl="6"
							lg="6"
							md="6"
							sm="6"
						>
							<v-combobox
								id="contact"
								v-model="order.custom_contact"
								dense
								class="user-contact"
								:items="userProfileList"
								:loading="isLoadingAutocomplete"
								color="orange"
								filled
								item-text="contact"
								item-value="contact"
								label="Contact"
								prepend-inner-icon="phone"
								attach=""
								hide-details="auto"
								small-chips
								deletable-chips
								clearable
								:error-messages="contactFormErrorMsg"
							>
								<template #no-data>
									<v-list-item>
										<v-list-item-content>
											<v-list-item-title>
												No matching results found. Press <kbd>enter</kbd> to create a new one.
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</template>
							</v-combobox>
						</v-col>
						<v-col cols="12"
							xl="6"
							lg="6"
							md="6"
							sm="6"
						>
							<v-text-field
								id="custom-location"
								v-model="order.custom_location"
								dense
								label="Location (*)"
								color="purple lighten-3"
								filled
								clearable
								prepend-inner-icon="title"
								hide-details="auto"
								:error-messages="orderFormErrors.custom_location"
							/>
						</v-col>
						<v-col cols="12">
							<v-text-field
								id="custom-email"
								v-model="order.custom_email"
								dense
								label="Email address"
								filled
								clearable
								prepend-inner-icon="email"
								hide-details="auto"
								:error-messages="orderFormErrors.custom_email"
							/>
						</v-col>
						<v-col cols="12"
							class="form-group-heading"
						>
							Business Information
						</v-col>
						<v-col cols="12">
							<v-text-field
								id="loyalty-discount"
								v-model="order.loyalty_discount"
								dense
								label="Loyalty Discount"
								filled
								clearable
								prepend-inner-icon="redeem"
								hide-details="auto"
								:error-messages="orderFormErrors.loyalty_discount"
							/>
						</v-col>
						<v-col cols="12">
							<v-text-field
								id="delivery-charge"
								v-model="order.delivery_charge"
								type="number"
								dense
								label="Delivery Charge"
								filled
								clearable
								prepend-inner-icon="local_shipping"
								hide-details="auto"
								:error-messages="orderFormErrors.delivery_charge"
							/>
						</v-col>
						<v-col cols="12"
							xl="6"
							lg="6"
							md="6"
							sm="6"
							class="checkbox-input-column"
						>
							<v-checkbox v-model="done_from_customer"
								hide-details="auto" label="Done from customer?"
								readonly
							/>
						</v-col>
						<v-col cols="12"
							xl="6"
							lg="6"
							md="6"
							sm="6"
						>
							<v-text-field v-model="order.payment_type"
								hide-details="auto" label="Payment Type"
								filled dense
								readonly clearable
								:error-messages="orderFormErrors.payment_type"
							/>
						</v-col>
					</v-row>
					<v-card-actions class="py-4">
						<v-spacer />
						<v-btn
							color="red lighten-5"
							class="red--text"
							depressed
							@click="closeDialog"
						>
							Cancel
						</v-btn>
						<v-btn
							color="blue lighten-5"
							class="blue--text"
							depressed
							@click.stop="saveOrder"
						>
							Save
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-card>
		</v-dialog>
	</v-row>
</template>
<script>
import { mapGetters } from "vuex"
import router from "@/router"

export default {
	name: "StartOrderByAdminFormDialog",
	data: () => ({
		isLoading: false,
		isLoadingAutocomplete: false,
		dialog: false,
		isUpdating: false,
		selectedItems: [],
		orderNowRefinedList: [],
		search: null,
		done_from_customer: true,
		order: {
			custom_contact: null,
			custom_location: null,
			delivery_charge: null,
			loyalty_discount: 0,
			payment_type: "Cash"
		},
		contactFormErrorMsg: [],
	}),
	computed: {
		...mapGetters({
			menuItemsList: "menuItem/allMenuItems",
			userProfileList: "user/profileContactList",
			lastCreatedOrderId: "order/lastCreatedOrderID",
			orderFormErrors: "order/orderFormFieldErrors"
		}),
	},
	async created() {
		this.$bus.on("start-order-admin", this.initialize)
	},
	beforeUnmount() {
		this.$bus.on("start-order-admin", this.initialize)
	},
	methods: {
		async initializeMenuItemAutocomplete() {
			this.isUpdating = true
			await this.$store.dispatch("menuItem/fetchOrderNowList")
			this.orderNowRefinedList = this.$helper.refineOrderNowList(this.menuItemsList)
			this.isUpdating = false
		},
		async initializeContactList() {
			this.isLoadingAutocomplete = true
			await this.$store.dispatch("user/fetchProfileContactList")
			this.isLoadingAutocomplete = false
		},
		async initialize() {
			this.isLoading = true
			this.order.delivery_charge = this.$helper.getDeliveryCharge()
			await this.initializeMenuItemAutocomplete()
			await this.initializeContactList()
			await this.$store.dispatch("order/clearFormErrors")
			this.isLoading = false
			this.dialog = true
		},
		closeDialog() {
			this.dialog = false
		},
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async saveOrder() {
			let addedToCart = false
			if(typeof this.order.custom_contact == "string") {
				this.contactFormErrorMsg = []
				// every thing is ok
			} else if (typeof this.order.custom_contact == "object"){
				if (this.order.custom_contact === null) {
					this.contactFormErrorMsg.push("This field is required")
					return
				}
				this.contactFormErrorMsg = []
				this.order.custom_contact = this.order.custom_contact.contact;
			}
			const orderStarted = await this.$store.dispatch("order/create", this.order)
			if (orderStarted === true) {
				if (this.selectedItems.length > 0) {
					for (const itemID of this.selectedItems) {
						addedToCart = await this.$store.dispatch("cart/addToCart", {
							order: this.lastCreatedOrderId,
							item: itemID
						})
						if (addedToCart === 500) {
							await this.openSnack("Internal server error. Please try again.")
							return
						} else if (addedToCart === false) {
							await this.openSnack("Please load a valid form and try again.")
							return
						}
					}
				}
				await this.openSnack("Order placed successfully.", "success")
				this.closeDialog()
				await router.push("/admin/order/"+this.lastCreatedOrderId)
			} else if(orderStarted === 500) {
				await this.openSnack("Internal server error. Please try again.")
			} else if(orderStarted === false) {
				if (Array.isArray(this.orderFormErrors.custom_contact)) {
					this.contactFormErrorMsg = this.orderFormErrors.custom_contact[0]
				} else {
					this.contactFormErrorMsg = []
				}
				await this.openSnack("Please load a valid form and try again.")
			}
		},
		removeItemFromSelectedOrderInput(item) {
			const index = this.selectedItems.indexOf(item.id)
			if (index >= 0) this.selectedItems.splice(index, 1)
		},
	}
}
</script>
<style scoped lang="scss">
.form-group-heading {
	font-weight: 500;
	background-color: rgba(86, 86, 86, 0.4);
	border-radius: 10px;
	margin: 10px 0 7px 0;
}
::v-deep.v-autocomplete:not(.v-input--is-focused).v-select--chips input {
	max-height: 25px;
}
th[role='columnheader'] span {
	font-weight: bold !important;
}
.user-contact {
	.v-menu__content {
		.v-select-list {
			background: #443a3a !important;
			::v-deep.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
				color: white !important;
			}
		}
	}
}
.checkbox-input-column {
	::v-deep.v-input--checkbox {
		background-color: rgb(255 255 255 / 8%);
		margin-top: 0;
		padding: 13px 12px;
		border-bottom: 1px solid rgb(156 155 150) !important;
		border-radius: 3px 3px 0 0;
		&:hover {
			background-color: #484848;
		}
	}
}
</style>