<template>
	<v-card flat
		class="rounded-0 mt-4" width="100%"
	>
		<v-snackbar
			v-model="snack"
			top
			right
			:timeout="3000"
			color="error"
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
		<v-row class="ma-0 pa-0">
			<v-scale-transition mode="out-in">
				<v-col
					v-if="$vuetify.breakpoint.smAndDown"
					cols="12"
					xl="4"
					lg="4"
					md="4"
				>
					<v-card>
						<v-card-title>Rs 15000</v-card-title>
						<v-card-subtitle>Grand Total</v-card-subtitle>
						<v-card-actions>
							<v-btn class="peach-gradient">
								Proceed
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-scale-transition>
			<v-col cols="12"
				xl="8"
				lg="8"
				md="8"
			>
				<v-data-table
					:headers="headers"
					:items="desserts"
					:search="search"
					hide-default-footer
				>
					<template #top>
						<v-toolbar
							flat
							color="transparent"
						>
							<v-avatar
								class="elevation-2"
								size="40"
							>
								<v-icon size="24">
									shopping_cart
								</v-icon>
							</v-avatar>
							<v-divider
								class="mx-4 search-cart"
								inset
								vertical
							/>
							<v-text-field
								v-model="search"
								class="search-cart"
								solo
								dense
								hide-details
								label="Search Cart Items"
								name="search"
								prepend-inner-icon="search"
								clearable
							/>
							<v-spacer />
							<v-divider
								class="mx-4 search-cart"
								inset
								vertical
							/>
							<v-btn
								dark
								color="primary"
								@click="1"
							>
								<v-icon
									dark
									:class="$vuetify.breakpoint.smAndUp ? 'mr-2' : ''"
								>
									add_circle
								</v-icon>
								<span v-if="$vuetify.breakpoint.smAndUp">Add Item</span>
							</v-btn>
						</v-toolbar>
					</template>
					<!-- eslint-disable-next-line vue/valid-v-slot-->
					<template #item.name="{item}">
						<p class="mb-0 py-2">
							{{ item.name }}
						</p>
						<p class="mb-0 pb-4">
							<v-img
								src="https://i.ndtvimg.com/i/2017-10/spicy-chicken-recipe_620x330_71508233435.jpg"
								max-width="200"
								min-width="50"
								max-height="200"
							/>
						</p>
					</template>
					<!-- eslint-disable-next-line vue/valid-v-slot-->
					<template #item.actions="{ item }">
						<v-btn icon>
							<v-icon
								color="error"
								@click="removeItemFromCart(item)"
							>
								delete
							</v-icon>
						</v-btn>
					</template>
					<template #no-data>
						Empty Cart! Add some items.
					</template>
					<!-- eslint-disable-next-line vue/valid-v-slot-->
					<template #item.quantity="{item}">
						<span class="d-flex align-center pb-2">
							<v-btn icon
								color="info"
								@click="addQuantity(item)"
							><v-icon>expand_more</v-icon></v-btn><span class="mx-4 item-quantity">{{ item.quantity }}</span>
							<v-btn icon
								@click="subtractQuantity(item)"
							><v-icon color="primary">expand_less</v-icon></v-btn>
						</span>
					</template>
					<!-- eslint-disable-next-line vue/valid-v-slot-->
					<template #item.totalPrice="{item}">
						<span class="item-sub-total">{{ item.quantity * 100 }}</span>
					</template>
				</v-data-table>
			</v-col>
			<v-scale-transition mode="out-in">
				<v-col
					v-if="$vuetify.breakpoint.mdAndUp"
					cols="12"
					xl="4"
					lg="4"
					md="4"
				>
					<v-card class="mx-auto"
						max-width="400"
					>
						<v-toolbar class="px-4"
							color="#FF9800"
						>
							<v-app-bar-nav-icon>
								<v-avatar color="#fd966d"
									style="border: 2px #fd966d solid;"
								>
									<v-img
										src="https://image.freepik.com/free-vector/beard-man-barber-shop-logo-vector-illustration_56473-434.jpg"
									/>
								</v-avatar>
							</v-app-bar-nav-icon>
							<v-toolbar-title>Kiran Parajuli</v-toolbar-title>
						</v-toolbar>
						<v-list two-line>
							<v-list-item
								v-for="(summaryItem, summaryIndex) of getCartSummary"
								:key="summaryIndex"
							>
								<v-list-item-icon>
									<v-icon>{{ summaryItem.icon }}</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title>
										<v-card-title class="ma-0 pa-0">
											{{ summaryItem.value }}
										</v-card-title>
									</v-list-item-title>
									<v-list-item-subtitle>{{ summaryItem.field }}</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-list>
						<v-card-actions>
							<v-btn class="peach-gradient"
								block
								large
								dark
							>
								Proceed
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-scale-transition>
		</v-row>
	</v-card>
