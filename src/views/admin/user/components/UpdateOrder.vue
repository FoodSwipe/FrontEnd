<template>
	<div>
		<v-fade-transition>
			<v-card
				dark
			>
				<v-overlay :value="overlay">
					<v-progress-circular
						indeterminate
						size="64"
					/>
				</v-overlay>
				<v-toolbar v-if="order">
					<v-app-bar-nav-icon>
						<v-avatar tile>
							<v-icon>receipt</v-icon>
						</v-avatar>
					</v-app-bar-nav-icon>
					<v-toolbar-title>
						#{{ order.id }}
					</v-toolbar-title>
					<v-spacer />
					<order-k-o-t-menu :order-id="order.id"
						:done-from-customer="order.done_from_customer"
						@refresh="initialize"
					/>
					<v-tooltip bottom>
						<template #activator="{on, attrs}">
							<v-btn icon
								color="orange"
								v-bind="attrs"
								:disabled="order.delivery_started || !order.done_from_customer"
								@click="startDelivery()"
								v-on="on"
							>
								<v-icon size="35">
									two_wheeler
								</v-icon>
							</v-btn>
						</template>
						<span>Start Delivery</span>
					</v-tooltip>
					<v-tooltip bottom>
						<template #activator="{on, attrs}">
							<v-btn icon
								color="green"
								:disabled="order.is_delivered || !order.delivery_started"
								v-bind="attrs"
								@click.prevent="completeDelivery()"
								v-on="on"
							>
								<v-icon>check</v-icon>
							</v-btn>
						</template>
						<span>Complete Order</span>
					</v-tooltip>
					<v-btn icon
						:disabled="!order.delivery_started || !order.is_delivered"
						color="purple lighten-2"
						@click="generateOrderBillPDF()"
					>
						<v-icon>print</v-icon>
					</v-btn>
					<v-btn
						icon
						color="error"
						:disabled="order.delivery_started"
						@click="deleteOrder"
					>
						<v-icon>delete</v-icon>
					</v-btn>
					<template #extension>
						<v-row class="ma-0"
							no-gutters
						>
							<div class="subtitle-2">
								<v-icon small>
									account_circle
								</v-icon>
								<span class="pl-2">{{ order.created_by.username }}</span>
								<span class="px-1"><v-icon small>today</v-icon></span>
								<span class="px-1">{{ $helper.onlyDate(order.created_at) }}</span>
								<span class="px-1"><v-icon small>history</v-icon></span>
								<span class="px-1">{{ $helper.onlyTime(order.created_at) }}</span>
							</div>
						</v-row>
					</template>
				</v-toolbar>
				<v-row v-if="order" class="ma-0 pa-0"
					no-gutters
				>
					<v-col cols="12">
						<v-data-table
							:headers="headers"
							:search="searchOrderItems"
							:items="order['cart_items']"
							sort-by="calories"
							hide-default-footer
						>
							<template #top>
								<v-toolbar
									flat
									height="auto"
								>
									<template #default>
										<v-row class="ma-0 pa-0 pb-2"
											align="center"
											no-gutters
										>
											<v-col cols="12"
												xl="4"
												lg="4"
												md="4"
												sm="4"
											>
												<v-text-field
													id="search-user"
													v-model="searchOrderItems"
													solo
													clearable
													hide-details
													prepend-inner-icon="search"
													placeholder="Search order items"
													:class="($vuetify.breakpoint.width < 600) ? 'mb-2' : ''"
												/>
											</v-col>
											<v-fade-transition>
												<v-col
													v-if="$vuetify.breakpoint.width > 600"
													cols="1"
													class="d-flex justify-center"
												>
													<div class="divider-search-inset" />
												</v-col>
											</v-fade-transition>
											<v-col cols="12"
												xl="7"
												lg="7"
												md="7"
												sm="7"
											>
												<v-autocomplete
													v-model="selectedItems"
													:disabled="order.delivery_started"
													:items="orderNowRefinedList"
													solo chips
													color="blue-grey lighten-2"
													item-text="name"
													item-value="id"
													multiple clearable
													deletable-chips
													placeholder="Add menu items in this order (*)"
												>
													<template #no-data>
														<div class="pa-2">
															No <code>menu items</code> available
														</div>
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
															<v-list-item-content style="color: white">
																{{ data.item }}
															</v-list-item-content>
														</template>
														<template v-else>
															<v-list-item-avatar>
																<v-img :src="data.item.avatar" />
															</v-list-item-avatar>
															<v-list-item-content>
																<v-list-item-title>{{ data.item.name }}</v-list-item-title>
																<v-list-item-subtitle style="color: white;">
																	<span class="number-font">Rs {{ data.item.price }}</span>
																</v-list-item-subtitle>
															</v-list-item-content>
															<v-list-item-action-text class="align-center">
																<v-text-field
																	v-model="selectedItemQuantity[data.item.id]"
																	solo
																	type="number"
																	hide-details
																	dark
																/>
															</v-list-item-action-text>
														</template>
													</template>
													<template #append>
														<v-btn
															:disabled="order.delivery_started"
															:loading="adding"
															icon dark
															@click="addSelectedItemsToOrderCart()"
														>
															<v-icon>
																add
															</v-icon>
														</v-btn>
													</template>
												</v-autocomplete>
											</v-col>
										</v-row>
									</template>
								</v-toolbar>
							</template>
							<!-- eslint-disable-next-line vue/valid-v-slot-->
							<template #item.subTotal="{ item }">
								{{ item.item.price * item.quantity }}
							</template>
							<!-- eslint-disable-next-line vue/valid-v-slot-->
							<template #item.actions="{ item }">
								<v-icon
									small
									class="mr-2"
									color="error"
									@click="removeItemFromOrderCart(item)"
								>
									close
								</v-icon>
							</template>
							<template #no-data>
								<v-btn
									color="primary"
									@click="initialize"
								>
									Reset
								</v-btn>
							</template>
							<!-- eslint-disable-next-line vue/valid-v-slot-->
							<template #item.quantity="props">
								<v-edit-dialog
									v-model:return-value="props.item.quantity"
									dark
									@save="updateQuantity(props.item)"
									@cancel="cancelQuantityUpdate"
								>
									{{ props.item.quantity }}
									<template #input>
										<v-text-field
											v-model="props.item.quantity"
											single-line
											type="number"
										/>
									</template>
								</v-edit-dialog>
							</template>
						</v-data-table>
						<v-divider />
					</v-col>
					<v-col cols="12">
						<v-list dark>
							<v-subheader>Summary</v-subheader>
							<v-row class="ma-0 pa-0"
								no-gutters
							>
								<v-col cols="12"
									xl="6"
									lg="6"
									md="6"
									sm="6"
									class="pa-2"
								>
									<v-list-item>
										<v-list-item-avatar>
											<v-avatar color="black"
												class="elevation-12"
											>
												<v-icon size="20">
													two_wheeler
												</v-icon>
											</v-avatar>
										</v-list-item-avatar>
										<v-list-item-content>
											<v-list-item-title>{{ (order.delivery_started_at === null) ? 'Not started yet': order.delivery_started_at }}</v-list-item-title>
											<v-list-item-subtitle>Delivery started at</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-col>
								<v-col cols="12"
									xl="6"
									lg="6"
									md="6"
									sm="6"
									class="pa-2"
								>
									<v-list-item>
										<v-list-item-avatar>
											<v-avatar color="black"
												class="elevation-12"
											>
												<v-icon size="20">
													done
												</v-icon>
											</v-avatar>
										</v-list-item-avatar>
										<v-list-item-content>
											<v-list-item-title>{{ (order.delivered_at === null) ? 'Not completed yet' : order.delivered_at }}</v-list-item-title>
											<v-list-item-subtitle>Order completed at</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-col>
								<v-col cols="12"
									class="pa-2"
								>
									<v-text-field
										v-model="order.custom_location"
										filled
										clearable
										hide-details="auto"
										:disabled="order.delivery_started"
										label="Delivery Location"
										prepend-inner-icon="explore"
										:error-messages="orderFormError.custom_location"
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
										v-model="order.delivery_charge"
										filled
										type="number"
										hide-details="auto"
										label="Delivery Charge"
										prepend-inner-icon="money"
										:disabled="order.delivery_started"
										:error-messages="orderFormError.delivery_charge"
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
										v-model="order.loyalty_discount"
										filled
										type="number"
										hide-details="auto"
										label="Loyalty Discount (%)"
										:disabled="order.delivery_started"
										prepend-inner-icon="emoji_symbols"
										:error-messages="orderFormError.loyalty_discount"
									/>
								</v-col>
								<v-col v-for="(orderSummaryItem, index) in orderSummaryItems()"
									:key="index"
									cols="12"
									xl="4"
									lg="4"
									md="4"
									sm="4"
								>
									<v-list-item :class="orderSummaryItem.class">
										<v-list-item-avatar>
											<v-avatar color="black"
												class="elevation-12"
											>
												<v-icon size="20">
													{{ orderSummaryItem.icon }}
												</v-icon>
											</v-avatar>
										</v-list-item-avatar>
										<v-list-item-content>
											<v-list-item-title>
												{{ orderSummaryItem.value }}
											</v-list-item-title>
											<v-list-item-subtitle>
												{{ orderSummaryItem.field }}
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-col>
							</v-row>
						</v-list>
					</v-col>
					<v-col cols="12">
						<v-btn
							:disabled="order.delivery_started"
							:loading="updating"
							block large
							class="rounded-b rounded-t-0"
							@click="updateOrder"
						>
							<v-icon>save</v-icon><span class="pl-2">Update Order</span>
						</v-btn>
					</v-col>
				</v-row>
			</v-card>
		</v-fade-transition>
	</div>
