<template>
	<v-card flat
		class="rounded-0" width="100vw"
		color="transparent"
	>
		<v-card-title class="py-1 d-flex justify-center">
			<v-avatar size="60"
				class="golden-rod-border-3"
			>
				<v-img src="https://image.freepik.com/free-vector/beard-man-barber-shop-logo-vector-illustration_56473-434.jpg" />
			</v-avatar><span class="ml-4">John Doe</span>
		</v-card-title>
		<v-row class="ma-0 pa-0">
			<v-col xl="3"
				lg="3"
				md="3"
				cols="12"
				class="overflow-y"
			>
				<user-orders />
			</v-col>
			<v-col xl="6"
				lg="6"
				md="6"
				cols="12"
			>
				<update-order />
			</v-col>
			<v-col xl="3"
				lg="3"
				md="3"
				cols="12"
			>
				<user-store-summary />
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
export default {
	components: {
		UserOrders: () => import("./components/UserOrders"),
		UpdateOrder: () => import("./components/UpdateOrder"),
		UserStoreSummary: () => import("./components/StoreSummary"),
	},
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
<style lang="sass" scoped>
.overflow-y
	height: 80vh
	width: 100%
	overflow-y: auto
	-ms-overflow-style: none
	scrollbar-width: none
.overflow-y::-webkit-scrollbar
	display: none
</style>
