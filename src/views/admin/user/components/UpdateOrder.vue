<template>
	<v-card dark>
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
			<v-btn icon
				color="green"
				@click="generatePDF()"
			>
				<v-icon>print</v-icon>
			</v-btn>
			<v-btn icon
				color="error"
			>
				<v-icon>delete</v-icon>
			</v-btn>
		</v-toolbar>
		<v-row class="ma-0 pa-0"
			no-gutters
		>
			<v-col cols="12">
				<v-data-table
					:headers="headers"
					:search="searchOrderItems"
					:items="order.items"
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
											v-model="friends"
											dark
											:disabled="isUpdating"
											:items="people"
											filled
											chips
											color="blue darken-2"
											placeholder="Select menu item"
											item-text="name"
											item-value="name"
											multiple
											prepend-inner-icon="emoji_food_beverage"
											hide-details="auto"
											attach=""
											clearable
										>
											<template #selection="data">
												<v-chip
													dark
													v-bind="data.attrs"
													:input-value="data.selected"
													close
													@click="data.select"
													@click:close="removeItemFromAutoComplete(data.item)"
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
														<v-list-item-title>{{ data.item.name }}</v-list-item-title>
														<v-list-item-subtitle>{{ data.item.group }}</v-list-item-subtitle>
													</v-list-item-content>
												</template>
											</template>
										</v-autocomplete>
									</v-col>
								</v-row>
							</template>
						</v-toolbar>
					</template>
					<!-- eslint-disable-next-line vue/valid-v-slot-->
					<template #item.name="{ item }">
						{{ item.name }}
					</template>
					<!-- eslint-disable-next-line vue/valid-v-slot-->
					<template #item.subTotal="{ item }">
						{{ getPriceOfItem(item.name) * item. quantity }}
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
							@save="updateQuantity"
							@cancel="cancelQuantityUpdate"
							@open="openUpdateQuantityEditDialog"
							@close="closeUpdateQuantityEditDialog"
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
							class="pa-2"
						>
							<v-text-field
								v-model="order.location"
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
			<v-col cols="12">
				<v-btn block
					large
				>
					<v-icon>save</v-icon><span class="pl-2">Update Order</span>
				</v-btn>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
import helper from "@/Helper"
import jsPDF from "jspdf"
import "jspdf-autotable"

export default {
	name: "UpdateUserOrderByAdminComponent",
	data: () => ({
		overlay: false,
		searchOrderItems: "",
		isUpdating: false,
		headers: [
			{ text: "Actions", value: "actions", sortable: false, align: "center" },
			{ text: "Menu Item", value: "name", align: "start"},
			{ text: "Quantity", value: "quantity" },
			{ text: "Sub Total (NRs)", value: "subTotal" },
		],
		order: {
			id: 55896,
			items: [
				{id: 5, name: "Veg Momo", quantity: 1},
				{id: 6, name: "Buff Momo", quantity: 2},
				{id: 7, name: "Chicken Chowmein", quantity: 3},
			],
			delivery_charge: 150,
			loyalty_discount: 15,
			location: "Lorem, ipsum - 16 Sed"
		},
		friends: [],
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
		}
	}),
	computed: {
		people() {
			return helper.returnMockMenuItems()
		},
		srcs() {
			return helper.returnMockSrcs()
		}
	},
	methods: {
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
				// headStyles: {
				// 	fillColor: [],
				// },
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
		getPriceOfItem(item) {
			const priceMenu = {
				"Veg Momo": 100,
				"Buff Momo": 200,
				"Chicken Chowmein": 150,
			}
			return priceMenu[item]
		},
		orderSummaryItems() {
			return [
				{class: "total-items", field: "Total Items", value: 6, icon: "casino"},
				{class: "sub-total", field: "Sub Total (NRs)", value: 1500, icon: "shopping_cart"},
				{class: "loyalty-discount", field: "Loyalty Discount (%)", value: this.order.loyalty_discount, icon: "redeem"},
				{class: "delivery-charge", field: "Delivery Charge (NRs)", value: this.order.delivery_charge, icon: "local_shipping"},
				{class: "grand-total", field: "Grand Total (NRs)", value: 1400, icon: "text_fields"}
			]
		},
		removeItemFromOrderCart(orderMenuItem) {
			const index = this.order.items.indexOf(orderMenuItem)
			this.order.items.splice(index, 1)
			this.$store.dispatch("snack/setSnackState", true)
			this.$store.dispatch("snack/setSnackColor", "error")
			this.$store.dispatch("snack/setSnackText", orderMenuItem.name + " removed from cart.")
		},
		removeItemFromAutoComplete(item) {
			const index = this.friends.indexOf(item.name)
			if (index >= 0) this.friends.splice(index, 1)
		},
		updateQuantity() {
			this.snack = true
			this.snackColor = "success"
			this.snackText = "Quantity updated successfully."
		},
		cancelQuantityUpdate() {
			this.snack = true
			this.snackColor = "error"
			this.snackText = "Quantity update aborted."
		},
		openUpdateQuantityEditDialog() {

		},
		closeUpdateQuantityEditDialog() {

		},
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
