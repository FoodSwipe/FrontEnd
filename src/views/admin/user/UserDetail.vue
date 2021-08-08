<template>
	<v-card flat
		:loading="isLoading"
		dark tile
		class="transparent" width="100vw"
		color=""
	>
		<v-row class="ma-0 pa-0">
			<v-col cols="10">
				<admin-breadcrumb :items="userDetailBreadcrumbs" />
			</v-col>
			<v-col cols="2"
				class="d-flex justify-end align-center"
			>
				<v-btn icon
					@click="$router.go(-1)"
				>
					<v-icon>arrow_back</v-icon>
				</v-btn>
			</v-col>
		</v-row>
		<v-row v-if="userOrders"
			class="ma-0 pa-0"
		>
			<v-col
				xl="3"
				lg="3"
				md="4"
				sm="4"
				cols="12"
				class="overflow-y"
			>
				<user-orders />
			</v-col>
			<v-col
				v-if="userOrders.length"
				xl="6"
				lg="6"
				md="8"
				sm="8"
				cols="12"
			>
				<update-order v-if="!isLoading" />
				<div v-else>
					No order to update.
				</div>
			</v-col>
			<v-col v-if="userOrders.length"
				xl="3"
				lg="3"
				md="12"
				sm="12"
				cols="12"
			>
				<user-store-summary />
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
import { mapGetters } from "vuex"
import AdminBreadcrumb from "@/components/AdminBreadcrumb"
import Snack from "@/mixin/Snack"

export default {
	components: {
		AdminBreadcrumb,
		UserOrders: () => import("./components/UserOrders"),
		UpdateOrder: () => import("./components/UpdateOrder"),
		UserStoreSummary: () => import("./components/StoreSummary"),
	},
	mixins: [Snack],
	data: () => ({
		show: true,
		isLoading: false,
	}),
	computed: {
		...mapGetters({
			user: "user/user",
			userOrders: "order/allOrders",
		}),
		userDetailBreadcrumbs() {
			return [
				{
					text: "> Home",
					to: "/admin/home",
				},
				{
					text: "Users",
					to: "/admin/user",
				},
				{
					text: this.user.username,
				},
			]
		}
	},
	async created() {
		await this.initialize()
	},
	methods: {
		async initialize() {
			this.isLoading = true
			await this.$store.dispatch("menuItem/fetchOrderNowList")
			await this.$store.dispatch("user/fetchProfileContactList")
			await this.$store.dispatch("user/getSingle", {
				id: this.$route.params.id
			})
			const fetched = await this.$store.dispatch("order/fetchUserOrdersByContact", {
				id: this.user.profile.contact
			})
			if (!fetched) {
				await this.openSnack("Internal server error. Please try again.")
			}
			if (this.userOrders.length > 0) {
				await this.$store.dispatch("order/withCartItems", {
					id: this.userOrders[0].id
				})
			}
			this.isLoading = false
		}
	}
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