</template>
<script>
import jsPDF from "jspdf"
import "jspdf-autotable"
import { mapGetters } from "vuex"
import Snack from "@/mixin/Snack"

export default {
	name: "UpdateUserOrderByAdminComponent",
	components: {
		OrderKOTMenu: () => import("@/views/admin/components/OrderKOTMenu")
	},
	mixins: [Snack],
	data: () => ({
		adding: false,
		overlay: false,
		updating: false,
		searchOrderItems: "",
		selectedItems: [],
		selectedItemQuantity: {},
		orderNowRefinedList: [],
		headers: [
			{ text: "Actions", value: "actions", sortable: false, align: "center" },
			{ text: "Menu Item", value: "item.name", align: "start"},
			{ text: "Quantity", value: "quantity" },
			{ text: "Sub Total (NRs)", value: "subTotal" },
		],
		doc: null,
		order: null,
	}),
	computed: {
		...mapGetters({
			orderList: "order/detailOrder",
			orderNowList: "menuItem/allMenuItems",
			orderFormError: "order/orderFormFieldErrors"
		}),
		orderDetailBreadCrumbs() {
			return [
				{
					text: "> Home",
					href: "/admin/home",
				},
				{
					text: "Orders",
					href: "/admin/order",
				},
				{
					text: this.$route.params.id,
				}
			]
		},
		document() {
			let particulars = []
			this.order.cart_items.forEach(item => {
				particulars.push({
					id: item.item.id,
					particular: item.item.name,
					quantity: item.quantity,
					rate: item.item.price,
					amount: parseInt(item.item.price) * parseInt(item.quantity)
				})
			})
			return {
				heading: "Food Swipe and Online Market Company Pvt. Ltd.",
				location: "New-road, Pokhara",
				billID: "#" + this.order.id,
				transactionTimestamp: this.order.created_at,
				invoiceDate: this.order.delivered_at,
				paymentMode: this.order.payment_type,
				items: particulars,
				tel: "+9779841xxxxxx/+9779813xxxxxx",
				counter: "TELLER 1 (" + this.order.delivered_at + ")",
				cashier: this.$helper.getCurrentUser().username,
				netAmount: this.order.total_price,
				grandTotal: this.order.grandTotal,
				deliveryCharge: this.order.delivery_charge,
				loyaltyDiscount: this.order.loyalty_discount,
				totalNoOfQuantities: this.order.total_items,
				orderCreator: this.order.custom_contact
			}
		},
	},
	watch: {
		orderList(value) {
			this.initialize()
		}
	},
	async created() {
		this.$bus.on("load-order", this.initialize)
		await this.initialize()
	},
	beforeUnmount() {
		this.$bus.off("load-order", this.initialize)
	},
	methods: {
		async fetchOrder({ id: id }) {
			await this.$store.dispatch("order/withCartItems", {id: id})
		},
		async initialize() {
			this.overlay = true
			this.order = this.orderList
			const cartVsOrderDiff = this.$helper.removeCartedItemsDuplicationFromOrderNowList(
				this.orderNowList,
				this.order["cart_items"]
			)
			this.orderNowRefinedList = this.$helper.refineOrderNowList(cartVsOrderDiff)
			this.overlay = false
		},
		async completeDelivery() {
			this.order.order_completed = false
			const reaction = confirm("Are you sure the order is delivered? You will not be able to modify" +
				" this order further after setting it to done.");
			if (reaction === true) {
				this.overlay = true
				const patched = await this.$store.dispatch("order/patch", {
					id: this.order.id,
					body: {
						is_delivered: true
					}
				})
				this.overlay = false
				if (patched === true) {
					await this.openSnack("Order completed successfully.", "success")
					await this.fetchOrder({
						id: this.order.id
					})
				} else await this.openSnack("Internal server error. Please try again.")
			}
		},
		async startDelivery() {
			const reaction = confirm(`Are you sure to start delivery for order #${this.order.id}?`);
			if (reaction === true) {
				this.overlay = true
				const patched = await this.$store.dispatch("order/patch", {
					id: this.order.id,
					body: {
						delivery_started: true
					}
				})
				this.overlay = false
				if (patched === true) {
					await this.openSnack("Order updated successfully.", "success")
					await this.fetchOrder({
						id: this.order.id
					})
				} else await this.openSnack("Internal server error. Please try again.")
			}
		},
		generateOrderBillPDF() {
			this.overlay = true
			const columns = [
				{title: "ID", dataKey: "id"},
				{title: "Particulars", dataKey: "particular"},
				{title: "Qty", dataKey: "quantity"},
				{title: "Rate", dataKey: "rate"},
				{title: "Amount", dataKey: "amount"}
			]
			this.doc = new jsPDF({
				orientation: "portrait",
				uint: "in",
				format: "dl",
			})
			this.doc
				.setFontSize(12)
				.text(
					this.document.heading,
					8,
					7,
				)
			this.doc
				.setFontSize(10)
				.text(
					this.document.location,
					38,
					11,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Bill ID: " + this.document.billID,
					5,
					15+2,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Transaction Date: " + this.document.transactionTimestamp,
					5,
					20+2,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Invoice Date: " + this.document.invoiceDate,
					5,
					25+2,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Payment Mode: " + this.document.paymentMode,
					5,
					30+2,
				)
			this.doc.autoTable({
				columns,
				styles: {
					fillColor: [128, 128, 128],
					cellPadding: 1.6,
					fontSize: 8,
					cellWidth: 20
				},
				body: this.document.items,
				margin: {left: 5, top: 37},
				tableWidth: "wrap",
			})
			this.doc
				.setFontSize(10)
				.text(
					"Net Amount: " + this.document.netAmount,
					5,
					this.doc.lastAutoTable.finalY + 9,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Tender: 300",
					5,
					this.doc.lastAutoTable.finalY + 13,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Change: 45",
					5,
					this.doc.lastAutoTable.finalY + 18,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Total Qty: " + this.document.totalNoOfQuantities,
					5,
					this.doc.lastAutoTable.finalY + 23,
				)

			this.doc
				.setFontSize(10)
				.text(
					"Customer: " + this.document.orderCreator,
					105,
					this.doc.lastAutoTable.finalY + 9,
					{"align": "right"}
				)
			this.doc
				.setFontSize(10)
				.text(
					"Delivery Charge: NRs 80.00",
					105,
					this.doc.lastAutoTable.finalY + 13,
					{"align": "right"}
				)
			this.doc
				.setFontSize(10)
				.text(
					"Loyalty Discount: 5%",
					105,
					this.doc.lastAutoTable.finalY + 18,
					{"align": "right"}
				)

			this.doc
				.setFontSize(10)
				.text(
					"Tel: " + this.document.tel,
					5,
					this.doc.lastAutoTable.finalY + 34,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Counter: " + this.document.counter,
					5,
					this.doc.lastAutoTable.finalY + 38,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Cashier: " + this.document.cashier,
					5,
					this.doc.lastAutoTable.finalY + 42,
				)
			this.doc.save(`order-${this.order.id}.pdf`)
			this.doc.autoPrint()
			this.$store.dispatch("snack/setSnackState", true)
			this.$store.dispatch("snack/setSnackColor", "success")
			this.$store.dispatch("snack/setSnackText", "Vat bill for #" + this.order.id + " downloaded successfully.")
			this.overlay = false
		},
		orderSummaryItems() {
			const order = this.order
			const summary = this.$helper.getCartSummary(
				order,
				this.order.cart_items,
				this.order.delivery_charge,
				this.order.loyalty_discount
			)

			return [
				{class: "total-items", field: "Total Items", value: summary.totalItems, icon: "casino"},
				{class: "sub-total", field: "Sub Total (NRs)", value: summary.totalPrice, icon: "shopping_cart"},
				{class: "loyalty-discount", field: "Loyalty Discount (%)", value: summary.loyaltyDiscount, icon: "redeem"},
				{class: "delivery-charge", field: "Delivery Charge (NRs)", value: summary.deliveryCharge, icon: "local_shipping"},
				{class: "grand-total", field: "Grand Total (NRs)", value: summary.grandTotal, icon: "text_fields"}
			]
		},
		async removeItemFromOrderCart(orderMenuItem) {
			const reaction = confirm(`Are you sure you want to remove "${orderMenuItem.item.name}" from this order cart?`);
			if (reaction === true) {
				const removed = await this.$store.dispatch("cart/removeFromCart", {
					id: orderMenuItem.id
				})
				if (removed) {
					await this.openSnack(orderMenuItem.item.name + " removed from cart.", "success")
					await this.fetchOrder({id: this.order.id})
				} else await this.openSnack("Internal server error. Try again.")
			}
		},
		removeItemFromSelectedOrderInput(item) {
			const index = this.selectedItems.indexOf(item.id)
			if (index >= 0) this.selectedItems.splice(index, 1)
		},
		async updateQuantity(item) {
			if (this.order.is_delivered) return
			this.overlay = true
			if(this.order.is_delivered) return
			const patched = await this.$store.dispatch("cart/adminUpdateCartItemQuantity", {
				cartId: item.id,
				body: {
					quantity: item.quantity
				}
			})
			if (patched === 500) {
				await this.openSnack("Internal Server Error.")
			} else {
				if (typeof(patched) === "string") {
					await this.openSnack(patched, "success")
					this.$bus.emit("refresh-kot-menu")
				} else {
					await this.openSnack(patched.quantity[0])
				}
			}
			await this.fetchOrder({
				id: this.order.id
			})
		},
		cancelQuantityUpdate() {},
		async addSelectedItemsToOrderCart() {
			let addedToCart = false
			if (this.selectedItems.length === 0) return
			this.adding = true
			for (const itemID of this.selectedItems) {
				addedToCart = await this.$store.dispatch("cart/addToCart", {
					order: this.order.id,
					item: itemID,
					quantity: (this.selectedItemQuantity[itemID]) ? parseInt(this.selectedItemQuantity[itemID]) : 1
				})
				if (addedToCart !== true) await this.openSnack(addedToCart)
			}
			if (addedToCart) {
				await this.openSnack("Selected items added to cart.", "success")
				await this.fetchOrder({id: this.order.id})
				this.selectedItems = []
			}
			this.adding = false
		},
		async deleteOrder() {
			this.overlay = true
			const deleted = await this.$store.dispatch("order/delete", {id: this.order.id})
			this.overlay = false
			if(deleted) {
				await this.openSnack("Order deleted successfully")
				await this.$router.push("/admin/order")
			} else await this.openSnack("Order deleted failed. Try again.", "error")
		},
		/**
		 * update delivery location, delivery charge and loyalty discount
		 */
		async updateOrder() {
			this.updating = true
			const patched = await this.$store.dispatch("order/patch", {
				id: this.order.id,
				body: {
					custom_location: this.order.custom_location,
					delivery_charge: this.order.delivery_charge,
					loyalty_discount: this.order.loyalty_discount,
				}
			})
			this.updating = false
			if (patched === true) {
				await this.openSnack("Order updated successfully.", "success")
				await this.$store.dispatch("order/clearFormErrors")
			} else if (patched === 500) {
				await this.openSnack("Internal Server Error.")
			}
		}
	}
}
</script>
<style scoped lang="scss">
::v-deep.v-toolbar__content {
	padding: 4px 0 !important;
}
.divider-search-inset {
	height: 40px;
	width: 2px;
	background: #4a4a4a;
	border-radius: 10px;
}
::v-deep.v-autocomplete:not(.v-input--is-focused).v-select--chips input {
	max-height: 25px;
}
.grand-total {
	.v-list-item__title {
		font-size: 1.4rem;
	}
}
.loyalty-discount {
	.v-list-item__title {
		font-size: 1.4rem;
		color: goldenrod;
	}
	.v-list-item__subtitle {
		color: white;
	}
}
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
.breadcrumb-item:hover {
	background-color: #313131;
	color: #aaaaaa;
	border-radius: 4px;
}
</style>
