<template>
	<div>
		<v-row class="ma-0 pa-0">
			<v-breadcrumbs v-if="!isLoading"
				dark
				:items="transactionPageBreadcrumbs"
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
		<v-data-table
			v-model:expanded="expanded"
			:loading="isLoading"
			dark
			:headers="dessertHeaders"
			:items="desserts"
			:search="searchTransactions"
			:single-expand="true"
			show-expand
			class="elevation-1"
			item-key="order.id"
		>
			<template #top>
				<v-toolbar flat
					height="auto"
					class="px-3"
				>
					<v-toolbar-title>
						<v-avatar size="32"
							class="elevation-4 golden-rod-border-2" color="orange"
						>
							<v-img src="https://banner2.cleanpng.com/20180427/zle/kisspng-financial-transaction-finance-money-credit-card-co-e-commerce-5ae3503a9e8fc2.5425949615248466506495.jpg" />
						</v-avatar>
						<v-fade-transition mode="out-in">
							<span v-if="$vuetify.breakpoint.width > 600"
								class="px-2"
							>Transactions</span>
						</v-fade-transition>
					</v-toolbar-title>
					<v-divider inset
						vertical
						class="mx-4 my-2"
					/>
					<v-text-field
						v-model="searchTransactions"
						solo
						dense
						clearable label="Search transactions"
						hide-details
						prepend-inner-icon="search"
					/>
					<v-divider inset
						vertical
						class="mx-4 my-2"
					/>
					<date-filter what-to-filter="transaction" />
					<v-divider inset
						vertical
						class="mx-4 my-2"
					/>
					<v-menu offset-y>
						<template #activator="{ on, attrs }">
							<v-btn icon
								v-bind="attrs"
								v-on="on"
							>
								<v-icon>filter_list</v-icon>
							</v-btn>
						</template>
						<dropdown-list :filter-options="filterTransactionsOptions" />
					</v-menu>
				</v-toolbar>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.actions="{ item }">
				<v-btn icon
					@click="deleteTransaction(item)"
				>
					<v-icon
						size="20"
						color="error"
					>
						delete
					</v-icon>
				</v-btn>
			</template>
			<template #expanded-item="{ headers, item }">
				<td :colspan="headers.length">
					<v-row class="ma-0 pa-0 py-1">
						<v-col cols="12"
							class="py-1 d-flex align-center"
						>
							<span class="more-info">More info about #{{ item.order.id }}</span>
						</v-col>
						<v-col cols="12"
							class="ma-0 pa-0"
						>
							<v-divider class="mt-2 mb-1" />
						</v-col>
						<v-col cols="12"
							xl="6"
							lg="6"
							md="6"
							sm="6"
							class="py-1"
						>
							<v-icon>add_circle</v-icon>
							<span class="px-2">Created by</span>
							<b>{{ item.created_by }}</b>
							<span class="px-1">on</span>
							<b>{{ item.created_at }}</b>
						</v-col>
						<v-col cols="12"
							xl="6"
							lg="6"
							md="6"
							sm="6"
							class="py-1"
						>
							<v-icon>history</v-icon>
							<span class="px-2">Last modified by</span>
							<b>{{ item.updated_by }}</b>
							<span class="px-1">on</span>
							<b>{{ item.updated_at }}</b>
						</v-col>
						<v-col cols="12"
							xl="6"
							lg="6"
							md="6"
							sm="6"
							class="py-1"
						>
							<v-icon>person_pin</v-icon>
							<span class="px-2">On behalf of</span>
							<b>{{ item.order.created_by }}</b>
							<span class="px-1">from</span>
							<b>{{ item.order.delivery_location }}</b>
						</v-col>
						<v-col cols="12"
							xl="6"
							lg="6"
							md="6"
							sm="6"
							class="py-1"
						>
							<v-icon>shopping_cart</v-icon>
							<span class="px-2">Order placed on</span>
							<b>{{ item.order.created_at }}</b>
						</v-col>
					</v-row>
				</td>
			</template>
		</v-data-table>
	</div>
</template>
<script>
export default {
	name: "TransactionAdministration",
	components: {
		DateFilter: () => import("@/components/DateFilter"),
		DropdownList: () => import("@/components/DropdownList")
	},
	data() {
		return {
			isLoading: false,
			expanded: [],
			singleExpand: false,
			searchTransactions: "",
			dessertHeaders: [
				{text: "Actions", align: "center", value: "actions"},
				{ text: "Order Id", value: "order.id" },
				{ text: "Items", value: "order.total_items" },
				{ text: "Total", value: "order.sub_total" },
				{ text: "Loyalty (%)", value: "order.loyalty_discount" },
				{ text: "Delivery Charge", value: "order.delivery_charge" },
				{ text: "Grand Total", value: "grand_total" },
				{ text: "Cashier", value: "created_by" },
				{ text: "", value: "data-table-expand" },
			],
			desserts: [
				{
					order: {
						id: 55896,
						created_by: "John Doe",
						created_at: "Dec 26, 2020 T 5:45 PM",
						updated_by: "Mark Williams",
						updated_at: "Dec 30, 2020 T 5:45 PM",
						delivery_location: "Lorem ipsum -16, Sed",
						delivery_charge: 150,
						is_delivered: false,
						total_items: 18,
						sub_total: 1500,
						grand_total: 1400,
						loyalty_discount: 10,
						items: [
							{id: 5, name: "Veg Momo", quantity: 1},
							{id: 6, name: "Buff Momo", quantity: 2},
							{id: 7, name: "Chicken Chowmein", quantity: 3},
						]
					},
					grand_total: 159,
					created_by: "Kyle Walker",
					created_at: "Dec 26, 2020 T 5:45 PM",
					updated_by: "Sans Sheriff",
					updated_at: "Dec 30, 2020 T 5:45 PM",
				},
				{
					order: {
						id: 55899,
						created_by: "Alan Ramsey",
						created_at: "Dec 26, 2020 T 5:45 PM",
						updated_by: "Sergio Ramos",
						updated_at: "Dec 30, 2020 T 5:45 PM",
						delivery_location: "Lorem sed -16, lyf",
						delivery_charge: 0,
						is_delivered: true,
						total_items: 18,
						loyalty_discount: 10,
						sub_total: 1600,
						grand_total: 1800,
						items: [
							{id: 5, name: "Veg Momo", quantity: 1},
							{id: 6, name: "Buff Momo", quantity: 2},
							{id: 7, name: "Chicken Chowmein", quantity: 3},
						]
					},
					grand_total: 260,
					created_by: "Paul Hymen",
					created_at: "Dec 26, 2020 T 5:45 PM",
					updated_by: "Babu Bogati",
					updated_at: "Dec 30, 2020 T 5:45 PM",
				},
			],
			filterTransactionsOptions: [
				{icon: "history", title: "Recent First"},
				{icon: "stars", title: "Top Transactions"},
			],
			transactionPageBreadcrumbs: [
				{
					text: "> Home",
					disabled: false,
					href: "/admin/home",
				},
				{
					text: "Transactions",
					disabled: true,
				}
			]
		}
	},
	methods: {
		deleteTransaction() {
		},
	}
}
</script>
<style lang="scss" scoped>
.more-info {
	font-size: 1rem; line-height: 1.1rem;
}
</style>
