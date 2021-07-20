<template>
	<v-card
		flat
		tile
		:loading="isLoading"
		class="pa-4 d-flex justify-center align-center"
		width="100vw"
		min-height="100vh"
		color="#ececec"
		style="position: relative"
	>
		<div class="custom-shape-divider-top-1626805676">
			<svg data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
				preserveAspectRatio="none"
			>
				<path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
					class="shape-fill"
				/>
			</svg>
		</div>
		<v-card flat
			color="transparent"
		>
			<v-row no-gutters>
				<v-col xl="8"
					lg="8" md="8"
					sm="8" cols="12"
				>
					<v-card class="pa-0"
						flat
						color="transparent"
						max-width="700"
					>
						<div class="swiper-container pa-1">
							<div class="swiper-wrapper">
								<v-card
									v-for="(item, index) in topItemsSet"
									:key="index"
									class="swiper-slide"
									max-width="140"
									color="transparent elevation-1"
									:class="
										(index+1) === topItemsSet.length ? '' : 'mr-3'
									"
								>
									<v-row class="ma-0 pa-0"
										justify="center" align="center"
									>
										<v-col cols="12"
											class="d-flex justify-center"
										>
											<!-- eslint-disable-next-line vue/no-v-for-template-key-on-child-->
											<v-badge
												avatar
												bordered
												overlap
												bottom
												offset-x="30"
												offset-y="20"
												color="white"
											>
												<template #badge>
													<v-avatar size="25"
														color="transparent"
														class="elevation-4"
													>
														<v-img :src="item.menu_item.item_type[0].badge" />
													</v-avatar>
												</template>

												<v-avatar size="100"
													color="white"
													class="item-image-avatar"
												>
													<v-img
														class="car-image"
														:src="item.menu_item.image"
														max-width="100%"
													/>
												</v-avatar>
											</v-badge>
										</v-col>
										<v-col cols="12"
											class="d-flex justify-center"
										>
											<p class="mb-0 text-center item-name">
												{{ item.menu_item.name }}
											</p>
										</v-col>
										<v-col cols="12"
											class="d-flex justify-center"
										>
											<p class="mb-0 text-center">
												<span class="nrs">NRs</span><span class="number-font item-price">
													{{ item.menu_item.price }}
												</span>
											</p>
										</v-col>
										<v-col cols="12"
											class="d-flex justify-center"
										>
											<v-btn dark
												class="to-cart-btn"
												color="orange"
												min-width="25"
												@click.prevent="addItemToCart(item.menu_item)"
											>
												<v-icon>
													add_shopping_cart
												</v-icon>
											</v-btn>
										</v-col>
									</v-row>
								</v-card>
							</div>
							<div class="swiper-button-next" />
							<div class="swiper-button-prev" />
						</div>
					</v-card>
				</v-col>
				<v-col xl="4"
					lg="4" md="4"
					sm="4" cols="12"
				>
					<v-card-title class="display-2 text-center">
						Hot Items You Can Grab Right Now
					</v-card-title>
				</v-col>
			</v-row>
		</v-card>
	</v-card>
</template>
<script>
import Swiper, { Navigation } from "swiper"
import { mapGetters } from "vuex"

export default {
	name: "HotItemsComponent",
	data: () => ({
		isLoading: false,
		topItemsSet: []
	}),
	computed: {
		...mapGetters({
			topItems: "menuItem/allTopItems"
		})
	},
	async created() {
		await this.initialize()
	},
	mounted() {
		Swiper.use([Navigation]);

		const mySwiper = new Swiper(".swiper-container", {
			slidesPerView: "auto",
			direction: "horizontal",
			loop: false,
			centeredSlides: true,
			spaceBetween: 0,
			speed: 400,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			}
		})
	},
	methods: {
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async addItemToCart(item) {
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
					item: item.id
				})
				if (addedToCart === true) {
					await this.openSnack(`Cheers! ${item.name} is added to cart.`, "success")
					this.$bus.emit("add-cart-count-by-one")
					await this.$store.dispatch("order/withCartItems", {
						id: this.$helper.getCookingOrderId()
					})
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
					withItem: item
				})
			}
		},
		async initialize() {
			this.isLoading = true
			const fetched = await this.$store.dispatch("menuItem/fetchTopItems")
			if (fetched) {
				this.topItemsSet = this.topItems
			}
			this.isLoading = false
		}
	}
}
</script>
<style scoped>
.swiper-pagination{
	bottom: -1px !important;
}
</style>

<style scoped lang="sass">
.hot-items
	display: flex
	justify-content: center
	text-transform: uppercase
	font-size: 1.5rem
	line-height: 1.5rem
	font-family: "Rasa SemiBold", cursive
.item-name
	padding-top: 10px
	width: 100px
	font-size: .87rem
	line-height: .87rem
	font-weight: 500
</style>
<style scoped lang="scss">
.hot-items-card {
	border-radius: 25px !important;
}
.to-cart-btn {
	border-radius: 25px;
}
.swiper-slide {
	border-radius: 25px !important;
	background: linear-gradient(to bottom, #ffdba1, transparent);
}
.item-price {
	color: green;
	font-size: 1.3rem;
}
.nrs {
	color: red;
	font-size: .875rem;
	font-weight: bold;
}
.item-image-avatar {
	max-width: 100%;
	-webkit-transition: all .4s ease; /* Safari and Chrome */
	-moz-transition: all .4s ease; /* Firefox */
	-ms-transition: all .4s ease; /* IE 9 */
	-o-transition: all .4s ease; /* Opera */
	transition: all .4s ease;
	&:hover {
		-webkit-transform:scale(1.2); /* Safari and Chrome */
		-moz-transform:scale(1.2); /* Firefox */
		-ms-transform:scale(1.2); /* IE 9 */
		-o-transform:scale(1.2); /* Opera */
		transform:scale(1.2);
	}
}
</style>
<style>
.custom-shape-divider-top-1626805676 {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
}

.custom-shape-divider-top-1626805676 svg {
	position: relative;
	display: block;
	width: calc(100% + 1.3px);
	height: 500px;
}

.custom-shape-divider-top-1626805676 .shape-fill {
	fill: #e5e5e5;
}
</style>
