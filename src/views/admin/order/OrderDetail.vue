<template>
	<v-card dark color=""
		:loading="loading"
		class="transparent"
		flat
	>
		<admin-breadcrumb
			:items="breadCrumbItems"
		/>
		<update-order v-if="!loading" />
	</v-card>
</template>
<script>
import AdminBreadcrumb from "@/components/AdminBreadcrumb"
export default {
	components: {
		AdminBreadcrumb,
		UpdateOrder: () => import("./../user/components/UpdateOrder")
	},
	data() {
		return {
			breadCrumbItems: [
				{text: "> Home", to: "/admin/home"},
				{text: "Order", to: "/admin/order"},
				{text: this.$route.params.id },
			],
			loading: true
		}
	},
	async created() {
		await this.$store.dispatch("menuItem/fetchOrderNowList")
		await this.$store.dispatch("user/fetchProfileContactList")
		await this.$store.dispatch("order/withCartItems", {
			id: this.$route.params.id
		})
		this.loading = false
	}
}
</script>
