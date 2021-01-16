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
			:headers="transactionTableHeaders"
			:items="transactions"
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
							<v-img :src="require('@/assets/transaction_icon.jpg')" />
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
							<b>{{ item.created_by.username }}</b>
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
							<v-icon>person_pin</v-icon>
							<span class="px-2">On behalf of</span>
							<b>{{ item.order.created_by.username }}</b>
							<span class="px-1">from</span>
							<b>{{ item.order.custom_location }}</b>
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
import { mapGetters } from "vuex"

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
			transactionTableHeaders: [
				{text: "ACTIONS", align: "center", value: "actions"},
				{ text: "OID", value: "order.id" },
				{ text: "ITEMS", value: "order.total_items" },
				{ text: "S. TOTAL (NRS)", value: "order.total_price" },
				{ text: "LOYALTY (%)", value: "order.loyalty_discount" },
				{ text: "DEL. CHARGE", value: "order.delivery_charge" },
				{ text: "G. TOTAL (NRS)", value: "grand_total" },
				{ text: "CASHIER", value: "created_by.username" },
				{ text: "", value: "data-table-expand" },
			],
			transactions: [],
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
	computed: {
		...mapGetters({
			allTransactions: "transaction/allTransactions"
		})
	},
	async created() {
		await this.initialize()
	},
	methods: {
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async initialize() {
			this.isLoading = true
			const fetched = await this.$store.dispatch("transaction/fetchAllTransactions")
			if (!fetched) {
				await this.openSnack("Internal server error. Please try again.")
			} else {
				this.transactions = this.allTransactions
			}
			this.isLoading = false
		},
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
