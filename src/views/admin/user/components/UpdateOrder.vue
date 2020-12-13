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
		<v-row>
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
							<v-spacer />
							<v-divider
								inset
								vertical
								class="mx-4"
							/>
							<v-btn
								dark
								color="primary"
								@click="openAddItemDialog"
							>
								<v-icon
									dark
									:class="$vuetify.breakpoint.smAndUp ? 'mr-2' : ''"
								>
									add_circle
								</v-icon>
								<span v-if="$vuetify.breakpoint.smAndUp">Add Items</span>
							</v-btn>
						</v-toolbar>
					</template>
					<!-- eslint-disable-next-line vue/valid-v-slot-->
					<template #item.name="{ item }">
						{{ item.menu_item.name }}
					</template>
					<!-- eslint-disable-next-line vue/valid-v-slot-->
					<template #item.subTotal="{ item }">
						{{ item.menu_item.price * item. quantity }}
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
			</v-col>
		</v-row>
		<v-divider />
		<v-snackbar
			v-model="updateOrderSnack"
			:timeout="3000"
			:color="snackColor"
		>
			{{ snackText }}

			<template #action="{ attrs }">
				<v-btn
					v-bind="attrs"
					text
					@click="snack = false"
				>
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</v-card>
</template>
<script>
export default {
	name: "UpdateUserOrderByAdminComponent",
	data: () => ({
		searchOrderItems: "",
		addItemDialog: false,
		updateOrderSnack: false,
		snackColor: "",
		snackText: "",
		headers: [
			{ text: "Actions", value: "actions", sortable: false, align: "center" },
			{ text: "Menu Item", value: "name", align: "start"},
			{ text: "Quantity", value: "quantity" },
			{ text: "Sub Total (NRs)", value: "subTotal" },
		],
		order: {
			id: 55896,
			items: [
				{id: 5, menu_item: { name: "Veg Momo", price: 150 }, quantity: 1},
				{id: 6, menu_item: { name: "Buff Momo", price: 150 }, quantity: 2},
				{id: 7, menu_item: { name: "Chicken Chowmein", price: 150 }, quantity: 3},
			]
		},
	}),
	methods: {
		removeItemFromOrderCart(orderMenuItem) {
			const index = this.order.items.indexOf(orderMenuItem)
			this.order.items.splice(index, 1)
		},
		openAddItemDialog() {
			this.addItemDialog = true
		},
		updateQuantity() {
			this.updateOrderSnack = true
			this.snackColor = "success"
			this.snackText = "Quantity updated successfully."
		},
		cancelQuantityUpdate() {
			this.updateOrderSnack = true
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
