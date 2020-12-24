<template>
	<v-card v-if="order"
		dark
	>
		<v-overlay :value="overlay">
			<v-progress-circular
				indeterminate
				size="64"
			/>
		</v-overlay>
		<v-toolbar>
			<v-app-bar-nav-icon>
				<v-avatar tile>
					<v-icon>receipt</v-icon>
				</v-avatar>
			</v-app-bar-nav-icon>
			<v-toolbar-title>
				#{{ order.id }}
			</v-toolbar-title>
			<v-spacer />
			<v-tooltip bottom>
				<template #activator="{on, attrs}">
					<v-btn icon
						color="orange"
						v-bind="attrs"
						:disabled="order.delivery_started"
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
						:disabled="order.is_delivered"
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
				color="purple lighten-2"
				@click="generatePDF()"
			>
				<v-icon>print</v-icon>
			</v-btn>
			<v-btn icon
				color="error"
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
						<span class="px-1">{{ onlyDate(order.created_at) }}</span>
						<span class="px-1"><v-icon small>history</v-icon></span>
						<span class="px-1">{{ onlyTime(order.created_at) }}</span>
					</div>
				</v-row>
			</template>
		</v-toolbar>
		<v-row class="ma-0 pa-0"
			no-gutters
		>
			<v-col cols="12">
				<v-data-table
					:headers="headers"
					:search="searchOrderItems"
					:items="order.cart_items"
					sort-by="calories"
					class="elevation-1"
					hide-default-footer
				>
					<template #top>
						<v-toolbar
							flat
							height="auto"
						>
							<template #default>
								<v-row class="ma-0 pa-0"
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
											:disabled="isUpdating"
											:readonly="order.is_delivered"
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
											<template #append-outer>
												<v-avatar v-ripple
													size="22"
													color="orange"
													class="golden-rod-border-2 elevation-4"
													disabled
													@click="addSelectedItemsToOrderCart()"
												>
													<v-icon>
														add_circle
													</v-icon>
												</v-avatar>
											</template>
										</v-autocomplete>
									</v-col>
								</v-row>
							</template>
						</v-toolbar>
					</template>
					<!-- eslint-disable-next-line vue/valid-v-slot-->
					<template #item.name="{ item }">
						{{ item.item.name }}
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
								readonly
								filled
								label="Delivery Location"
								clearable
								prepend-inner-icon="explore"
								hide-details="auto"
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
								readonly
								filled
								label="Delivery Charge"
								type="number"
								prepend-inner-icon="money"
								hide-details="auto"
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
								readonly
								filled
								label="Loyalty Discount (%)"
								type="number"
								prepend-inner-icon="emoji_symbols"
								hide-details="auto"
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
			<v-col cols="12"
				class="pb-4"
			>
				<v-btn block
					large
					disabled
				>
					<v-icon>save</v-icon><span class="pl-2">Update Order</span>
				</v-btn>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
import jsPDF from "jspdf"
import "jspdf-autotable"
import { mapGetters } from "vuex"

