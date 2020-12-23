<template>
	<div>
		<v-card
			:loading="isLoading"
			class="mx-auto item-detail-card"
			max-width="1200"
			flat
			color="transparent"
		>
			<v-card color="transparent"
				flat
			>
				<v-row class="ma-0 pa-0"
					no-gutters
				>
					<!--item image column-->
					<v-col cols="12"
						class="pt-0 pt-sm-12 pt-md-12 pt-lg-12 pt-xl-12"
					>
						<transition
							appear
							:css="false"
							@before-enter="beforeEnter"
							@enter="enter"
						>
							<v-img
								:src="item.image"
								max-height="40vh"
								max-width="600"
								class="item-image mx-auto"
							/>
						</transition>
						<div class="to-cart-column mb-1">
							<v-btn fab
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
					</v-col>
					<!--crucial details				-->
					<v-col cols="12">
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
						<v-row v-if="item.is_bar_item"
							class="ma-0 pa-0 bar-image"
							justify="center"
						>
							<v-avatar size="100"
								tile
							>
								<v-img contain
									:src="require('@/assets/bar_item_png.png')"
								/>
							</v-avatar>
						</v-row>
						<v-list class="ingredients-list pt-0 mx-auto text-center"
							dense
							max-width="800"
						>
							<div class>
								<v-icon small
									color="pink lighten-1"
								>
									casino
								</v-icon>
								<span class="ingredients text-uppercase pink--text mx-1">Ingredients</span>
							</div>
							<v-row class="ma-0 pa-1"
								no-gutters
								justify="center"
							>
								<v-slide-group show-arrows>
									<v-slide-item v-for="(ingredient, index) in item.ingredients"
										:key="index"
									>
										<v-chip small
											:class="
												(index === item.ingredients.length) ? '' : 'mr-2'
											"
										>
											{{ ingredient }}
										</v-chip>
									</v-slide-item>
								</v-slide-group>
							</v-row>
						</v-list>
						<div class="actions px-4">
							<v-btn dark
								class="my-gradient"
								block
								:disabled="isItemInCart"
								@click.prevent="addItemToCart()"
							>
								<v-icon>
									add_shopping_cart
								</v-icon>
								<v-fade-transition mode="out-in">
									<span v-if="$vuetify.breakpoint.width > 240"
										class="pl-2"
									>Add to cart</span>
								</v-fade-transition>
							</v-btn>
						</div>
					</v-col>
				</v-row>
			</v-card>
			<hot-items />
		</v-card>
		<div class="relative">
			<div class="refill-space" />
			<div class="custom-shape-divider-top-1608750235">
				<svg data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
					preserveAspectRatio="none"
				>
					<path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
						opacity=".25" class="shape-fill"
					/>
					<path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
						opacity=".5" class="shape-fill"
					/>
					<path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
						class="shape-fill"
					/>
				</svg>
			</div>
			<v-card-text class="review-sec">
				<div class="d-flex align-center">
					<v-subheader>
						<v-avatar
							color="lightblue"
							class="elevation-4"
							style="border: 3px solid rgb(19 74 92);"
							:size="
								$vuetify.breakpoint.width > 600
									? '70'
									: $vuetify.breakpoint.width < 400
										? '30'
										: '45'
							"
						>
							<v-icon
								:size="
									$vuetify.breakpoint.width > 600
										? '25'
										: $vuetify.breakpoint.width < 400
											? '12'
											: '16'
								"
							>
								rate_review
							</v-icon>
						</v-avatar><span class="pl-2 reviews">reviews</span>
					</v-subheader>
					<v-text-field
						id="my-review"
						v-model="myReview"
						class="review-field"
						color="black"
						clearable
						placeholder="Add a review..."
						filled
						prepend-inner-icon="text_fields"
						hide-details="auto"
					>
						<template #append>
							<v-btn icon>
								<v-icon
									class="tilt"
								>
									send
								</v-icon>
							</v-btn>
						</template>
					</v-text-field>
				</div>
				<v-card class="ma-0 pa-0 mx-auto"
					max-width="900"
					flat
					color="transparent"
				>
					<v-timeline dense
						reverse
					>
						<v-timeline-item
							v-for="n in 4"
							:key="n"
							large
						>
							<template #icon>
								<v-avatar>
									<v-img src="http://i.pravatar.cc/64" />
								</v-avatar>
							</template>
							<template #opposite>
								<span>June 15, 2020</span>
							</template>
							<v-card class="elevation-2">
								<v-card-title class="timeline-user-name py-2">
									Lorem ipsum
								</v-card-title>
								<v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>
							</v-card>
						</v-timeline-item>
					</v-timeline>
				</v-card>
			</v-card-text>
		</div>
		<start-order-component />
	</div>
</template>
<script>
import gsap from "gsap"
import { mapGetters } from "vuex"
import StartOrderComponent from "@/components/StartOrder"

export default {
	name: "ItemDetailView",
	components: {
		StartOrderComponent,
		HotItems: () => import("@/views/home/components/HotItems"),
	},
	data: () => ({
		myReview: "",
		isLoading: false,
		isItemInCart: false,
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
		getStatDetailsArray() {
			return [
				{ field: "Total order appearances", value: 50 },
				{ field: "Total purchases", value: 50 },
				{ field: "Available?", value: this.item.isAvailable },
			]
		}
	},
	async created() {
		await this.initialize()
	},
	methods: {
		async addItemToCart() {
			console.log("here")
			if (this.$helper.isAuthenticated()) {
				const currentUser = this.$helper.getCurrentUser()
				this.$bus.emit("start-order-prefill", {
					order: {
						custom_location: currentUser.profile.address,
						custom_contact: currentUser.profile.contact.replace(/\D/g, "")
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
	height: 550px;
	width: 100%;
	overflow: hidden;
	background: #3ebae7 url("https://synapsiscreative.com/wp-content/uploads/2018/02/interactive-content1.png") center center no-repeat;
}
.custom-shape-divider-top-1608750235 {
	position: absolute;
	top: 550px;
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
	background: linear-gradient(to right, white, orange, white);
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
	font-size: 4.5rem;
	line-height: 4.5rem;
	text-transform: capitalize;
	font-family: 'Sacramento', cursive;
	@media only screen and (max-width: 700px) {
		font-size: 3.5rem;
		line-height: 3.5rem;
	}
	@media only screen and (max-width: 599px) {
		font-size: 3rem;
		line-height: 3rem;
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
	position: relative !important
	padding-top: 450px
.ingredients
	font-size: .75rem
.bar-image
	margin-top: -30px !important
.item-image
	border-radius: 20px
	@media only screen and (max-width: 599px)
			border-radius: 0 0 20px 20px
.review-field
	max-width: 900px
.relative
	position: relative
</style>
