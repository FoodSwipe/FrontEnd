<template>
	<v-card max-width="600"
		flat
		class="mx-auto review-order-card transparent"
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
					@click="clearFormErrors()"
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
						<v-row class="ma-0 pa-0">
							<v-col cols="12">
								<v-file-input
									id="member-image-input"
									v-model="reviewItem['imageForUpload']"
									filled
									small-chips
									show-size
									accept="image/*"
									label="Add Image"
									clearable
									multiple
									prepend-icon=""
									prepend-inner-icon="camera"
									hide-details="auto"
									:error-messages="formErrors.image"
								/>
							</v-col>
							<v-col cols="12">
								<v-textarea
									v-model="reviewItem['review']"
									clearable
									filled
									label="Your review here"
									prepend-inner-icon="chat"
									hide-details="auto"
									counter
									:error-messages="formErrors.review"
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
								</v-textarea>
							</v-col>
						</v-row>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-card-text>
		<v-card-actions class="d-flex justify-center py-6">
			<v-btn filled
				dark
				to="/store"
				color="light-orange-gradient"
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
import { getFormData } from "@/Helper"

export default {
	name: "ReviewOrderView",
	beforeRouteLeave(to, from, next) {
		this.$helper.removeCookingOrderIdFromLocalStorage()
		this.$store.dispatch("order/clearOrderDetail")
		next()
	},
	data: () => ({
		isLoading: false,
		cartItemsList: [],
		reviewItem: {
			imageForUpload: [],
			review: ""
		},
	}),
	computed: {
		...mapGetters({
			currentOrder: "order/detailOrder",
			formErrors: "review/addReviewFormErrors"
		}),
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
		async clearFormErrors() {
			await this.$store.dispatch("review/clearAddReviewFormErrorMessages")
		},
		async openSnack(text, color="success") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async writeReview(item) {
			let payload = {
				review: this.reviewItem.review,
				menu_item: item.id,
				reviewer: this.currentOrder.created_by,
				reviewer_contact: this.currentOrder.custom_contact,
			}
			if (this.reviewItem.imageForUpload.length > 0) {
				payload["image"] = this.reviewItem.imageForUpload[0]
			}
			payload = await getFormData(payload)
			const reviewed = await this.$store.dispatch("review/addReviewForMenuItem", payload)
			if (reviewed === true) {
				await this.$store.dispatch("review/clearAddReviewFormErrorMessages")
				await this.openSnack("Review added successfully")
				const indexOfItem = this.cartItemsList.indexOf(item)
				this.cartItemsList.splice(indexOfItem, 1)
			}
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
.card-text {
	background-color: rgba(255, 193, 7, 0.17);
	border-radius: 20px !important;
	margin-top: -30px;
	padding-top: 45px;
}
::v-deep.v-expansion-panel-content > .v-expansion-panel-content__wrap {
	padding: 0 10px;
}
</style>
