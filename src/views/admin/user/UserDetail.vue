<template>
	<v-card flat
		class="rounded-0" width="100vw"
		color="transparent"
	>
		<v-card-title>John Doe</v-card-title>
		<v-row class="ma-0 pa-0">
			<v-col cols="3">
				<user-orders />
			</v-col>
			<v-col cols="6">
				<update-order />
			</v-col>
			<v-col cols="3">
				<v-card>
					<v-card-title>User Summary</v-card-title>
				</v-card>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
export default {
	components: {
		UserOrders: () => import("./components/UserOrders"),
		UpdateOrder: () => import("./components/UpdateOrder")
	},

}
</script>
