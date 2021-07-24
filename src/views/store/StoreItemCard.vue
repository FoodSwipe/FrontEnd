<template>
	<v-card
		:loading="loading"
		class="mx-auto ma-1 store-item-card"
		color="rgb(255 251 246)"
		min-height="380"
	>
		<template #progress>
			<v-progress-linear
				color="deep-purple"
				height="10"
				indeterminate
			/>
		</template>

		<v-card class="overflow-hidden"
			height="200"
		>
			<v-img
				dark
				height="200"
				:src="item.image"
				gradient="to top, rgba(0,0,0, .3), rgba(0,0,0, .5)"
				class="cursor store-item-image"
				@click="routeToItemDetail(item)"
			/>
		</v-card>

		<div class="description">
			<v-card-text class=" pt-2 pb-0">
				<div class="text-center item-name cursor"
					@click="routeToItemDetail(item)"
				>
					{{ item.name }}
				</div>
			</v-card-text>
			<v-card-subtitle class="text-center py-0">
				<span
					v-for="(type, index) in item.item_type"
					:key="index"
					class="px-1"
				>
					<v-tooltip bottom>
						<template #activator="{on, attrs}">
							<v-avatar
								class="elevation-1"
								size="20"
								v-bind="attrs"
								v-on="on"
							>
								<v-img
									:src="type.badge"
								/>
							</v-avatar>
						</template>
						<span>{{ type.name }}</span>
					</v-tooltip>
				</span>
			</v-card-subtitle>

			<v-card-text class="item-details text-center">
				<v-row
					align="center"
					class="ma-0 pa-0"
					no-gutters
				>
					<v-fade-transition>
						<v-col
							cols="12"
							class="py-4"
						>
							<div>
								<span class="rs">Rs</span><span class="item-price">{{ item.price }}</span>
							</div>
						</v-col>
					</v-fade-transition>
					<v-spacer v-if="$vuetify.breakpoint.width > 300" />
					<v-col cols="12"
						class="ma-0 pa-0"
					>
						<v-fade-transition>
							<v-card-actions v-if="!cartItems[item.name]"
								class="ma-0 pa-0 d-flex justify-center"
							>
								<v-tooltip bottom>
									<template #activator="{on, attrs}">
										<v-btn
											dark
											class="add-to-cart-button"
											color="orange"
											v-bind="attrs"
											v-on="on"
											@click.prevent="addItemToCart(item)"
										>
											<v-icon size="20">
												add_shopping_cart
											</v-icon>
										</v-btn>
									</template>
									<span>Add to cart</span>
								</v-tooltip>
							</v-card-actions>
						</v-fade-transition>
					</v-col>
				</v-row>
			</v-card-text>
		</div>
	</v-card>
</template>
<script>
import { mapGetters } from "vuex"
import Snack from "@/mixin/Snack"

export default {
	name: "StoreItemCard",
	mixins: [Snack],
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		rememberFirstItem: null,
		loading: false,
		selection: 1,
		orderInProgress: null
	}),
	computed: {
		...mapGetters({
			pendingOrder: "order/detailOrder"
		}),
		cartItems() {
			const items = {}
			if (!this.pendingOrder) return items
			this.pendingOrder["cart_items"].forEach(item => {
				items[item.item.name] = item
			})
			return items
		}
	},
	methods: {
		routeToItemDetail(item) {
			this.$router.push(`product/${item.id}`)
		},
		async addItemToCart(item) {
			if (this.$helper.getCookingOrderId()) {
				this.$bus.emit("add-item-to-cart", {
					withItem: item
				})
			} else {
				if (this.$helper.isAuthenticated()) {
					const currentUser = this.$helper.getCurrentUser()
					// set last order location ? TBD
					this.$bus.emit("start-order-prefill", {
						order: {
							custom_location: currentUser.profile.address,
							custom_contact: (currentUser.profile.contact)
								? currentUser.profile.contact.replace(/\D/g, "")
								: null
						},
						withItem: item
					})
				}
				else {
					this.$bus.emit("start-order", {
						withItem: item
					})
				}
			}
		},
	},
}
</script>
<style scoped lang="scss">
.item-details {
	padding: 2px 17px 0;
}
.v-card__title {
	font-weight: 400;
}
.item-price {
	color: green;
	font-size: 1.4rem;
	line-height: 1.4rem;
	font-family: 'Yeon Sung', cursive;
}
.rs {
	font-size: .8rem;
	line-height: .8rem;
	font-weight: bold;
	color: red;
	padding-right: 4px;
}
.item-type-row {
	width: 100%;
}
.store-item-card {
	overflow: hidden;
	&:hover {
		.store-item-image {
			-webkit-transform:scale(1.1); /* Safari and Chrome */
			-moz-transform:scale(1.1); /* Firefox */
			-ms-transform:scale(1.1); /* IE 9 */
			-o-transform:scale(1.1); /* Opera */
			transform:scale(1.1);
		}
	}
}
.store-item-image {
	transition: transform .25s ease-in-out;
}
.item-name {
	transition: padding-top .25s ease;
	font-size: 1rem;
	line-height: 1rem;
	font-weight: 500;
	padding: 10px 5px 0;
	color: #2d2d2d;
	@media only screen and (max-width: 600px) {
		font-size: .875rem;
		line-height: .875rem;
	}
}
.name-type-group {
	@media only screen and (min-width: 600px) {
		height: 64px;
	}
}
.add-to-cart-button {
	border-radius: 30px;
	margin-bottom: 20px;
}
</style>
