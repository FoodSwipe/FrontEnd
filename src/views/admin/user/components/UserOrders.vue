<template>
	<v-card dark>
		<v-card-title class="py-2">
			Orders
		</v-card-title>
		<v-divider />
		<div class="user-order-list pa-2">
			<v-card
				v-for="(order, index) in orders"
				:key="order.id"
				dark
				class="rounded-t"
				:class="
					index+1 === orders.length
						? colors[index]
						: colors[index] + ' mb-2'
				"
			>
				<div class="delivered-card" />
				<v-card-title>#{{ order.id }}</v-card-title>
				<v-card-subtitle class="d-flex align-center">
					<v-icon small>
						today
					</v-icon><span class="px-1">Dec 20, 2020</span><v-icon small>
						schedule
					</v-icon><span class="px-1">5:15 PM</span>
				</v-card-subtitle>
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
							style="height: 30px;"
							@click="1"
						>
							<v-list-item-content class="py-0">
								<v-list-item-title style="font-size: .8rem; font-weight: normal;">
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
		</div>
	</v-card>
</template>
<script>
export default {
	name: "UserOrdersComponent",
	data: () => ({
		colors: [
			"red-gradient",
			"blue-gradient",
			"orange-gradient",
			"deep-blue-gradient",
			"teal-gradient",
			"green-gradient",
			"dark-purple-gradient",
			"brown-gradient",
		],
		orders: [
			{
				id: 55896,
				items: [
					{id: 5, name: "Veg Momo", quality: 1},
					{id: 6, name: "Buff Momo", quality: 2},
					{id: 7, name: "Chicken Chowmein", quality: 3},
				]
			},
			{
				id: 55897,
				items: [
					{id: 8, name: "Ham Burger", quality: 3},
					{id: 9, name: "Chicken Tikka", quality: 3},
					{id: 10, name: "Buff Chowmein", quality: 3},
				]
			},
			{
				id: 55898,
				items: [
					{id: 11, name: "Chicken Popcorn", quality: 2},
					{id: 12, name: "Crispy Chicken", quality: 2},
					{id: 13, name: "Pork Tawa", quality: 2},
				]
			},
			{
				id: 55899,
				items: [
					{id: 14, name: "Steam MoMo (Chicken)", quality: 6},
					{id: 15, name: "Buff Chilly", quality: 7},
					{id: 16, name: "Crispy Chicken Burger", quality: 1},
				]
			},
			{
				id: 55900,
				items: [
					{id: 17, name: "Food swipe combo (Veg)", quality: 1},
					{id: 18, name: "Biryani", quality: 3},
					{id: 19, name: "Fried Rice Chowmein", quality: 2},
				]
			}
		]
	})
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
</style>
