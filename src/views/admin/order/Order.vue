<template>
	<v-card dark>
		<v-toolbar height="auto">
			<template #default>
				<v-row class="ma-0 pa-0">
					<v-col cols="12"
						class="d-flex align-center"
					>
						<v-app-bar-nav-icon><v-icon>receipt</v-icon></v-app-bar-nav-icon>
						<v-fade-transition mode="in-out">
							<v-toolbar-title v-show="$vuetify.breakpoint.width > 615">
								Orders
							</v-toolbar-title>
						</v-fade-transition>
						<v-spacer />
						<div class="px-1">
							<v-menu
								offset-y
							>
								<template #activator="{ on, attrs }">
									<v-btn
										icon
										v-bind="attrs"
										v-on="on"
									>
										<v-icon>style</v-icon>
									</v-btn>
								</template>
								<dropdown-list :filter-options="orderFilter" />
							</v-menu>
						</div>
						<div class="px-1">
							<v-btn icon>
								<v-icon class="goldenrod">
									add_circle
								</v-icon>
							</v-btn>
						</div>
					</v-col>
					<v-col cols="12"
						xl="6" lg="6"
						md="6" sm="6"
					>
						<div>
							<v-text-field
								v-model="searchOrders"
								dense
								hide-details
								solo
								label="Search Orders"
								clearable
								prepend-inner-icon="search"
							/>
						</div>
					</v-col>
					<v-col cols="12"
						xl="6" lg="6"
						md="6" sm="6"
					>
						<date-filter what-to-filter="transaction" />
					</v-col>
				</v-row>
			</template>
		</v-toolbar>
		<v-divider />
		<v-row
			justify="start"
			align="center"
			class="ma-0 pa-4 pb-0"
		>
			<v-col
				v-for="(order, index) in orders"
				:key="order.id"
				cols="12"
				xl="3"
				lg="4"
				md="4"
				sm="6"
				class="ma-0 pa-0 pr-4 mb-4"
			>
				<v-card
					dark
					class="rounded-t"
					:class="
						index+1 === orders.length
							? colors[index]
							: colors[index]
					"
				>
					<div class="delivered-card"
						:style="
							order.is_delivered
								? 'background-color: #e7ac1a;'
								: 'background-color: transparent'
						"
					/>
					<v-card-title class="cursor"
						@click="routeToOrderDetail(order.id)"
					>
						#{{ order.id }} - {{ order.created_by }}
					</v-card-title>
					<v-card-subtitle class="d-flex align-center pb-0">
						<v-icon small>
							today
						</v-icon><span class="px-1">Dec 20, 2020</span><v-icon small>
							schedule
						</v-icon><span class="px-1">5:15 PM</span>
					</v-card-subtitle>
					<v-card-text class="py-0 text-right">
						<v-icon small>
							room
						</v-icon><span class="ml-1">Newroad-7</span>
					</v-card-text>
					<v-divider />
					<v-card-text class="pa-2">
						<v-list dense
							color="transparent"
							class="pa-0"
						>
							<v-subheader>
								<v-icon size="20">
									shopping_cart
								</v-icon><b class="pl-2">Cart Items</b>
							</v-subheader>
							<v-divider inset />
							<v-list-item
								v-for="cartItem in order.items"
								:key="order.id * cartItem.id"
								class="order-cart-list-item"
								@click="1"
							>
								<v-list-item-content class="py-0">
									<v-list-item-title class="cart-item-name">
										{{ cartItem.name }}
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-action>
									<v-avatar size="24"
										color="grey darken-2"
										class="elevation-4"
									>
										{{ cartItem.quality }}
									</v-avatar>
								</v-list-item-action>
							</v-list-item>
						</v-list>
						<v-divider />
						<div class="d-flex align-end pt-2 pb-1 px-3">
							<div>
								<b>Total:</b>
							</div>
							<v-spacer />
							<div><span>NRS</span><span class="pl-2 headline">1500</span></div>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
import router from "@/router"

