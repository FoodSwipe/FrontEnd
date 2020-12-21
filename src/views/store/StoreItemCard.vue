<template>
	<v-card
		:loading="loading"
		class="mx-auto ma-1"
	>
		<template #progress>
			<v-progress-linear
				color="deep-purple"
				height="10"
				indeterminate
			/>
		</template>

		<v-img
			dark
			height="200"
			:src="item.image"
			gradient="to top, rgba(0,0,0, .3), rgba(0,0,0, .7)"
			class="cursor"
			@click="routeToItemDetail()"
		>
			<v-row class="fill-height text-center ma-0 pa-0"
				no-gutters justify="end"
				align="start"
			>
				<v-card class="pa-4"
					width="100%"
					color="transparent"
					flat
				>
					<v-card-title class="item-name py-0 d-flex justify-end">
						{{ item.name }}
					</v-card-title>
					<v-card-text class="px-2">
						<div class="d-flex justify-end item-type-row">
							<span
								v-for="(type, index) in item.item_type"
								:key="index"
								class="pl-1"
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
						</div>
					</v-card-text>
				</v-card>
			</v-row>
		</v-img>

		<v-card-text class="item-details">
			<v-row
				align="center"
				class="ma-0 pa-0"
				no-gutters
			>
				<v-fade-transition>
					<v-col v-if="$vuetify.breakpoint.width > 260"
						cols="10"
					>
						<div>
							<span class="rs">Rs</span><span class="item-price">{{ item.price }}</span>
						</div>
					</v-col>
				</v-fade-transition>
				<v-spacer v-if="$vuetify.breakpoint.width > 300" />
				<v-col cols="2"
					class="ma-0 pa-0"
				>
					<v-card-actions class="ma-0 pa-0">
						<v-tooltip bottom>
							<template #activator="{on, attrs}">
								<v-btn
									color="deep-purple lighten-2"
									icon
									v-bind="attrs"
									v-on="on"
									@click.prevent="addItemToCart(item)"
								>
									<v-icon>
										add_shopping_cart
									</v-icon>
								</v-btn>
							</template>
							<span>Add to cart</span>
						</v-tooltip>
					</v-card-actions>
				</v-col>
			</v-row>
		</v-card-text>
		<v-dialog v-model="startOrder"
			persistent
			max-width="400"
			transition="fab-transition"
		>
			<v-card>
				<v-card-title class="d-flex align-center">
					Start your order right now!
				</v-card-title>
				<v-card-subtitle>
					Please register and login to the system so that we can track your orders and serve you more effectively.
				</v-card-subtitle>
				<v-card-text>
					<v-row class="ma-0 pa-0">
						<v-col cols="12">
							<v-text-field
								id="custom-location"
								v-model="order.custom_location"
								filled
								prepend-inner-icon="room"
								hide-details="auto"
								label="Your exact location"
								clearable
								:error-messages="startOrderFormErrors.custom_location"
							/>
						</v-col>
						<v-col cols="12">
							<v-text-field
								id="custom-contact"
								v-model="order.custom_contact"
								filled
								type="number"
								prepend-inner-icon="call"
								hide-details="auto"
								label="Contact number"
								clearable
								:error-messages="startOrderFormErrors.custom_contact"
							/>
						</v-col>
					</v-row>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn
						color="red darken-1"
						text
						@click="startOrder = false"
					>
						Discard
					</v-btn>
					<v-btn
						color="green darken-1"
						text
						@click="makeOrder()"
					>
						Proceed
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>
<script>
import router from "@/router"
import { mapGetters } from "vuex"

export default {
	name: "StoreItemCard",
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		startOrder: false,
		rememberFirstItem: null,
		loading: false,
		selection: 1,
		order: {
			custom_location: "",
			custom_contact: ""
		}
	}),
	computed: {
		...mapGetters({
			startOrderFormErrors: "order/orderFormFieldErrors"
		})
	},
	methods: {
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		// making a brand new order and pushing item to that order
		async makeOrder() {
			const started = await this.$store.dispatch("order/startOrder", this.order)
			if (started === true) {
				await this.$store.dispatch("cart/addToCart", {
					order: localStorage.getItem("cookingOrder"),
					item: this.rememberFirstItem.id
				})
				this.$bus.emit("add-cart-count")
				await this.openSnack(`Cheers! ${this.rememberFirstItem.name} added to cart.`, "success")
				this.startOrder = false
			} else if (started === 500) {
				await this.openSnack("Internal Server Error.")
			} else {
				await this.openSnack("Please load a valid form.")
			}
		},
		routeToItemDetail() {
			router.push({name: "Product"})
		},
		async addItemToCart(item) {
			if (localStorage.getItem("cookingOrder")) {
				const addedToCart = await this.$store.dispatch("cart/addToCart", {
					order: parseInt(localStorage.getItem("cookingOrder")),
					item: item.id
				})
				if (addedToCart === true) {
					await this.openSnack(`Cheers! ${item.name} added to cart.`, "success")
					this.$bus.emit("add-cart-count")
				} else {
					if (addedToCart.non_field_errors !== undefined) {
						if (Array.isArray(addedToCart.non_field_errors)) {
							await this.openSnack(addedToCart.non_field_errors[0])
						}
					}
				}
			} else {
				await this.$store.dispatch("order/clearFormErrors")
				this.startOrder = true
				this.rememberFirstItem = item
			}
		},
	},
}
</script>
<style scoped lang="scss">
.item-name {
	font-size: 1.2rem;
	line-height: 1.4rem;
	font-weight: 500;
	padding: 0 5px;
}
.item-details {
	padding: 2px 17px 0;
}
.v-card__title {
	font-weight: 400;
}
.item-price {
	color: green;
	font-size: 1.5rem;
	line-height: 1.5rem;
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
</style>
