<template>
	<v-card
		flat
		tile
		color="#fff5e6"
		width="100vw"
	>
		<simple-toolbar />
		<v-divider />
		<v-card
			:loading="isLoading"
			class="mx-auto item-detail-card"
			min-height="95vh"
			flat
			color="transparent"
		>
			<div style="max-width: 700px;"
				class="mx-auto d-flex justify-space-between align-center"
			>
				<v-breadcrumbs v-if="!isLoading"
					:items="itemDetailBreadcrumbs"
					class="px-1"
				>
					<template #item="{ item }">
						<v-breadcrumbs-item
							class="home-breadcrumb-item"
							:to="item.href"
							:disabled="item.disabled"
						>
							{{ item.text.toUpperCase() }}
						</v-breadcrumbs-item>
					</template>
				</v-breadcrumbs>
				<v-tooltip bottom>
					<template #activator="{on, attrs}">
						<v-btn icon
							v-bind="attrs"
							v-on="on"
							@click="$router.go(-1)"
						>
							<v-icon>arrow_back</v-icon>
						</v-btn>
					</template>
					<span>Go Back</span>
				</v-tooltip>
			</div>
			<v-card color="transparent"
				flat
				min-height="93vh"
				class="d-flex align-center justify-center"
			>
				<div>
					<!--item image column-->
					<transition
						appear
						:css="false"
						@before-enter="beforeEnter"
						@enter="enter"
					>
						<v-card
							height="40vh"
							max-width="650"
							width="80vw"
							class="mx-auto"
						>
							<v-img
								:src="item.image"
								height="40vh"
								width="80vw"
								max-width="650"
								class="item-image"
							/>
						</v-card>
					</transition>
					<div class="to-cart-column mb-1">
						<v-btn
							:loading="loadingCartBtn"
							fab
							:dark="!isItemInCart"
							color="blue-gradient"
							:disabled="isItemInCart"
							@click="addItemToCart()"
						>
							<v-icon dark>
								add_shopping_cart
							</v-icon>
						</v-btn>
					</div>
					<!--crucial details				-->
					<v-card-title class="pt-0 d-flex justify-center">
						{{ item.name }}
						<span
							v-for="(type, index) in item.type"
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
											:src="type.image"
										/>
									</v-avatar>
								</template>
								<span>{{ type.name }}</span>
							</v-tooltip>
						</span>
					</v-card-title>
					<transition
						appear
						@before-enter="beforeEnterPriceItem"
						@enter="enterPriceItem"
					>
						<div class="d-flex justify-center align-center">
							<v-avatar
								color="orange"
								class="elevation-14 mr-1"
								:size="
									$vuetify.breakpoint.width > 275
										? '58'
										: $vuetify.breakpoint.width < 210
											? '28'
											: '40'
								"
							>
								<v-img
									src="https://img.favpng.com/9/19/5/debt-money-icon-png-favpng-6dDfYYnZeiZEX7tficdEdr97q.jpg"
								/>
							</v-avatar>
							<div class="ml-1">
								<v-list-item-title class="price">
									{{ item.price }}
								</v-list-item-title>
								<v-list-item-subtitle>Price (RS)</v-list-item-subtitle>
							</div>
						</div>
					</transition>
					<v-list class="extra-details pt-0 mx-auto text-center"
						dense two-line
						max-width="412"
						color="transparent"
					>
						<v-row class="ma-0 pa-0"
							no-gutters
						>
							<v-col v-for="(extraDetail, index) in getExtraDetailsArray"
								:key="index"
								cols="4"
							>
								<v-list-item
									@click="1"
								>
									<v-list-item-content>
										<v-list-item-subtitle class="text-capitalize">
											{{ extraDetail.field }}
										</v-list-item-subtitle>
										<v-list-item-title>
											{{ extraDetail.value }}
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-col>
						</v-row>
					</v-list>
					<v-avatar v-if="item.is_bar_item"
						size="100"
						tile
					>
						<v-img contain
							:src="require('@/assets/bar_item_png.png')"
						/>
					</v-avatar>
					<v-list class="ingredients-list pt-0 mx-auto text-center"
						dense
						max-width="800"
						color="transparent"
					>
						<div class>
							<v-icon small
								color="pink lighten-1"
							>
								casino
							</v-icon>
							<span class="ingredients text-uppercase pink--text mx-1">Ingredients</span>
						</div>
						<v-card color="transparent"
							width="100vw"
							flat tile
							class="d-flex justify-center align-center flex-wrap"
						>
							<v-chip v-for="(ingredient, index) in item.ingredients"
								:key="index"
								small
								:class="
									(index === item.ingredients.length) ? '' : 'mr-2'
								"
							>
								{{ ingredient }}
							</v-chip>
						</v-card>
					</v-list>
					<v-card-actions>
						<v-btn
							:loading="loadingCartBtn"
							dark
							class="my-gradient"
							block
							:disabled="isItemInCart"
							@click.prevent="addItemToCart()"
						>
							<v-icon>
								add_shopping_cart
							</v-icon>
							<span v-if="$vuetify.breakpoint.width > 240"
								class="pl-2"
							>
								Add to cart
							</span>
						</v-btn>
					</v-card-actions>
				</div>
			</v-card>
			<hot-items />
		</v-card>
	</v-card>
</template>
<script>
import gsap from "gsap"
import { mapGetters } from "vuex"
import SimpleToolbar from "@/components/SimpleToolbar"

