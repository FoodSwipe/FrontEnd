<template>
	<v-card max-width="600"
		flat
		class="mx-auto review-order-card"
	>
		<div class="order-card-header pt-1">
			<v-card-title class="grey--text text--darken-3">
				<v-icon>rate_review</v-icon>
				<span class="pl-3">Review Ordered Items</span>
			</v-card-title>
			<v-card-subtitle class="grey--text text--darken-3">
				Lets add some review to your ordered items so that others can decide according to your views.
			</v-card-subtitle>
		</div>
		<v-card-text class="card-text pb-8">
			<v-expansion-panels focusable
				popout
			>
				<v-expansion-panel
					v-for="(item,i) in cartItemsList"
					:key="i"
				>
					<v-expansion-panel-header>
						<template #default>
							<v-avatar size="60"
								max-width="60"
							>
								<v-img :src="item.item.image" />
							</v-avatar>
							<span class="pl-3">{{ item.item.name }}</span>
						</template>
					</v-expansion-panel-header>
					<v-expansion-panel-content>
						<v-divider class="py-2" />
						<v-text-field
							v-model="reviewItem[item.item.name]"
							clearable
							filled
							:label="'Add review for ' + item.item.name"
							prepend-inner-icon="chat"
							hide-details
						>
							<template #append>
								<v-btn icon
									@click="writeReview(item.item)"
								>
									<v-icon color="#774803"
										class="tilt"
									>
										send
									</v-icon>
								</v-btn>
							</template>
						</v-text-field>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-card-text>
		<v-card-actions class="d-flex justify-center py-6">
			<v-btn filled
				dark
				to="/store"
				color="purple-gradient"
			>
				<v-icon>store</v-icon>
				<span v-if="$vuetify.breakpoint.width > 320"
					class="pl-2"
				>Return to store</span>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script>
import { mapGetters } from "vuex"

export default {
	name: "ReviewOrderView",
	data: () => ({
		isLoading: false,
		cartItemsList: [],
		reviewItem: {}
	}),
	computed: {
		...mapGetters({
			currentOrder: "order/detailOrder"
		})
	},
	async created() {
		await this.initialize()
	},
	methods: {
		async initialize() {
			this.isLoading = true
			await this.$store.dispatch("order/withCartItems", {
				id: this.$route.params.id
			})
			this.cartItemsList = this.currentOrder.cart_items
			this.isLoading = false
		},
		writeReview(item) {
			console.log(item)
		}
	}
}
</script>
<style lang="scss" scoped>
.review-order-card {
	transition: all .3s ease;
	margin: -130px 0 50px 0;
	background-color: transparent;
	@media only screen and (max-width: 600px) {
		margin: 0 0 50px 0;
		background-color: transparent;
	}
}
.tilt {
	transform: rotate(305deg);
}
.card-text {
	background-color: rgba(255, 193, 7, 0.17);
	border-radius: 20px !important;
	margin-top: -30px;
	padding-top: 45px;
}
</style>
