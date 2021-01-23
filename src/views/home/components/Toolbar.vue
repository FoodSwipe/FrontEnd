<template>
	<div>
		<v-app-bar
			app
			color="transparent"
			width="100vw"
			class="ma-0 pa-0 elevation-0 food-swipe-toolbar"
		>
			<div class="welcome subtitle-2 white--text">
				Welcome to Food Swipe Online!
			</div>
			<v-spacer />
			<div class="social-networks px-2">
				<v-avatar size="20"
					class="mx-1 cursor"
					@click="routeToFoodSwipeFacebookPage()"
				>
					<v-img
						:src="require('@/assets/mat_fb_icon.png')"
					/>
				</v-avatar>
				<v-avatar size="18"
					class="mx-1 cursor"
					@click="routeToFoodSwipeInstaPage()"
				>
					<v-img
						:src="require('@/assets/red_insta_icon.png')"
					/>
				</v-avatar>
			</div>
			<v-icon size="16"
				color="white"
				class="public-contact-icon"
			>
				call
			</v-icon>
			<p class="ma-0 public-contact">
				+9779802801073,
				+9779802801077
			</p>
			<template #extension>
				<div class="organization-title">
					<v-card-title class="org-name"
						:class="($route.name !== 'Food Swipe') ? 'cursor': ''"
						@click="toHome"
					>
						Food Swipe
					</v-card-title>
					<v-fade-transition>
						<v-card-subtitle v-if="$route.name !== 'Food Swipe'">
							{{ $route.name }}
						</v-card-subtitle>
					</v-fade-transition>
				</div>
				<!--				<div class="nav-links px-2 fill-height">-->
				<!--					<v-btn text-->
				<!--						class="nav-btn rounded-0"-->
				<!--						min-height="100%"-->
				<!--						@click="toStore()"-->
				<!--					>-->
				<!--						Store-->
				<!--					</v-btn>-->
				<!--				</div>-->
				<v-spacer />
				<v-tooltip v-if="currentUser === null"
					bottom
				>
					<template #activator="{on, attrs}">
						<v-scale-transition>
							<v-btn
								v-bind="attrs"
								icon
								small
								class="pr-0 mr-sm-6 mr-md-6 mr-lg-6 mr-xl-6 cursor"
								v-on="on"
								@click.stop="toggleDrawerState()"
							>
								<v-icon :size="($vuetify.breakpoint.width > 300)
									? ''
									: '16'"
								>
									input
								</v-icon>
							</v-btn>
						</v-scale-transition>
					</template>
					<span>Login</span>
				</v-tooltip>
				<v-menu
					v-else
					close-on-content-click
					offset-y
					transition="fab-transition"
					nudge-left="10"
					nudge-bottom="5"
				>
					<template #activator="{on, attrs}">
						<v-btn
							icon
							small
							class="pr-0 mr-sm-6 mr-md-6 mr-lg-6 mr-xl-6 profile-avatar cursor"
							v-bind="attrs"
							v-on="on"
						>
							<v-icon :size="
								$vuetify.breakpoint.width > 300
									? ''
									: '16'
							"
							>
								account_circle
							</v-icon>
						</v-btn>
					</template>
					<v-list color="orange lighten-4">
						<v-list-item>
							<v-list-item-icon class="mr-2">
								<v-icon>account_circle</v-icon>
							</v-list-item-icon>
							<v-list-item-title class="cursor"
								@click="toProfile()"
							>
								Profile
							</v-list-item-title>
						</v-list-item>
						<v-divider class="ml-4" />
						<v-list-item v-if="showAdminButton"
							class="cursor"
						>
							<v-list-item-icon class="mr-2">
								<v-icon>settings_applications</v-icon>
							</v-list-item-icon>
							<v-list-item-title @click="toAdminPanel()">
								Settings
							</v-list-item-title>
						</v-list-item>
						<v-divider class="ml-4" />
						<v-list-item class="cursor">
							<v-list-item-icon class="mr-2">
								<v-icon>input</v-icon>
							</v-list-item-icon>
							<v-list-item-title @click="logOut()">
								Logout
							</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
				<v-fade-transition>
					<v-badge
						dark
						color="black"
						:content="cartCount"
						offset-x="10"
						offset-y="15"
					>
						<v-tooltip bottom>
							<template #activator="{on, attrs}">
								<v-btn
									:disabled="$route.name === 'Cart'"
									light
									icon
									small
									class="mr-2"
									v-bind="attrs"
									@click="toCart()"
									v-on="on"
								>
									<v-icon
										:size="
											$vuetify.breakpoint.width > 300
												? ''
												: '16'
										"
									>
										shopping_cart
									</v-icon>
								</v-btn>
							</template>
							<span>Cart</span>
						</v-tooltip>
					</v-badge>
				</v-fade-transition>
			</template>
		</v-app-bar>
		<auth-sidebar />
	</div>
</template>

<script>
import router from "@/router"
import { mapGetters } from "vuex"
import AuthSidebar from "@/views/home/components/AuthSidebar"

