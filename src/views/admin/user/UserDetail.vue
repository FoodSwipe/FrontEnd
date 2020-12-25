<template>
	<v-card flat
		:loading="isLoading"
		dark
		class="rounded-0" width="100vw"
		color="transparent"
	>
		<v-card-title v-if="user"
			class="py-1 d-flex justify-center"
		>
			<v-avatar size="60"
				class="golden-rod-border-3"
			>
				<v-img src="https://image.freepik.com/free-vector/beard-man-barber-shop-logo-vector-illustration_56473-434.jpg" />
			</v-avatar><span class="ml-4">
				{{ user.username }}
			</span>
		</v-card-title>
		<v-row class="ma-0 pa-0">
			<v-col xl="3"
				lg="3"
				md="3"
				sm="5"
				cols="12"
				class="overflow-y"
			>
				<user-orders />
			</v-col>
			<v-col xl="6"
				lg="6"
				md="6"
				sm="7"
				cols="12"
			>
				<update-order />
			</v-col>
			<v-col xl="3"
				lg="3"
				md="3"
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
		isLoading: false
	}),
	computed: {
		...mapGetters({
			user: "user/user"
		})
	},
	async created() {
		await this.initialize()
	},
	methods: {
		async initialize() {
			this.isLoading = true
			await this.$store.dispatch("user/getSingle", {
				id: this.$route.params.id
			})
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