export default {
	name: "OrderAdministration",
	components: {
		DropdownList: () => import("@/components/DropdownList"),
		DateFilter: () => import("@/components/DateFilter"),
	},
	data: () => ({
		searchOrders: "",
		colors: [
			"our-blue-gradient",
			"red-gradient",
			"orange-gradient",
			"deep-blue-gradient",
			"teal-gradient",
			"green-gradient",
			"dark-purple-gradient",
			"brown-gradient",
		],
		orderFilter: [
			{title: "Top", icon: "favorite"},
			{title: "Latest", icon: "history"},
			{title: "Pending", icon: "hdr_strong"},
			{title: "Delivered", icon: "check"},
		],
		orders: [
			{
				id: 55896,
				created_by: "John Doe",
				created_at: "Dec 26, 2020 T 5:45 PM",
				updated_by: "Mark Williams",
				updated_at: "Dec 30, 2020 T 5:45 PM",
				delivery_location: "Lorem ipsum -16, Sed",
				delivery_charge: 150,
				is_delivered: false,
				total_items: 18,
				loyalty_discount: 10,
				items: [
					{id: 5, name: "Veg Momo", quality: 1},
					{id: 6, name: "Buff Momo", quality: 2},
					{id: 7, name: "Chicken Chowmein", quality: 3},
				]
			},
			{
				id: 55897,
				created_by: "John Doe",
				created_at: "Dec 25, 2020 T 5:45 PM",
				updated_by: "Mark Williams",
				updated_at: "Dec 26, 2020 T 5:45 PM",
				delivery_location: "Lorem ipsum -16, Sed",
				delivery_charge: 150,
				is_delivered: false,
				total_items: 18,
				loyalty_discount: 10,
				items: [
					{id: 8, name: "Ham Burger", quality: 3},
					{id: 9, name: "Chicken Tikka", quality: 3},
					{id: 10, name: "Buff Chowmein", quality: 3},
				]
			},
			{
				id: 55898,
				created_by: "Donald Trump",
				created_at: "Dec 26, 2020 T 5:45 PM",
				updated_by: "Adam Smith",
				updated_at: "Dec 30, 2020 T 5:45 PM",
				delivery_location: "Lorem ipsum -16, Sed",
				delivery_charge: 150,
				is_delivered: true,
				total_items: 18,
				loyalty_discount: 10,
				items: [
					{id: 11, name: "Chicken Popcorn", quality: 2},
					{id: 12, name: "Crispy Chicken", quality: 2},
					{id: 13, name: "Pork Tawa", quality: 2},
				]
			},
			{
				id: 55899,
				created_by: "Donald Trump",
				created_at: "Dec 26, 2020 T 5:45 PM",
				updated_by: "Mark Williams",
				updated_at: "Dec 30, 2020 T 5:45 PM",
				delivery_location: "Lorem ipsum -16, Sed",
				delivery_charge: 150,
				is_delivered: true,
				total_items: 18,
				loyalty_discount: 10,
				items: [
					{id: 14, name: "Steam MoMo (Chicken)", quality: 6},
					{id: 15, name: "Buff Chilly", quality: 7},
					{id: 16, name: "Crispy Chicken Burger", quality: 1},
				]
			},
			{
				id: 55900,
				created_by: "Mic Tyson",
				created_at: "Dec 26, 2020 T 5:45 PM",
				updated_by: "Eddy Fudge",
				updated_at: "Dec 30, 2020 T 5:45 PM",
				delivery_location: "Lorem ipsum -16, Sed",
				delivery_charge: 150,
				is_delivered: true,
				total_items: 18,
				loyalty_discount: 10,
				items: [
					{id: 17, name: "Food swipe combo (Veg)", quality: 1},
					{id: 18, name: "Biryani", quality: 3},
					{id: 19, name: "Fried Rice Chowmein", quality: 2},
				]
			}
		],
	}),
	methods: {
		routeToOrderDetail(id) {
			router.push({name: "Order Detail", params: { id: id }})
		}
	}
}
</script>
<style scoped lang="scss">
.delivered-card {
	width:100%;
	height: 8px;
	border-radius: 4px 4px 0 0;
}
.order-date {
	font-size: .7rem; color: grey;
}
.order-cart-list-item {
	height: 30px;
}
.cart-item-name {
	font-size: .8rem; font-weight: normal;
}
</style>
