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
			:items="orderKOTs"
			:search="searchKOT"
			:single-expand="true"
			:show-expand="true"
			item-key="id"
			class="elevation-4 kot-table"
		>
			<template #top>
				<v-toolbar flat>
					<v-toolbar-title>Order KOTs</v-toolbar-title>
					<v-divider vertical
						inset
						class="mx-4"
					/>
					<v-text-field
						v-model="searchKOT"
						label="Search"
						solo
						prepend-inner-icon="search"
						hide-details
					/>
					<v-divider vertical
						inset
						class="mx-4"
					/>
					<v-menu offset-y>
						<template #activator="{on, attrs}">
							<v-btn icon
								v-bind="attrs" v-on="on"
							>
								<v-icon>filter_list</v-icon>
							</v-btn>
						</template>
						<v-list dark
							color="black"
						>
							<v-list-item>Latest</v-list-item>
						</v-list>
					</v-menu>
				</v-toolbar>
			</template>
			<template #expanded-item="{ headers, item }">
				<td :colspan="headers.length">
					<p class="ma-0 pt-2">
						<v-icon class="pr-1 mb-1"
							size="20"
							color="red"
						>
							star
						</v-icon>
						<span>More info about KOT #{{ item.id }}</span>
					</p>
					<v-divider class="mx-4 my-1" />
					<v-list dense
						class="cart-items-list py-0"
						color="transparent"
					>
						<v-list-item-group
							v-for="(kot, index) in batchGroupedOrderKOTs(item.cartItems)"
							:key="index+27*43"
							class="px-0"
						>
							<v-subheader>
								<v-btn icon
									@click="generateKOTPDF(kot, item)"
								>
									<v-icon color="primary">
										kitchen
									</v-icon>
								</v-btn>
								Batch: {{ kot.batch }}
							</v-subheader>
							<v-list-item v-for="(cartItem, i) in kot.cartItems"
								:key="i+39*871"
							>
								<v-list-item-content>
									<v-list-item-title>
										{{ cartItem.name }}
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-action-text class="number-font one-rem">
									{{ cartItem.quantityDiff }}
								</v-list-item-action-text>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</td>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.orderId="{ item }">
				<span class="cursor one-point-two-rem orange--text"
					@click="routeToUpdateOrder(item.orderId)"
				>{{ item.orderId }}</span>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.cart_items="{ item }">
				{{ item.cartItems.length }}
			</template>
			<template #no-data>
				<v-btn
					color="primary"
					@click="initialize"
				>
					Reset
				</v-btn>
			</template>
		</v-data-table>
	</div>
</template>
<script>
import { mapGetters } from "vuex"
import router from "@/router"
import jsPDF from "jspdf"

export default {
	data: () => ({
		doc: null,
		isLoading: false,
		searchKOT: null,
		expanded: [],
		dessertHeaders: [
			{ text: "ORDER ID", value: "orderId" },
			{ text: "CART ITEMS", value: "cart_items", align: "start" },
			{ text: "TIMESTAMP", value: "timestamp" },
			{ text: "", value: "data-table-expand" },
		],
		orderKOTs: [],
		transactionPageBreadcrumbs: [
			{
				text: "> Home",
				disabled: false,
				href: "/admin/home",
			},
			{
				text: "Order KOT(s)",
				disabled: true,
			}
		]
	}),
	computed: {
		...mapGetters({
			desserts: "kot/allKots",
		}),
	},
	async created() {
		await this.initialize()
	},
	methods: {
		batchGroupedOrderKOTs(orderKOTList) {
			let tempBatchArray = []
			let batchGroupedOrderKOTs = []
			orderKOTList.forEach(orderKOT => {
				if (!tempBatchArray.includes(orderKOT.batch)) {
					batchGroupedOrderKOTs.push({
						batch: orderKOT.batch,
						id: orderKOT.id,
						cartItems: [
							{
								name: orderKOT.name,
								quantity: orderKOT.quantity,
								quantityDiff: orderKOT.quantityDiff
							}
						]
					})
					tempBatchArray.push(orderKOT.batch)
				} else {
					const index = batchGroupedOrderKOTs.findIndex((obj => obj.batch === orderKOT.batch))
					batchGroupedOrderKOTs[index].cartItems.push({
						name: orderKOT.name,
						quantity: orderKOT.quantity,
						quantityDiff: orderKOT.quantityDiff
					})
				}
			})
			return batchGroupedOrderKOTs
		},
		async groupKOTByOrder() {
			if (!this.desserts) this.orderKOT = []
			else {
				this.orderKOTs = this.$helper.groupKOTsByOrder(this.desserts)
			}
		},
		async initialize() {
			this.isLoading = true
			await this.$store.dispatch("kot/fetchAllKots")
			await this.groupKOTByOrder()
			this.isLoading = false
		},
		routeToUpdateOrder(orderId) {
			router.push(`/admin/order/${orderId}`)
		},
		generateKOTPDF(kot, item) {
			this.overlay = true
			this.doc = new jsPDF({
				orientation: "portrait",
				uint: "in",
				format: "dl",
			})
			this.$helper.generateKOTPDF(kot, this.doc, item.orderId)
			this.overlay = false
		}
	}
}
</script>
<style lang="scss" scoped>
</style>
