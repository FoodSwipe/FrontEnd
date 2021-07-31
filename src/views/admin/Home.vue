<template>
	<div class="admin-home">
		<v-row class="ma-0 pa-0">
			<v-breadcrumbs
				dark
				:items="homePageBreadcrumbs"
				class="px-1 pt-3"
			>
				<template #item="{ item }">
					<v-breadcrumbs-item
						class="admin-breadcrumb-item"
						:to="item.href"
						:disabled="item.disabled"
					>
						{{ item.text.toUpperCase() }}
					</v-breadcrumbs-item>
				</template>
			</v-breadcrumbs>
		</v-row>
		<v-row class="ma-0 pa-0">
			<v-col cols="12"
				xl="6"
				lg="6"
				md="6"
				sm="6"
			>
				<sale-summary-card />
			</v-col>
			<v-col cols="12"
				xl="6"
				lg="6"
				md="6"
				sm="6"
			>
				<user-summary-card />
			</v-col>
			<v-col cols="12">
				<v-card dark>
					<admin-logs />
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>

export default {
	name: "AdminHomeView",
	components: {
		AdminLogs: () => import("@/views/admin/components/AdminLogDataTable"),
		UserSummaryCard: () => import("@/views/admin/components/UserSummary"),
		SaleSummaryCard: () => import("@/views/admin/components/SaleSummary")
	},
	data: () => ({
		homePageBreadcrumbs: [
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
				text: "Orders",
				disabled: false,
				href: "/admin/order",
			},
			{
				text: "Transactions",
				disabled: false,
				href: "/admin/transaction",
			},
			{
				text: "Menu Item",
				disabled: false,
				href: "/admin/menu-item",
			},
		]
	})
}
</script>
