<template>
	<v-card dark>
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
											dense
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
							persistent
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
							<v-list-item>
								<v-list-item-avatar>
									<v-avatar color="black"
										class="elevation-12"
									>
										{{ orderSummaryItem.field[0] }}
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

export default {
	name: "UpdateUserOrderByAdminComponent",
	data: () => ({
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
				{field: "Total Items", value: 6},
				{field: "Sub Total", value: 1500},
				{field: "Loyalty Discount (%)", value: this.order.loyalty_discount},
				{field: "Delivery Charge", value: this.order.delivery_charge},
				{field: "Grand Total", value: 1400}
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
</style>
