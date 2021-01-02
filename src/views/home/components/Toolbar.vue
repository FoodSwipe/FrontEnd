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
						src="https://icons-for-free.com/iconfiles/png/512/fb+icon-1320183899414660008.png"
					/>
				</v-avatar>
				<v-avatar size="18"
					class="mx-1 cursor"
					@click="routeToFoodSwipeInstaPage()"
				>
					<v-img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/768px-Instagram_icon.png"
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
					transition="scale-transition"
					nudge-left="45"
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
						<v-list-item class="cursor">
							<v-list-item-icon class="mr-2">
								<v-icon>account_circle</v-icon>
							</v-list-item-icon>
							<v-list-item-title @click="toProfile()">
								Profile
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
				<v-tooltip bottom>
					<template #activator="{on, attrs}">
						<v-slide-x-transition>
							<v-btn
								v-show="$route.name !== 'Store'"
								icon
								small
								class="pr-0 mr-sm-6 mr-md-6 mr-lg-6 mr-xl-6"
								v-bind="attrs"
								@click="toStore()"
								v-on="on"
							>
								<v-icon :size="
									$vuetify.breakpoint.width > 300
										? ''
										: '16'
								"
								>
									store
								</v-icon>
							</v-btn>
						</v-slide-x-transition>
					</template>
					<span>Store</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template #activator="{on, attrs}">
						<v-slide-x-transition>
							<v-btn
								v-show="showAdminButton"
								icon
								small
								class="pr-0 mr-sm-6 mr-md-6 mr-lg-6 mr-xl-6"
								v-bind="attrs"
								@click="toAdminPanel()"
								v-on="on"
							>
								<v-icon :size="
									$vuetify.breakpoint.width > 300
										? ''
										: '16'
								"
								>
									settings_applications
								</v-icon>
							</v-btn>
						</v-slide-x-transition>
					</template>
					<span>Administration</span>
				</v-tooltip>

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
		<v-navigation-drawer
			v-model="drawer"
			app
			temporary
			right
			width="400"
		>
			<v-toolbar dark dense
				color="transparent"
				height="50"
				class="nav-toolbar"
			>
				<v-spacer />
				<v-btn icon
					small
					color="blue"
					class="nav-close"
					@click.stop="drawer = false"
				>
					<v-icon size="16">
						close
					</v-icon>
				</v-btn>
			</v-toolbar>
			<v-img :src="loginBanner"
				dark
				height="30vh"
				max-height="240"
				gradient="to top, rgb(0 0 0 / 80%), rgb(0 0 0 / 40%), rgb(0 0 0 / 10%)"
				class="login-image"
			>
				<v-row class="fill-height ma-0 pa-0"
					justify="center"
					align="end"
				>
					<v-col class="text-center">
						<div class="display-1 text-center">
							<v-icon>
								input
							</v-icon>
						</div>
					</v-col>
				</v-row>
			</v-img>
			<v-form class="login-form">
				<v-row class="ma-0 pa-0"
					justify="center" align="center"
				>
					<v-col cols="12">
						<p class="organization-title text-center">
							Food Swipe Online Pvt. Ltd.
						</p>
						<p class="login-to-proceed">
							Login to proceed
						</p>
					</v-col>
					<v-col cols="12">
						<v-text-field
							id="login-username"
							v-model="login.username"
							filled
							label="Username"
							clearable
							prepend-inner-icon="account_circle"
							hide-details="auto"
							:error-messages="loginFieldErrors.username"
						/>
					</v-col>
					<v-col cols="12">
						<v-text-field
							id="login-password"
							v-model="login.password"
							background-color="white"
							filled
							clearable
							label="Password"
							prepend-inner-icon="lock"
							type="password"
							autocomplete="on"
							hide-details="auto"
							:error-messages="loginFieldErrors.password"
						/>
					</v-col>
				</v-row>
			</v-form>
			<v-row class="ma-0 pa-0"
				align="center"
			>
				<v-col cols="6">
					<v-dialog
						id="reset-password-dialog"
						v-model="resetPasswordDialog"
						width="500"
					>
						<template #activator="{ on, attrs }">
							<v-btn text
								color="error"
								v-bind="attrs"
								x-small
								v-on="on"
							>
								Forget password?
							</v-btn>
						</template>

						<v-card>
							<v-card-title class="headline grey lighten-2">
								Reset your password
							</v-card-title>

							<v-card-text class="pt-4">
								<v-text-field
									id="reset-email"
									v-model="resetPassword.email"
									type="email"
									filled
									hide-details="auto"
									prepend-inner-icon="email"
									placeholder="Email Address"
									hint="Reset password link will be sent to the provided email address."
									persistent-hint
								/>
							</v-card-text>

							<v-divider />

							<v-card-actions class="d-flex justify-center">
								<v-btn
									dark
									color="orange"
									@click="submitResetPasswordForm()"
								>
									<v-icon>update</v-icon><span class="pl-2">Reset Password</span>
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-col>
				<v-col cols="6"
					class="text-right"
				>
					<v-btn text
						color="primary"
						x-small
						@click="openRegisterDialog()"
					>
						Register
					</v-btn>
					<v-dialog
						id="register-dialog"
						v-model="registerDialog"
						max-width="500"
					>
						<v-card>
							<v-card-title class="grey lighten-2">
								<v-icon size="30">
									person_add
								</v-icon><span class="pl-3">Register Now</span>
							</v-card-title>

							<v-form>
								<v-row class="ma-0 pa-0"
									align="center"
								>
									<v-col cols="12">
										<v-text-field
											id="full-name"
											v-model="register.full_name"
											dense
											filled
											clearable
											prepend-inner-icon="face"
											hide-details="auto"
											label="Full name"
											:error-messages="registrationErrors.full_name"
										/>
									</v-col>
									<v-col cols="12"
										xl="6" lg="6"
										md="6" sm="6"
									>
										<v-text-field
											id="username"
											v-model="register.username"
											dense
											filled
											clearable
											prepend-inner-icon="account_circle"
											hide-details="auto"
											label="Username"
											:error-messages="registrationErrors.username"
										/>
									</v-col>
									<v-col cols="12"
										xl="6" lg="6"
										md="6" sm="6"
									>
										<v-text-field
											id="phone"
											v-model="register.contact"
											dense
											filled
											clearable
											type="number"
											prepend-inner-icon="call"
											hide-details="auto"
											label="Phone number"
											:error-messages="registrationErrors.contact"
										/>
									</v-col>
									<v-col cols="12">
										<v-text-field
											id="email"
											v-model="register.email"
											dense
											filled
											clearable
											prepend-inner-icon="email"
											hide-details="auto"
											label="Email address"
											:error-messages="registrationErrors.email"
										/>
									</v-col>
									<v-col cols="12">
										<v-text-field
											id="password"
											v-model="register.password"
											dense
											autocomplete="on"
											filled
											clearable
											prepend-inner-icon="lock"
											hide-details="auto"
											label="Password"
											type="password"
											:error-messages="registrationErrors.password"
										/>
									</v-col>
									<v-col cols="12">
										<v-text-field
											id="address"
											v-model="register.address"
											dense
											filled
											clearable
											prepend-inner-icon="room"
											hide-details="auto"
											label="Address"
											:error-messages="registrationErrors.address"
										/>
									</v-col>
								</v-row>
							</v-form>

							<v-divider />
							<v-card-text class="d-flex align-center">
								<v-checkbox v-model="agree"
									hide-details
								>
									<template #label>
										<div class="login-terms">
											By clicking <code>Register</code>, you agree to our <code>Terms</code>, <code>Data Policy</code> and <code>Cookies Policy</code>.
											We will track your last <code>Orders</code>, <code>Locations</code> and try to serve you more better.
										</div>
									</template>
								</v-checkbox>
							</v-card-text>

							<v-card-actions class="d-flex justify-center pt-0 pb-4">
								<v-btn color="orange lighten-3"
									@click="submitRegister()"
								>
									<v-icon>add_circle</v-icon>
									<span class="pl-2">Register</span>
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-col>
				<v-col cols="12">
					<v-btn
						id="submit-login"
						block
						dark
						class="peach-gradient"
						@click="submitLogin()"
					>
						<v-icon>input</v-icon><span class="pl-3">Login</span>
					</v-btn>
				</v-col>
				<v-col cols="12">
					<div class="login-terms">
						By clicking <code>Login</code>, you agree to our <code>Terms</code>, <code>Data Policy</code> and <code>Cookies Policy</code>.
						You may receive <i>Email Notifications</i> from us and can opt out any time. We will track your last <code>Orders</code>, <code>Locations</code> and try to serve you more better.
					</div>
				</v-col>
			</v-row>
		</v-navigation-drawer>
	</div>
