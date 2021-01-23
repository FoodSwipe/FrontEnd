<template>
	<v-data-table
		v-model:expanded="expanded"
		:loading="isLoading"
		:search="searchKOT"
		dark
		:headers="dessertHeaders"
		:items="orderKOTs"
		single-expand
		item-key="name"
		show-expand
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
				More info about KOT #{{ item.id }}
			</td>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.actions>
			<v-btn icon
				color="primary"
			>
				<v-icon size="20">
					kitchen
				</v-icon>
			</v-btn>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.orderId="{ item }">
			<span class="cursor one-point-two-rem orange--text"
				@click="routeToUpdateOrder(item.orderId)"
			>{{ item.orderId }}</span>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.cart_items="{ item }">
			<v-list dense
				class="cart-items-list"
				color="transparent"
			>
				<v-list-item
					v-for="(cartItem, index) in item.cartItems"
					:key="index+27*43"
					class="px-0"
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
			</v-list>
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
</template>
<script>
import { mapGetters } from "vuex"
import router from "@/router"

export default {
	data() {
		return {
			isLoading: false,
			searchKOT: null,
			expanded: [],
			singleExpand: false,
			dessertHeaders: [
				{
					text: "PRINTER",
					sortable: false,
					value: "actions",
				},
				{ text: "ORDER ID", value: "orderId" },
				{ text: "CART ITEMS", value: "cart_items", align: "start" },
				{ text: "TIMESTAMP", value: "timestamp" },
				{ text: "", value: "data-table-expand" },
			],
			orderKOTs: []
		}
	},
	computed: {
		...mapGetters({
			desserts: "kot/allKots",
		})
	},
	async created() {
		await this.initialize()
	},
	methods: {
		async groupKOTByOrder() {
			if (!this.desserts) this.orderKOT = []
			else {
				let tempOrderId = null
				this.desserts.forEach(kot => {
					if (tempOrderId !== kot.order.id) {
						this.orderKOTs.push({
							id: kot.id,
							orderId: kot.order.id,
							timestamp: kot.timestamp,
							cartItems: [
								{
									name: kot["cart_item"].item.name,
									quantity: kot["cart_item"].quantity,
									quantityDiff: kot["quantity_diff"]
								}
							],
							batch: kot.batch
						})
					} else {
						const index = this.orderKOTs.findIndex((obj => obj.orderId === kot.order.id))
						this.orderKOTs[index].cartItems.push({
							name: kot["cart_item"].item.name,
							quantity: kot["cart_item"].quantity,
							quantityDiff: kot["quantity_diff"]
						})
					}
					tempOrderId = kot.order.id
				})
			}
		},
		async initialize() {
			this.isLoading = true
			await this.$store.dispatch("kot/fetchAllKots")
			await this.groupKOTByOrder(this.desserts)
			console.log(this.orderKOTs)
			this.isLoading = false
		},
		routeToUpdateOrder(orderId) {
			router.push(`/admin/order/${orderId}`)
		}
	}
}
</script>
<style lang="scss" scoped>
</style>
