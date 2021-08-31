<template>
	<v-row justify="center">
		<v-dialog
			v-model="dialog"
			:loading="isLoading"
			hide-overlay
			transition="dialog-bottom-transition"
			dark
			scrollable
			max-width="600"
		>
			<v-card>
				<v-toolbar
					dark
					flat
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
				<v-card-text flat
					class="mx-auto pa-4"
					max-width="1000"
				>
					<v-row class="ma-0 pa-0"
						justify="center" align="center"
					>
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

								class="user-contact"
								:items="userProfileList"
								:loading="isLoadingAutocomplete"
								color="orange"
								outlined
								item-text="contact"
								item-value="contact"
								label="Contact"
								prepend-inner-icon="phone"
								attach=""
								hide-details="auto"
								small-chips
								deletable-chips
								clearable
								:multiple="false"
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
						<v-col
							cols="12"
							xl="6"
							lg="6"
							md="6"
							sm="6"
						>
							<v-text-field
								id="custom-location"
								v-model="order.custom_location"
								color="orange"
								label="Location (*)"
								outlined
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
								color="orange"
								label="Email address"
								outlined
								clearable
								type="email"
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
								color="orange"
								type="number"
								label="Loyalty Discount"
								outlined
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
								color="orange"
								label="Delivery Charge"
								outlined
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
							<v-checkbox v-model="order.done_from_customer"
								hide-details="auto" label="Done from customer?"
								readonly color="orange"
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
								outlined
								readonly clearable
								color="orange"
								:error-messages="orderFormErrors.payment_type"
							/>
						</v-col>
					</v-row>
				</v-card-text>
				<v-divider />
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
						:loading="saving"
						color="blue lighten-5"
						class="blue--text"
						depressed
						@click.stop="saveOrder"
					>
						Save
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>
<script>
import { mapGetters } from "vuex"
import router from "@/router"
import Snack from "@/mixin/Snack"

export default {
	name: "StartOrderByAdminFormDialog",
	mixins: [Snack],
	data: () => ({
		isLoading: false,
		saving: false,
		isLoadingAutocomplete: false,
		dialog: false,
		isUpdating: false,
		selectedItems: [],
		selectedItemQuantity: {},
		orderNowRefinedList: [],
		search: null,
		order: {
			custom_contact: null,
			custom_location: null,
			delivery_charge: 100,
			loyalty_discount: 0,
			payment_type: "Cash",
			done_from_customer: true
		},
		contactFormErrorMsg: [],
		forUser: false,
		setUser: null,
	}),
	computed: {
		...mapGetters({
			menuItemsList: "menuItem/allMenuItems",
			userProfileList: "user/profileContactList",
			lastCreatedOrderId: "order/lastCreatedOrderID",
			orderFormErrors: "order/orderFormFieldErrors"
		})
	},
	watch: {
		selectedItemQuantity(val) {
			console.log(val)
		}
	},
	async created() {
		this.$bus.on("start-order-admin", this.initialize)
		this.$bus.on("start-order-admin-for-user", this.initializeForUser)
	},
	beforeUnmount() {
		this.$bus.on("start-order-admin", this.initialize)
		this.$bus.off("start-order-admin-for-user", this.initializeForUser)
	},
	methods: {
		getMenuItmNameById(id) {
			const menuItem = this.menuItemsList.find(menu => menu.id === id)
			return (menuItem) ? menuItem.name : null
		},
		async initialize() {
			this.isLoading = true
			this.dialog = true
			this.orderNowRefinedList = this.$helper.refineOrderNowList(this.menuItemsList)
			this.order.delivery_charge = this.$helper.getDeliveryCharge()
			await this.$store.dispatch("order/clearFormErrors")
			await this.$store.dispatch("user/fetchProfileContactList")
			this.isLoading = false
		},
		async initializeForUser(args) {
			this.isLoading = true
			this.dialog = true
			this.orderNowRefinedList = this.$helper.refineOrderNowList(this.menuItemsList)
			this.order.delivery_charge = this.$helper.getDeliveryCharge()
			await this.$store.dispatch("order/clearFormErrors")
			this.setUser = args.user
			this.order.custom_contact = args.user.profile.contact
			this.order.custom_location = args.user.profile.address
			this.order["custom_email"] = args.user.email
			this.forUser = true
			this.isLoading = false
		},
		closeDialog() {
			this.dialog = false
		},
		async saveOrder() {
			let addedToCart = false
			this.saving = true
			if(typeof this.order.custom_contact == "string") {
				this.contactFormErrorMsg = []
				// every thing is ok
			} else if (typeof this.order.custom_contact == "object"){
				if (this.order.custom_contact === null) {
					this.contactFormErrorMsg.push("This field is required")
					this.saving = false
					return
				}
				this.contactFormErrorMsg = []
				this.order.custom_contact = this.order.custom_contact.contact;
			}
			const orderStarted = await this.$store.dispatch("order/create", this.order)
			if (orderStarted === true) {
				await this.openSnack("Order placed successfully.", "success")
				this.closeDialog()
				await router.push("/admin/order/" + this.lastCreatedOrderId)
			} else if(orderStarted === 500) {
				await this.openSnack("Internal server error. Please try again.")
			} else if(orderStarted === false) {
				if (Array.isArray(this.orderFormErrors.custom_contact)) {
					this.contactFormErrorMsg = this.orderFormErrors.custom_contact[0]
				} else {
					this.contactFormErrorMsg = []
				}
				await this.openSnack("Please load a valid form and try again.")
				this.saving = false
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
		background-color: #1e1e1e;
		margin-top: 0;
		padding: 15px 14px;
		border: 1px solid #545454 !important;
		border-radius: 4px;
		&:hover {
			border: 1.2px solid white !important;
		}
	}
}
</style>
<style scoped lang="scss">
.v-menu__content {
	.v-select-list {
		background: #443a3a !important;
		::v-deep.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
			color: white !important;
		}
		::v-deep.v-subheader {
			color: white;
		}
	}
}
</style>
