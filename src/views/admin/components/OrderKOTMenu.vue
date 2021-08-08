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
			max-width="400"
			nudge-top="-20"
		>
			<v-list
				dense
				dark
				max-width="400"
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
						Cheers! The first KOT has been already printed.<br>
						For another one, be sure you've updated cart item quantities.
					</div>
					<v-tooltip bottom>
						<template #activator="{attrs, on}">
							<v-btn
								icon :loading="generatingKot"
								v-bind="attrs" v-on="on"
								@click="generatePostKot"
							>
								<v-icon>refresh</v-icon>
							</v-btn>
						</template>
						<span>Refresh KOT</span>
					</v-tooltip>
				</v-list-item>
				<v-divider />
				<v-list-item-group
					v-for="(item, index) in batchGroupedKOTItems"
					:key="index"
				>
					<div class="d-flex justify-space-between align-center pa-2">
						<v-chip label
							small class="point875"
						>
							Batch: {{ item.batch }}
						</v-chip>
						<v-btn
							:loading="creatingDoc"
							small
							color="orange"
							text
							@click="generateKOTPDF(item)"
						>
							Print
						</v-btn>
					</div>
					<v-list-item v-for="(cartItem, counter) in item.cartItems"
						:key="counter+5*37"
						disabled
					>
						<v-list-item-avatar>
							<v-avatar color="grey"
								size="30"
							>
								<v-img
									:src="cartItem.itemImage"
								/>
							</v-avatar>
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title>{{ cartItem.itemName }}</v-list-item-title>
						</v-list-item-content>
						<v-list-item-action-text>
							<span class="number-font"
								style="font-size: 26px"
							>
								{{ cartItem.quantityDiff }}
							</span>
						</v-list-item-action-text>
					</v-list-item>
				</v-list-item-group>
				<v-divider />
				<v-list-item>
					<v-list-item-content>
						<p class="mb-0"
							style="font-size: 12px;"
						>
							Note: The first KOT is only automatically generated. Preceding KOTs should be refreshed by the operator manually after updating the order.
						</p>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>
<script>
import { mapGetters } from "vuex"
import jsPDF from "jspdf"
import Snack from "@/mixin/Snack"

export default {
	mixins: [Snack],
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
	emits: ["refresh"],
	data: () => ({
		isLoading: null,
		showKOTMenu: false,
		x: 0,
		y: 0,
		batchGroupedKOTItems: [],
		doc: null,
		creatingDoc: false,
		generatingKot: false,
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
			this.batchGroupedKOTItems = this.$helper.groupOrderKOTByBatch(this.orderKOTItems)
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
			this.creatingDoc = true
			this.doc = new jsPDF({
				orientation: "portrait",
				uint: "in",
				format: "dl",
			})
			this.$helper.generateKOTPDF(kotItem, this.doc, this.orderId)
			this.creatingDoc = false
		},
		async generatePostKot() {
			this.generatingKot = true
			const status = await this.$store.dispatch("cart/generatePostKotForOrder", {id: this.orderId})
			this.generatingKot = false
			if (status) {
				this.$emit("refresh")
				await this.initialize()
			} else {
				await this.openSnack("Kot refresh failed.", "error")
			}
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
