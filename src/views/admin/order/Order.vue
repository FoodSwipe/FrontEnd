<template>
	<div>
		<v-row class="ma-0 pa-0">
			<v-breadcrumbs v-if="!isLoading"
				dark
				:items="orderBreadcrumbs"
				class="px-1 pt-3"
			>
				<template #item="{ item }">
					<v-breadcrumbs-item
						class="admin-breadcrumb-item"
						:href="item.href"
						:disabled="item.disabled"
					>
						{{ item.text.toUpperCase() }}
					</v-breadcrumbs-item>
				</template>
			</v-breadcrumbs>
		</v-row>
		<v-card dark
			:loading="isLoading"
		>
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
							<v-tooltip bottom>
								<template #activator="{on, attrs}">
									<v-btn fab
										class="refresh-order-btn"
										v-bind="attrs"
										v-on="on"
										@click="initialize"
									>
										<v-icon large>
											refresh
										</v-icon>
									</v-btn>
								</template>
								<span>Refresh Orders</span>
							</v-tooltip>
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
								<v-tooltip bottom>
									<template #activator="{ on, attrs }">
										<v-btn
											v-bind="attrs"
											class="brown-gradient"
											v-on="on"
											@click="startNewOrderByAdmin()"
										>
											<v-icon
												class="goldenrod"
											>
												add_circle
											</v-icon>
											<v-scale-transition>
												<span v-if="$vuetify.breakpoint.smAndUp"
													class="pl-3"
												>New Order</span>
											</v-scale-transition>
										</v-btn>
									</template>
									<span>New Order</span>
								</v-tooltip>
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
							colors[(index +1) % colors.length]
						"
					>
						<div class="delivered-card"
							:style="
								order.is_delivered
									? 'background-color: #e7ac1a;'
									: 'background-color: transparent'
							"
						/>
						<v-card-title class="d-flex justify-space-between">
							<span
								class="cursor"
								@click="routeToOrderDetail(order)"
							>#{{ order.id }} - {{ order.custom_contact.replace(/\D/g, "") }}</span>
							<span v-if="order.done_from_customer">
								<v-tooltip
									bottom
								>
									<template #activator="{attr, on}">
										<v-avatar size="35"
											color="white"
											v-bind="attr"
											v-on="on"
										><v-img
											:src="require('@/assets/done_from_customer.jpg')"
										/></v-avatar>
									</template>
									<span>Done from customer</span>
								</v-tooltip>
							</span>
						</v-card-title>
						<v-card-subtitle
							class="d-flex align-center pb-0"
						>
							<v-icon small>
								today
							</v-icon>
							<span class="px-1">{{
								onlyDate(order.created_at)
							}}</span>
							<v-icon small>
								schedule
							</v-icon>
							<span class="px-1">{{
								onlyTime(order.created_at)
							}}</span>
						</v-card-subtitle>
						<v-card-text class="py-0 d-flex justify-space-between">
							<div class="delivery-status d-flex">
								<v-tooltip v-if="!order.is_delivered"
									bottom
								>
									<template #activator="{attr, on}">
										<v-icon
											v-bind="attr"
											v-on="on"
										>
											outdoor_grill
										</v-icon>
									</template>
									<span>Delivery not started</span>
								</v-tooltip>
								<v-tooltip v-else
									bottom
								>
									<template #activator="{attr, on}">
										<v-icon
											v-bind="attr"
											v-on="on"
										>
											two_wheeler
										</v-icon>
									</template>
									<span>Delivery started</span>
								</v-tooltip>

								<v-tooltip v-if="order.is_delivered"
									bottom
								>
									<template #activator="{attr, on}">
										<v-icon
											v-bind="attr"
											v-on="on"
										>
											check
										</v-icon>
									</template>
									<span>Delivered</span>
								</v-tooltip>

								<v-tooltip v-else
									bottom
								>
									<template #activator="{attr, on}">
										<v-icon
											v-bind="attr"
											v-on="on"
										>
											close
										</v-icon>
									</template>
									<span>Not Delivered</span>
								</v-tooltip>
							</div>
							<div class="location">
								<v-icon small>
									room
								</v-icon><span class="ml-1">{{ order.custom_location }}</span>
							</div>
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
									</v-icon><b class="pl-2">Cart Details</b>
								</v-subheader>
								<v-divider inset />
								<v-list-item
									class="order-cart-list-item"
									@click="1"
								>
									<v-list-item-content class="py-0">
										<v-list-item-title class="cart-item-name">
											Total Items
										</v-list-item-title>
									</v-list-item-content>
									<v-list-item-action>
										<v-avatar size="24"
											color="grey darken-2"
											class="elevation-4"
										>
											{{ order.total_items }}
										</v-avatar>
									</v-list-item-action>
								</v-list-item>
								<v-list-item
									class="order-cart-list-item"
									@click="1"
								>
									<v-list-item-content class="py-0">
										<v-list-item-title class="cart-item-name">
											Delivery Charge
										</v-list-item-title>
									</v-list-item-content>
									<v-list-item-action>
										<v-avatar size="24"
											color="grey darken-2"
											class="elevation-4"
										>
											{{ order.delivery_charge }}
										</v-avatar>
									</v-list-item-action>
								</v-list-item>
								<v-list-item
									class="order-cart-list-item"
									@click="1"
								>
									<v-list-item-content class="py-0">
										<v-list-item-title class="cart-item-name">
											Loyalty Discount
										</v-list-item-title>
									</v-list-item-content>
									<v-list-item-action>
										<v-avatar size="24"
											color="grey darken-2"
											class="elevation-4"
										>
											{{ order.loyalty_discount }}
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
								<div><span>NRS</span><span class="pl-2 headline">{{ order.grand_total }}</span></div>
							</div>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-card>
		<start-order-form-dialog />
	</div>
</template>
<script>
import router from "@/router"
import { mapGetters } from "vuex"

export default {
	name: "OrderAdministration",
	components: {
		DropdownList: () => import("@/components/DropdownList"),
		DateFilter: () => import("@/components/DateFilter"),
		StartOrderFormDialog: () => import("@/views/admin/order/NewOrderForm")
	},
	data: () => ({
		isLoading: false,
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
		orderBreadcrumbs: [
			{
				text: "> Home",
				disabled: false,
				href: "/admin/home",
			},
			{
				text: "Orders",
				disabled: true,
			}
		]
	}),
	computed: {
		...mapGetters({
			orders: "order/allOrders"
		})
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
			await this.$store.dispatch("order/fetchAllWithAuthenticated")
			this.isLoading = false
		},
		routeToOrderDetail(order) {
			router.push(`/admin/order/${order.id}`)
		},
		startNewOrderByAdmin() {
			this.$bus.emit("start-order-admin")
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
.refresh-order-btn {
	border: 3px solid #343434
}
</style>
