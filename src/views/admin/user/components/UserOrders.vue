<template>
	<v-card color="transparent"
		flat
	>
		<v-card>
			<v-card-title
				class="cursor"
				@click="startOrderForUser"
			>
				Start order
			</v-card-title>
		</v-card>
		<div class="py-2" />
		<v-card
			v-if="userOrders"
			:loading="isLoading"
			dark
		>
			<v-toolbar height="50"
				class="float-top pl-2"
			>
				<v-card-title class="px-0">
					Orders
				</v-card-title>
			</v-toolbar>
			<v-divider />

			<div v-if="userOrders.length > 0"
				class="user-order-list pa-4"
			>
				<v-card
					v-for="(order, index) in userOrders"
					:key="order.id"
					dark
					class="rounded-t"
					:class="
						index+1 === userOrders.length
							? colors[index]
							: colors[index] + ' mb-4'
					"
				>
					<div v-if="order.is_delivered"
						class="delivered-card"
					/>
					<v-card-title class="py-0">
						<span class="order-id cursor"
							@click="loadOrderForUpdate(order.id)"
						>#{{ order.id }}</span> <span
							class="pl-3 order-date"
						><v-icon small>
							today
						</v-icon><span class="px-1">{{ $helper.onlyDate(order.created_at) }}</span><v-icon small>
							schedule
						</v-icon><span class="px-1">{{ $helper.onlyTime(order.created_at) }}</span></span>
					</v-card-title>
					<v-divider />
					<v-card-text class="pa-2">
						<v-row no-gutters
							align="center"
							class="mb-2 px-3"
						>
							<v-icon size="20">
								shopping_cart
							</v-icon>
							<b class="pl-2">Cart Items</b>
							<v-spacer />
							<v-avatar size="28"
								color="grey darken-3"
							>
								{{ order.total_items }}
							</v-avatar>
						</v-row>
						<v-divider />
						<div class="d-flex align-end pt-2 pb-1 px-1">
							<div>
								<v-icon small>
									room
								</v-icon><span class="pl-1">{{ order.custom_location }}</span>
							</div>
							<v-spacer />
							<div>
								<span class="nrs">NRS</span>
								<span class="pl-1 g-total">{{ order.grand_total }}</span>
							</div>
						</div>
					</v-card-text>
				</v-card>
			</div>
			<div v-else>
				<v-card>
					<v-card-title>⌛ No orders made yet.</v-card-title>
				</v-card>
			</div>
		</v-card>
		<start-order-by-admin-form-dialog />
	</v-card>
</template>
<script>
import { mapGetters } from "vuex"
import Snack from "@/mixin/Snack"
import StartOrderByAdminFormDialog from "@/views/admin/order/NewOrderForm"

export default {
	name: "UserOrdersComponent",
	components: { StartOrderByAdminFormDialog },
	mixins: [Snack],
	data: () => ({
		isLoading: false,
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
	}),
	computed: {
		...mapGetters({
			userOrders: "order/allOrders",
			user: "user/user"
		})
	},
	methods: {
		loadOrderForUpdate(id) {
			this.$store.dispatch("order/withCartItems", {id: id})
		},
		startOrderForUser() {
			this.$bus.emit("start-order-admin-for-user", {user: this.user})
		}
	}
}
</script>
<style scoped lang="scss">
.delivered-card {
	width:100%;
	height: 8px;
	background-color: #e7ac1a;
	border-color: #e7ac1a;
	border-radius: 4px 4px 0 0;
}
.order-date {
	font-size: .62rem; color: #bfbfbf;
}
.order-id {
	font-size: 1.1rem;
}
.nrs {
	font-size: .75rem;
}
.g-total {
	font-size: 1rem; color: greenyellow;
}
.float-top {
	position: sticky;
	position: -webkit-sticky;
	top: -15px;
	z-index: 2;
}
</style>