export default {
	name: "ItemDetailView",
	components: {
		SimpleToolbar,
		HotItems: () => import("@/views/home/components/HotItems"),
	},
	data: () => ({
		myReview: "",
		isLoading: false,
		isItemInCart: false,
		loadingCartBtn: false,
	}),
	computed: {
		...mapGetters({
			item: "menuItem/detailMenuItem",
			order: "order/detailOrder"
		}),
		getExtraDetailsArray() {
			return [
				{ field: "weight (in grams)", value: this.item.weight },
				{ field: "calorie in (kCal)", value: this.item.calorie },
				{ field: "Scale", value: this.item.scale },
			]
		},
		itemDetailBreadcrumbs() {
			return [
				{
					text: "> Home",
					disabled: false,
					href: "/",
				},
				{
					text: this.item.name,
					disabled: true,
					href: "",
				}
			]
		}
	},
	async created() {
		await this.initialize()
	},
	methods: {
		async addItemToCart() {
			if (this.$helper.isAuthenticated()) {
				const currentUser = this.$helper.getCurrentUser()
				this.$bus.emit("start-order-prefill", {
					order: {
						custom_location: currentUser.profile.address,
						custom_contact: (currentUser.profile.contact)
							? currentUser.profile.contact.replace(/\D/g, "")
							: null
					}
				})
			}

			if (this.$helper.getCookingOrderId()) {
				const addedToCart = await this.$store.dispatch("cart/addToCart", {
					order: parseInt(this.$helper.getCookingOrderId()),
					item: this.item.id
				})
				if (addedToCart === true) {
					await this.openSnack(`Cheers! ${this.item.name} is added to cart.`, "success")
					this.$bus.emit("add-cart-count-by-one")
				} else {
					if (addedToCart.non_field_errors !== undefined) {
						if (Array.isArray(addedToCart.non_field_errors)) {
							if (addedToCart.non_field_errors[0] === "The fields order, item must make a unique set.") {
								await this.openSnack("Item already added to cart.")
							}
						}
					}
				}
			} else {
				this.$bus.emit("start-order", {
					withItem: this.item
				})
			}
		},
		async initialize() {
			this.isLoading = true
			await this.$store.dispatch("menuItem/getDetail", {id: this.$route.params.id})
			if (this.$helper.getCookingOrderId()) {
				await this.$store.dispatch("order/withCartItems", {
					id: this.$helper.getCookingOrderId()
				})
				if (this.order && this.item) {
					this.order.cart_items.forEach(cart_item => {
						if (cart_item.item.name === this.item.name) this.isItemInCart = true
					})
				}
			}
			this.isLoading = false
		},
		beforeEnter(el) {
			el.style.opacity = 0
			el.style.transform = "scale(0,0)"
		},
		enter(el, done) {
			gsap.to(el, {
				duration: 1,
				opacity: 1,
				scale: 1,
				ease: "bounce.out",
				onComplete: done
			})
		},
		beforeEnterPriceItem(el) {
			el.style.opacity = 0
			el.style.transform = "scale(0,0)"
		},
		enterPriceItem(el, done) {
			gsap.to(el, {
				duration: 1,
				opacity: 1,
				scale: 1,
				onComplete: done
			})
		}
	}
}
</script>
<style lang="scss" scoped>
.refill-space {
	position: absolute;
	top:0;
	height: 350px;
	width: 100%;
	overflow: hidden;
	background-color: #3ebae7
}
.custom-shape-divider-top-1608750235 {
	position: absolute;
	top: 350px;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
}

.custom-shape-divider-top-1608750235 svg {
	position: relative;
	display: block;
	width: calc(100% + 1.3px);
	height: 147px;
}

.custom-shape-divider-top-1608750235 .shape-fill {
	fill: #3ebae7;
}
.my-gradient {
	background: linear-gradient(to right, #fff5e6, orange, #fff5e6);
	border: none;
	box-shadow: none;
	padding: 0;
}
.item-detail-card {
	scroll-behavior: smooth;
}
.price {
	transition: all .3s;
	font-family: 'Yeon Sung', cursive;
	font-size: 2.4rem !important;
	line-height: 2.4rem !important;
	color: green;
	@media only screen and (max-width: 230px) {
		font-size: 2rem;
		line-height: 2rem;
	}
	@media only screen and (max-width: 210px) {
		font-size: 1.52rem;
		line-height: 1.52rem;
	}
}
.to-cart-column {
	display: flex;
	justify-content: center;
	margin-top: -24px;
}
.reviews {
	transition: all .3s;
	font-size: 3.5rem;
	line-height: 3.5rem;
	text-transform: capitalize;
	font-family: 'Sacramento', cursive;
	@media only screen and (max-width: 700px) {
		font-size: 3rem;
		line-height: 3rem;
	}
	@media only screen and (max-width: 599px) {
		font-size: 2.1rem;
		line-height: 2.1rem;
	}
	@media only screen and (max-width: 400px) {
		font-size: 2rem;
		line-height: 2rem;
	}
}
</style>
<style lang="sass" scoped>
::v-deep.v-list-item__title
	white-space: normal !important
::v-deep.v-list-item__subtitle
	white-space: normal !important
.timeline-user-name
	font-size: 1rem
	line-height: 1rem
.review-sec
	position: absolute !important
	top: 320px
.ingredients
	font-size: .75rem
.bar-image
	margin-top: -30px !important
.item-image
	border-radius: 20px
.review-field
	max-width: 900px
.relative
	position: relative
</style>