</template>

<script>
import router from "@/router"
import { mapGetters } from "vuex"

export default {
	name: "HomeToolbarComponent",
	data: () => ({
		agree: false,
		drawer: null,
		showAdminButton: false,
		resetPasswordDialog: false,
		registerDialog: false,
		loginBanner: require("@/assets/banner_1.jpg"),
		items: [
			{ title: "Home", icon: "mdi-view-dashboard" },
			{ title: "About", icon: "mdi-forum" },
		],
		resetPassword: {
			email: ""
		},
		login: {
			username: "",
			password: ""
		},
		register: {
			full_name: "",
			username: "",
			email: "",
			contact: null,
			address: "",
			password: ""
		},
		currentUser: null,
		cartCount: "0",
	}),
	computed: {
		...mapGetters({
			loginFieldErrors: "auth/loginFieldErrorMessages",
			registrationErrors: "user/registrationErrors",
			alreadyCookingOrder: "order/detailOrder"
		}),
	},
	async created() {
		this.$bus.on("set-cart-count", this.setCartCount)
		this.$bus.on("add-cart-count-by-one", this.addCartCountByOne)
		this.$bus.on("subtract-cart-count", this.subtractCartCount)
		this.$bus.on("update-cart-count", this.updateCartCount)

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
	beforeUnmount() {
		this.$bus.off("set-cart-count", this.setCartCount)
		this.$bus.off("add-cart-count-by-one", this.addCartCountByOne)
		this.$bus.off("subtract-cart-count", this.subtractCartCount)
	},
	methods: {
		routeToFoodSwipeFacebookPage() {
			window.open("https://www.facebook.com/foodswipeonline", "_blank")
		},
		routeToFoodSwipeInstaPage() {
			window.open("https://www.instagram.com/foodswipeonlinefood/?hl=en", "_blank")
		},
		openRegisterDialog() {
			this.$store.dispatch("user/clearRegisterErrorMessages")
			this.registerDialog = true
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
			this.login = {
				username: "",
				password: ""
			}
			this.drawer = !this.drawer
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
		async submitLogin() {
			const loggedIn = await this.$store.dispatch("auth/login", this.login)
			if (loggedIn === true) {
				// logged in with zero pending order
				this.openSnack("Logged in successfully.")
				this.currentUser = this.$helper.getCurrentUser()
				this.$bus.emit("set-cart-count", 0)
				this.$bus.emit("refresh-order-now")
				this.drawer = false
				this.showAdminButton = this.$helper.isAdminUser()
			} else if(loggedIn === "serverError") {
				this.openSnack("Internal Server Error.", "error")
			} else if(loggedIn === "formError") {
				this.openSnack("Login failed.", "error")
			} else if (loggedIn.message) {
				this.openSnack(loggedIn.message, "error")
			} else if (typeof loggedIn === "number") {
				// logged in with a pending order
				this.openSnack("Logged in successfully.")
				this.currentUser = this.$helper.getCurrentUser()
				this.$bus.emit("set-cart-count", loggedIn)
				this.$bus.emit("refresh-cart")
				this.$bus.emit("refresh-order-now")
				this.drawer = false
				this.showAdminButton = this.$helper.isAdminUser()
			}
		},
		async logOut() {
			const isLoggedOut = await this.$store.dispatch("auth/logout", { username: this.currentUser.username })
			if (isLoggedOut === true) {
				this.openSnack("Logged out successfully.")
				this.currentUser = null
				this.showAdminButton = false
				this.$bus.emit("refresh-order-now")
			} else {
				this.openSnack(isLoggedOut, "error")
			}

		},
		async submitRegister() {
			const registered = await this.$store.dispatch("user/register", this.register)
			if (registered === true) {
				this.openSnack("User registered successfully.")
				this.registerDialog = false
				this.drawer = true
			} else {
				if (registered === 500) this.openSnack("Internal server error.", "error")
				else this.openSnack("User registered failed.", "error")
			}
		},
		submitResetPasswordForm() {
			this.openSnack("Email address sent to email successfully.")
			this.resetPasswordDialog = false
		}
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
	.v-toolbar__content {
		/*Animation*/
		-webkit-transition: height 1s ease;
		-moz-transition: height 1s ease;
		-o-transition: height 1s ease;
		-ms-transition: height 1s ease;
		transition: height 1s ease;
		height: 3rem !important;
		background: #FF0000;
		align-items: start;
		@media only screen and (max-width: 528px) {
			height: 5rem !important;
		}
	}
	.v-toolbar__extension {
		transition: margin-top .3s ease;
		height: 4.5rem !important;
		background: #FFC107 !important;
		margin: -1.3rem auto 0;
		padding: 0 2rem 0 1rem;
		width: 95vw;
		border-radius: 15px;
		box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;
		@media only screen and (max-width: 528px) {
			margin-top: -2rem !important;
		}
	}
}
.public-contact-icon {
	padding-top: 2px;
}
</style>
<style lang="sass" scoped>
@font-face
	font-family: "MainframeBB"
	src: url("../../../../src/assets/MAINBRG_.TTF")
.organization-title
	transition: all .3s
	text-transform: uppercase
	font-family: MainframeBB, serif
	::v-deep.org-name
		@media only screen and (max-width: 600px)
		font-size: 1.3rem !important
		line-height: 1.3rem !important
		@media only screen and (max-width: 400px)
			font-size: 1.1rem !important
			line-height: 1.1rem !important
		@media only screen and (max-width: 220px)
			font-size: .8rem !important
			line-height: .8rem !important
.profile-avatar
	border: 2px solid white
.login-terms
	font-size: .65rem
.login-to-proceed
	text-align: center
	text-transform: capitalize
	margin: 0
	font-size: 2rem
	font-family: 'Sacramento', cursive
	color: green
.login-image
	margin-top: -50px
.nav-toolbar
	z-index: 1
.nav-close
	border: 2px solid #6db6de
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
	display: flex
	align-items: center
</style>