</template>
<script>
export default {
	name: "CartView",
	data() {
		return {
			snack: false,
			snackText: "",
			search: "",
			pagination: {},
			headers: [
				{ text: "ACTION", value: "actions", sortable: false},
				{ text: "CART ITEM", value: "name", },
				{ text: "QUANTITY", value: "quantity" },
				{ text: "SUB TOTAL (Rs)", value: "totalPrice" },
			],
			desserts: [
				{
					name: "Frozen Yogurt",
					quantity: 159,
				},
				{
					name: "Ice cream sandwich",
					quantity: 237,
				},
				{
					name: "Eclair",
					quantity: 262,
				},
				{
					name: "Cupcake",
					quantity: 305,
				},
			],
		}
	},
	computed: {
		getCartSummary() {
			return [
				{
					icon: "grain",
					field: "Total Items",
					value: this.desserts.length
				},
				{
					icon: "location_on",
					field: "Delivery Location",
					value: "Amarsingh-7, Pokhara"
				},
				{
					icon: "title",
					field: "Total",
					value: 15000
				},
				{
					icon: "card_giftcard",
					field: "Discount Allocated",
					value: "5%",
				},
				{
					icon: "text_fields",
					field: "Grand Total",
					value: 565656,
					divider: true
				}
			]
		}
	},
	methods: {
		addQuantity(item) {
			if (item.quantity === 1) return
			item.quantity += 1
		},
		subtractQuantity(item) {
			if (item.quantity === 1) return
			item.quantity -=1
		},
		save() {
			this.snack = true
			this.snackColor = "success"
			this.snackText = "Data saved"
		},
		openSnack(text) {
			this.snack = true
			this.snackText = text
		},
		removeItemFromCart(item) {
			const indexOfItemToRemove = this.desserts.indexOf(item)
			this.desserts.splice(indexOfItemToRemove, 1)
			this.openSnack(item.name + " removed from cart.")
		}
	},
}
</script>
<style lang="scss">
.item-quantity {
	transition: all .3s ease-in-out;
	font-size: 1.6rem;
	line-height: 1.6rem;
	border: 2px solid darkslategrey;
	border-radius: 8px;
	padding: 6px 12px;
	color: #3c3c3c;
	@media only screen and (max-width: 640px) and (min-width: 600px) {
		font-size: 1.2rem;
		line-height: 1.2rem;
	}
	@media only screen and (max-width: 300px) {
		font-size: .875rem;
		line-height: .875rem;
	}
}
.item-sub-total {
	transition: all .3s ease-in-out;
	font-size: 2rem;
	line-height: 2rem;
	color: green;
	font-weight: bold;
	font-family: Lato, serif;
	@media only screen and (max-width: 640px) and (min-width: 600px) {
		font-size: 1.5rem;
		line-height: 1.5rem;
	}
	@media only screen and (max-width: 300px) {
		font-size: 1.2rem;
		line-height: 1.2rem;
	}
}
</style>
