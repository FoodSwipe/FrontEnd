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
			transition="scale-transition"
		>
			<v-list
				dense
				dark
				min-width="200"
			>
				<v-list-item>
					<div class="kot-sub-header">
						<v-icon size="16"
							class="star-icon"
						>
							star
						</v-icon>
						<span>KOT PRINTER</span>
					</div>
					<div class="hint-for-kot">
						Cheers! First KOT has been already printed.<br>
						For another one, be sure you've updated cart item quantities.
					</div>
				</v-list-item>
				<v-divider />
				<v-list-item-group
					v-for="(item, index) in batchGroupedKOTItems"
					:key="index"
				>
					<v-subheader>
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
						<span>Batch: {{ item.batch }}</span>
					</v-subheader>
					<v-list-item v-for="(cartItem, counter) in item.cartItems"
						:key="counter+5*37"
					>
						<v-list-item-avatar>
							<v-avatar color="red"
								size="30"
								@click="removeFromKotMenu(cartItem)"
							>
								<v-icon>close</v-icon>
							</v-avatar>
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title>{{ cartItem.itemName }}</v-list-item-title>
						</v-list-item-content>
						<v-list-item-action>
							<v-text-field
								v-model="cartItem.quantityDiff"
								class="kot-item-quantity"
								solo
								hide-details="auto"
							/>
						</v-list-item-action>
					</v-list-item>
				</v-list-item-group>
				<v-list-item>
					<v-list-item-content>
						<v-list-item-subtitle>
							Note: By clicking close will remove the menu item just from the <strong>KOT</strong> menu
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
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
		this.$bus.on("refresh-kot-menu", this.initialize)
		await this.initialize()
	},
	beforeUnmount() {
		this.$bus.off("refresh-kot-menu", this.initialize)
	},
	methods: {
		async initialize() {
			this.isLoading = true
			this.batchGroupedKOTItems = []
			await this.$store.dispatch("cart/fetchOrderKOT", {
				orderId: this.orderId
			})
			let tempKOTBatchArray = []
			this.orderKOTItems.forEach(item => {
				if (!tempKOTBatchArray.includes(item.batch)) {
					this.batchGroupedKOTItems.push({
						id: item.id,
						batch: item.batch,
						cartItems: [
							{
								itemName: item["cart_item"].item.name,
								quantity: item["cart_item"].quantity,
								quantityDiff: item["quantity_diff"]
							}
						],
						timestamp: item.timestamp,
					})
					tempKOTBatchArray.push(item.batch)
				} else {
					const objIndex = this.batchGroupedKOTItems.findIndex((obj => obj.batch === item.batch))
					this.batchGroupedKOTItems[objIndex].cartItems.push({
						itemName: item["cart_item"].item.name,
						quantity: item["cart_item"].quantity,
						quantityDiff: item["quantity_diff"]
					})
				}
			})
			console.log(this.batchGroupedKOTItems)
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
					quantity: item.quantityDiff
				})
			})

			this.doc = new jsPDF({
				orientation: "portrait",
				uint: "in",
				format: "dl",
			})
			this.doc
				.setFontSize(10)
				.text(
					"Order ID: " + this.orderId,
					7,
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
		removeFromKotMenu(cartItem) {
			console.log(cartItem)
		}
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
.hint-for-kot {
	padding: .5rem;
	font-size: .75rem;
	line-height: .75rem;
	color: #aaaaaa;
}
</style>