export default {
	name: "UpdateUserOrderByAdminComponent",
	data: () => ({
		overlay: false,
		isLoading: false,
		searchOrderItems: "",
		isUpdating: false,
		selectedItems: [],
		orderNowRefinedList: [],
		headers: [
			{ text: "Actions", value: "actions", sortable: false, align: "center" },
			{ text: "Menu Item", value: "name", align: "start"},
			{ text: "Quantity", value: "quantity" },
			{ text: "Sub Total (NRs)", value: "subTotal" },
		],
		doc: null,
		document: {
			heading: "Food Swipe and Online Market Company Pvt. Ltd.",
			location: "New-road, Pokhara",
			vat: "2525252525",
			invoiceText: "ABBREVIATED TAX INVOICE",
			billID: "123-456-789",
			transactionTimestamp: "2020-12-02 05:30 PM",
			invoiceDate: "2020-12-02 05:30 PM",
			paymentMode: "Cash",
			items: [
				{ id: 555, particular: "Buff Chowmein", quantity: 2, rate: 500, amount: 1000 },
				{ id: 555, particular: "Chicken Momo", quantity: 2, rate: 500, amount: 1000 },
				{ id: 555, particular: "Old Durbar", quantity: 2, rate: 500, amount: 1000 },
				{ id: 555, particular: "Chicken Korma", quantity: 2, rate: 500, amount: 1000 },
			],
			tel: "9843530425/9856000000/9874000000",
			counter: "TELLER 1 (05:30:19 PM)",
			cashier: "Kiran Parajuli"
		},
		LOYALTY_DISCOUNT: 10,
		DELIVERY_START_PM: 17,
		DELIVERY_START_AM: 4,
		DELIVERY_CHARGE: 50,
		LOYALTY_STARTS_AT: 10000,
	}),
	computed: {
		...mapGetters({
			order: "order/detailOrder",
			orderNowList: "menuItem/allMenuItems",
		}),
	},
	async created() {
		await this.initialize()
	},
	methods: {
		onlyDate(value) {
			if (!value) return null
			return value.substr(0, value.indexOf(" "))
		},
		onlyTime(value) {
			if (!value) return null
			return value.substr(value.indexOf(" ")+1, value.length)
		},
		async initialize() {
			this.isLoading = true
			await this.$store.dispatch("order/withCartItems", {
				id: this.$route.params.id
			})
			this.loading = false
			this.isUpdating = true
			await this.$store.dispatch("menuItem/fetchOrderNowList")
			const cartVsOrderDiff = this.$helper.removeCartedItemsDuplicationFromOrderNowList(
				this.orderNowList,
				this.order.cart_items
			)
			this.orderNowRefinedList = this.$helper.refineOrderNowList(cartVsOrderDiff)
			this.isUpdating = false
		},
		async completeDelivery() {
			this.order.order_completed = false
			const reaction = confirm("Are you the order is delivered? You will not be able to modify" +
				" this order further after setting it to done.");
			if (reaction === true) {
				const patched = await this.$store.dispatch("order/patch", {
					id: this.order.id,
					body: {
						is_delivered: true
					}
				})
				if (patched === true) {
					await this.openSnack("Order completed successfully.", "success")
					await this.initialize()
				} else await this.openSnack("Internal server error. Please try again.")
			}
		},
		async startDelivery() {
			const reaction = confirm(`Are you sure to start delivery for order #${this.order.id}?`);
			if (reaction === true) {
				const patched = await this.$store.dispatch("order/patch", {
					id: this.order.id,
					body: {
						delivery_started: true
					}
				})
				if (patched === true) {
					await this.openSnack("Order updated successfully.", "success")
					await this.initialize()
				} else await this.openSnack("Internal server error. Please try again.")
			}
		},
		generatePDF() {
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
				format: "letter",
			})
			var img = require("@/assets/food_swipe_logo.png")
			this.doc.addImage(img, "png", 30,25,35,32)
			this.doc
				.setFontSize(14)
				.text(
					this.document.heading,
					60 + 5,
					29,
				)
			this.doc
				.setFontSize(10)
				.text(
					this.document.location,
					95 + 5,
					34,
				)
			this.doc
				.setFontSize(10)
				.text(
					"VAT No.: " + this.document.vat,
					92 + 5,
					38,
				)
			this.doc
				.setFontSize(10)
				.text(
					this.document.invoiceText,
					85 + 5,
					44,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Bill #: " + this.document.billID,
					70,
					50,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Transaction Date: " + this.document.transactionTimestamp,
					70,
					54,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Invoice Date: " + this.document.invoiceDate,
					70,
					58,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Payment Mode: " + this.document.paymentMode,
					70,
					62,
				)
			this.doc.autoTable({
				columns,
				styles: {
					fillColor: [128, 128, 128],
					cellPadding: 2.1,
					fontSize: 10,
					cellWidth: 31
				},
				body: this.document.items,
				margin: {left: 30, top: 66},
				tableWidth: "wrap",
			})
			this.doc
				.setFontSize(10)
				.text(
					"Net Amount: 255.00",
					110+30,
					this.doc.lastAutoTable.finalY + 7,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Tender: 300",
					110+30,
					this.doc.lastAutoTable.finalY + 13,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Change: 45",
					110+30,
					this.doc.lastAutoTable.finalY + 18,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Total Qty: 4",
					30,
					this.doc.lastAutoTable.finalY + 23,
				)

			this.doc
				.setFontSize(10)
				.text(
					"Customer: 9893000000",
					30,
					this.doc.lastAutoTable.finalY + 7,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Delivery Charge: NRs 80.00",
					30,
					this.doc.lastAutoTable.finalY + 13,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Loyalty Discount: 5%",
					30,
					this.doc.lastAutoTable.finalY + 18,
				)

			this.doc
				.setFontSize(10)
				.text(
					"Tel: " + this.document.tel,
					30,
					this.doc.lastAutoTable.finalY + 30+4,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Counter: " + this.document.counter,
					30,
					this.doc.lastAutoTable.finalY + 34+4,
				)
			this.doc
				.setFontSize(10)
				.text(
					"Cashier: " + this.document.cashier,
					30,
					this.doc.lastAutoTable.finalY + 38+4,
				)
			this.doc.save("hello.pdf")
			this.doc.autoPrint()
			this.$store.dispatch("snack/setSnackState", true)
			this.$store.dispatch("snack/setSnackColor", "success")
			this.$store.dispatch("snack/setSnackText", "Vat bill for #" + this.order.id + " downloaded successfully.")
			this.overlay = false
		},
		orderSummaryItems() {
			const order = this.order
			const summary = this.$helper.getCartSummary(order, this.order.cart_items)

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
					await this.initialize()
				} else await this.openSnack("Internal server error. Try again.")
			}
		},
		removeItemFromSelectedOrderInput(item) {
			const index = this.selectedItems.indexOf(item.id)
			if (index >= 0) this.selectedItems.splice(index, 1)
		},
		async updateQuantity(item) {
			const patched = await this.$store.dispatch("cart/patch", {
				id: item.id,
				body: {
					quantity: item.quantity
				}
			})
			if (patched === true) {
				await this.openSnack("Cart item quantity updated successfully.", "success")
			} else if (patched === 500) {
				await this.openSnack("Internal Server Error.")
			} else {
				await this.openSnack(patched.quantity[0])
			}
			await this.initialize()
		},
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		cancelQuantityUpdate() {
			// do nothing
		},
		async addSelectedItemsToOrderCart() {
			let addedToCart = false
			if (this.selectedItems.length === 0) return
			for (const itemID of this.selectedItems) {
				addedToCart = await this.$store.dispatch("cart/addToCart", {
					order: this.order.id,
					item: itemID
				})
				if (addedToCart!==true) await this.openSnack(addedToCart)
			}
			if (addedToCart) {
				await this.openSnack("Selected items added to cart.", "success")
				await this.initialize()
				this.selectedItems = []
			}
		}
	}
}
</script>
<style lang="scss" scoped>
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
</style>
