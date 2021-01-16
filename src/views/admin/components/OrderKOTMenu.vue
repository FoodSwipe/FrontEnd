<template>
	<div class="text-center">
		<v-tooltip bottom>
			<template #activator="{ on, attrs }">
				<v-btn
					color="primary"
					dark
					icon
					:disabled="!doneFromCustomer"
					v-bind="attrs"
					v-on="on"
					@click="show"
				>
					<v-icon>kitchen</v-icon>
				</v-btn>
			</template>
			<span>Order KOT</span>
		</v-tooltip>
		<v-menu
			v-model="showKOTMenu"
			:position-x="x"
			:position-y="y"
			absolute
			offset-y
			class="elevation-4"
			:close-on-content-click="false"
			transition="fab-transition"
		>
			<v-list
				dense
				dark
				min-width="200"
			>
				<v-list-item-group
					v-for="(item, index) in batchGroupedKOTItems"
					:key="index"
				>
					<div class="kot-sub-header">
						<v-icon size="16"
							class="star-icon"
						>
							star
						</v-icon>
						<span>KOT PRINTER</span>
						<v-tooltip bottom>
							<template #activator="{on, attrs}">
								<v-btn
									class="print-kot-btn"
									icon
									small
									color="orange"
									v-bind="attrs"
									v-on="on"
									@click="generateKOTPDF(item)"
								>
									<v-icon size="18">
										print
									</v-icon>
								</v-btn>
							</template>
							<span>Print KOT</span>
						</v-tooltip>
					</div>
					<v-divider />
					<v-list-item v-for="(cartItem, counter) in item.cartItems"
						:key="counter+5*37"
					>
						<v-list-item-content>
							<v-list-item-title>{{ cartItem.itemName }}</v-list-item-title>
						</v-list-item-content>
						<v-list-item-action>
							<v-text-field
								v-model="cartItem.quantity"
								class="kot-item-quantity"
								solo
								hide-details="auto"
							/>
						</v-list-item-action>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-menu>
	</div>
</template>
<script>
import { mapGetters } from "vuex"
import jsPDF from "jspdf"

export default {
	props: {
		orderId: {
			type: Number,
			required: true
		},
		doneFromCustomer: {
			type: Boolean,
			required: true
		}
	},
	data: () => ({
		isLoading: null,
		showKOTMenu: false,
		x: 0,
		y: 0,
		batchGroupedKOTItems: [],
		doc: null,
	}),
	computed: {
		...mapGetters({
			orderKOTItems: "cart/orderKOTs"
		}),
		document() {
			return {
				heading: "Food Swipe and Online Market Company Pvt. Ltd.",
				location: "New-road, Pokhara",
			}
		},
	},
	async created(){
		await this.initialize()
	},
	methods: {
		async initialize() {
			this.isLoading = true
			await this.$store.dispatch("cart/fetchOrderKOT", {
				orderId: this.orderId
			})
			let tempKOTBatch
			this.orderKOTItems.forEach(item => {
				if (tempKOTBatch !== item.batch) {
					this.batchGroupedKOTItems.push({
						id: item.id,
						batch: item.batch,
						cartItems: [
							{
								itemName: item["cart_item"].item.name,
								quantity: item["cart_item"].quantity,
							}
						],
						timestamp: item.timestamp
					})
				} else {
					const objIndex = this.batchGroupedKOTItems.findIndex((obj => obj.batch === tempKOTBatch))
					this.batchGroupedKOTItems[objIndex].cartItems.push({
						itemName: item["cart_item"].item.name,
						quantity: item["cart_item"].quantity,
					})
				}
				tempKOTBatch = item.batch
			})
			this.isLoading = false
		},
		show(e) {
			e.preventDefault()
			this.showKOTMenu = false
			this.x = e.clientX
			this.y = e.clientY
			this.$nextTick(() => {
				this.showKOTMenu = true
			})
		},
		generateKOTPDF(kotItem) {
			this.overlay = true
			const columns = [
				{title: "ID", dataKey: "id"},
				{title: "Particulars", dataKey: "particular"},
				{title: "Qty", dataKey: "quantity"},
			]
			let itemsForDocument = []
			kotItem.cartItems.forEach((item, index) => {
				itemsForDocument.push({
					id: index +1,
					particular: item.itemName,
					quantity: item.quantity
				})
			})

			this.doc = new jsPDF({
				orientation: "portrait",
				uint: "in",
				format: "dl",
			})
			this.doc
				.setFontSize(12)
				.text(
					this.document.heading,
					8,
					7,
				)
			this.doc
				.setFontSize(10)
				.text(
					this.document.location,
					40,
					11,
				)
			this.doc
				.setFontSize(9)
				.text(
					"KOT ID: " + kotItem.id,
					7,
					17,
				)
			this.doc
				.setFontSize(9)
				.text(
					"KOT Batch Number: " + kotItem.batch,
					7,
					22,
				)
			this.doc
				.setFontSize(9)
				.text(
					"Timestamp: " + kotItem.timestamp,
					7,
					27,
				)
			this.doc.autoTable({
				columns,
				styles: {
					fillColor: [128, 128, 128],
					cellPadding: 1.6,
					fontSize: 10,
					cellWidth: 32
				},
				body: itemsForDocument,
				margin: {left: 7, top: 30},
				tableWidth: "wrap",
			})
			this.doc.save(`KOT#${kotItem.id}.pdf`)
			this.doc.autoPrint()
			this.overlay = false
		},
	},
}
</script>
<style lang="scss" scoped>
.kot-sub-header {
	padding: 4px;
	span {
		font-size: .875rem;
	}
	.star-icon {
		margin: 0 5px 3px;
		border-radius: 50%;
		border: 1px solid white;
	}
	.print-kot-btn {
		margin-left: 2rem;
	}
}
.kot-item-quantity {
	max-width: 5rem;
	width: 5rem;
}
</style>