export default {
	name: "HomeToolbarComponent",
	components: { AuthSidebar },
	data: () => ({
		showAdminButton: false,
		loginBanner: require("@/assets/banner_1.jpg"),
		currentUser: null,
		cartCount: "0",
	}),
	computed: {
		...mapGetters({
			alreadyCookingOrder: "order/detailOrder"
		}),
	},
	async created() {
		this.$bus.on("set-cart-count", this.setCartCount)
		this.$bus.on("add-cart-count-by-one", this.addCartCountByOne)
		this.$bus.on("subtract-cart-count", this.subtractCartCount)
		this.$bus.on("update-cart-count", this.updateCartCount)
		this.$bus.on("refresh-profile", this.refreshProfile)

		await this.initialize()
	},
	beforeUnmount() {
		this.$bus.off("set-cart-count", this.setCartCount)
		this.$bus.off("add-cart-count-by-one", this.addCartCountByOne)
		this.$bus.off("subtract-cart-count", this.subtractCartCount)
		this.$bus.off("refresh-profile", this.refreshProfile)
	},
	methods: {
		async initialize() {
			this.currentUser = this.$helper.getCurrentUser()
			this.showAdminButton = this.$helper.isAdminUser()
			const cookingOrder = this.$helper.getCookingOrderId()
			if (cookingOrder) {
				await this.$store.dispatch("order/withCartItems", {
					id: cookingOrder
				})
				this.cartCount = this.alreadyCookingOrder.total_items.toString()
			}
		},
		refreshProfile() {
			this.initialize()
		},
		routeToFoodSwipeFacebookPage() {
			window.open(this.$constants.facebookUrl, "_blank")
		},
		routeToFoodSwipeInstaPage() {
			window.open(this.$constants.instagramUrl, "_blank")
		},
		subtractCartCount(value) {
			this.cartCount = (parseInt(this.cartCount) - parseInt(value)).toString()
		},
		addCartCountByOne() {
			this.cartCount = (parseInt(this.cartCount) + 1).toString()
		},
		setCartCount(count) {
			this.cartCount = count.toString()
		},
		updateCartCount(expression) {
			this.cartCount = (parseInt(this.cartCount) + expression).toString()
		},
		toggleDrawerState() {
			this.$bus.emit("open-auth-sidebar")
		},
		openSnack(text, color="success") {
			this.$store.dispatch("snack/setSnackState", true)
			this.$store.dispatch("snack/setSnackColor", color)
			this.$store.dispatch("snack/setSnackText", text)
		},
		toCart() {
			router.push({ name: "Cart" })
		},
		toProfile() {
			router.push({name: "Profile"})
		},
		toStore() {
			router.push({name: "Store"})
		},
		toHome() {
			if (this.$route.name !== "Food Swipe") {
				router.push({ name: "Food Swipe" })
			}
		},
		toAdminPanel() {
			router.push({name: "Administration"})
		},
		async logOut() {
			const isLoggedOut = await this.$store.dispatch("auth/logout", { username: this.currentUser.username })
			if (isLoggedOut === true) {
				this.openSnack("Logged out successfully.")
				this.currentUser = null
				this.showAdminButton = false
				this.$bus.emit("refresh-order-now")
			} else {
				this.openSnack(isLoggedOut.detail, "error")
				localStorage.clear()
			}
			await this.initialize()
		},
	}
}
</script>
<style lang="scss">
.v-badge__badge {
	height: 18px;
	padding-top: .21rem;
	font-weight: 450;
}
.v-badge--bordered .v-badge__badge::after {
	border-width: 0.1rem;
}
.flickity-page-dots {
	bottom: 5px !important;
}
.flickity-page-dots .dot {
	background: white !important;
}
.food-swipe-toolbar {
	height: 6.5rem !important;
	@media only screen and (max-width: 528px) {
		height: 7.6rem !important;
	}
	.v-toolbar__content {
		/*Animation*/
		-webkit-transition: height 1s ease;
		-moz-transition: height 1s ease;
		-o-transition: height 1s ease;
		-ms-transition: height 1s ease;
		transition: height 1s ease;
		height: 2rem !important;
		background: #e2ab06;
		align-items: start;
		@media only screen and (max-width: 528px) {
			height: 3.1rem !important;
		}
	}
	.v-toolbar__extension {
		transition: margin-top .3s ease;
		height: 4.5rem !important;
		background: #FFC107 !important;
		padding: 0 2rem 0 0;
		border-radius: 0 0 5px 5px;
		box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;
	}
}
.public-contact-icon {
	height: 100%;
	display: flex;
	align-items: center;
	padding-right: 6px;
}
</style>
<style lang="sass" scoped>
@font-face
	font-family: "MainframeBB"
	src: url("../../../../src/assets/MAINBRG_.TTF")
.organization-title
	transition: font-size .3s ease
	text-transform: uppercase
	font-family: MainframeBB, serif
	font-size: 1.4rem
	line-height: 2rem
	@media only screen and (max-width: 320px)
		font-size: 1.2rem
		line-height: 1.5rem
.profile-avatar
	border: 2px solid white
.public-contact
	-webkit-transition: height .5s ease
	-moz-transition: height .5s ease
	-o-transition: height .5s ease
	-ms-transition: height .5s ease
	color: white
	font-size: .8rem
	font-weight: bold
	display: flex
	align-items: center
	justify-items: center
	width: 13.5rem
	@media only screen and (max-width: 528px)
		width: 6rem
.social-networks
	height: 100%
	display: flex
	align-items: center
.welcome
	height: 100%
	display: flex
	align-items: center
.nav-btn
	font-size: 1.2rem
	font-family: 'Teko', sans-serif
</style>
