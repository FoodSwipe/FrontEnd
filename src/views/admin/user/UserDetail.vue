<template>
	<v-card flat
		:loading="isLoading"
		dark
		class="rounded-0" width="100vw"
		color="transparent"
	>
		<v-row class="ma-0 pa-0">
			<v-col cols="10">
				<v-breadcrumbs v-if="!isLoading"
					dark
					:items="userDetailBreadcrumbs"
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
		<v-card-title v-if="!isLoading"
			class="py-1 d-flex justify-center"
		>
			<v-avatar size="60"
				class="golden-rod-border-3"
			>
				<v-img v-if="user.profile.image !== null"
					:src="user.profile.image"
				/>
				<span v-else>{{ user.username[0] }}</span>
			</v-avatar><span class="ml-4">
				{{ user.username }}
			</span>
		</v-card-title>
		<v-row class="ma-0 pa-0">
			<v-col
				:xl="(!show) ? 9 : 3"
				:lg="(!show) ? 9 : 3"
				:md="(!show) ? 9 : 3"
				:sm="(!show) ? 12 : 5"
				cols="12"
				:class="(show) ? 'overflow-y' : ''"
			>
				<user-orders />
			</v-col>
			<v-col
				v-if="show"
				xl="6"
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
		show: true,
		isLoading: false,
	}),
	computed: {
		...mapGetters({
			user: "user/user"
		}),
		userDetailBreadcrumbs() {
			return [
				{
					text: "> Home",
					disabled: false,
					href: "/admin/home",
				},
				{
					text: "Users",
					disabled: false,
					href: "/admin/user",
				},
				{
					text: this.user.username,
					disabled: true,
					href: "breadcrumbs_link_2",
				},
			]
		}
	},
	async created() {
		this.$bus.on("hide-update-order-box", this.hideUpdateOrderBox)
		await this.initialize()
	},
	beforeUnmount() {
		this.$bus.off("hide-update-order-box", this.hideUpdateOrderBox)
	},
	methods: {
		hideUpdateOrderBox() {
			this.show = false
		},
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
