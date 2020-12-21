<template>
	<div>
		<v-app-bar
			app
			color="#FFC107"
			height="58"
			width="100vw"
			class="ma-0 pr-4"
		>
			<div class="organization-title">
				{{ $route.name }}
			</div>
			<v-spacer />
			<v-tooltip bottom>
				<template #activator="{on, attrs}">
					<v-scale-transition>
						<v-btn
							v-if="currentUser !== null"
							icon
							small
							class="pr-0 mr-sm-6 mr-md-6 mr-lg-6 mr-xl-6"
							v-bind="attrs"
							@click="logOut()"
							v-on="on"
						>
							<v-icon :size="
								$vuetify.breakpoint.width > 300
									? ''
									: '16'
							"
							>
								logout
							</v-icon>
						</v-btn>
					</v-scale-transition>
				</template>
				<span>Logout</span>
			</v-tooltip>
			<v-tooltip bottom>
				<template #activator="{on, attrs}">
					<v-scale-transition>
						<v-btn
							v-show="$route.name !== 'Food Swipe'"
							icon
							small
							class="pr-0 mr-sm-6 mr-md-6 mr-lg-6 mr-xl-6"
							v-bind="attrs"
							@click="toHome()"
							v-on="on"
						>
							<v-icon :size="
								$vuetify.breakpoint.width > 300
									? ''
									: '16'
							"
							>
								home
							</v-icon>
						</v-btn>
					</v-scale-transition>
				</template>
				<span>Home</span>
			</v-tooltip>
			<v-tooltip bottom>
				<template #activator="{on, attrs}">
					<v-scale-transition>
						<!-- v-if not authenticated -->

						<v-btn
							v-if="currentUser === null"
							v-bind="attrs"
							icon
							small
							class="pr-0 mr-sm-6 mr-md-6 mr-lg-6 mr-xl-6 cursor"
							v-on="on"
							@click.stop="toggleDrawerState()"
						>
							<v-icon size="$vuetify.breakpoint.width > 300
									? ''
									: '16'"
							>
								input
							</v-icon>
						</v-btn>
						<v-btn
							v-else
							v-show="$route.name !== 'Profile'"
							icon
							small
							class="pr-0 mr-sm-6 mr-md-6 mr-lg-6 mr-xl-6 profile-avatar cursor"
							v-bind="attrs"
							@click="toProfile()"
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
					</v-scale-transition>
				</template>
				<span>Profile</span>
			</v-tooltip>
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
									add_shopping_cart
								</v-icon>
							</v-btn>
						</template>
						<span>Cart</span>
					</v-tooltip>
				</v-badge>
			</v-fade-transition>
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
			<v-form>
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
					<v-dialog
						id="register-dialog"
						v-model="registerDialog"
						max-width="500"
					>
						<template #activator="{ on, attrs }">
							<v-btn text
								color="primary"
								v-bind="attrs"
								v-on="on"
							>
								Register
							</v-btn>
						</template>

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
									<v-col cols="12"
										xl="6" lg="6"
										md="6" sm="6"
									>
										<v-text-field
											id="first-name"
											v-model="register.first_name"
											dense
											filled
											clearable
											prepend-inner-icon="face"
											hide-details="auto"
											label="First name"
											:error-messages="registrationErrors.first_name"
										/>
									</v-col>
									<v-col cols="12"
										xl="6" lg="6"
										md="6" sm="6"
									>
										<v-text-field
											id="last-name"
											v-model="register.last_name"
											dense
											filled
											clearable
											prepend-inner-icon="face"
											hide-details="auto"
											label="Last name"
											:error-messages="registrationErrors.last_name"
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
			first_name: "",
			last_name: "",
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
		this.$bus.on("add-cart-count", this.addCartCount)
		this.$bus.on("subtract-cart-count", this.subtractCartCount)
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
		this.showAdminButton = this.$helper.isAdminUser()
		const cookingOrder = localStorage.getItem("cookingOrder")
		if (cookingOrder) {
			await this.$store.dispatch("order/withCartItems", {
				id: cookingOrder
			})
			this.cartCount = this.alreadyCookingOrder.total_items.toString()
		}
	},
	beforeUnmount() {
		this.$bus.off("set-cart-count", this.setCartCount)
		this.$bus.off("add-cart-count", this.addCartCount)
		this.$bus.off("subtract-cart-count", this.subtractCartCount)
	},
	methods: {
		subtractCartCount(value) {
			this.cartCount = (parseInt(this.cartCount) - parseInt(value)).toString()
		},
		addCartCount() {
			this.cartCount = (parseInt(this.cartCount) + 1).toString()
		},
		setCartCount(count) {
			this.cartCount = count.toString()
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
			router.push({name: "Cart"})
		},
		toProfile() {
			router.push({name: "Profile"})
		},
		toStore() {
			router.push({name: "Store"})
		},
		toHome() {
			router.push({name: "Food Swipe"})
		},
		toAdminPanel() {
			router.push({name: "Administration"})
		},
		async submitLogin() {
			const loggedIn = await this.$store.dispatch("auth/login", this.login)
			if (loggedIn === true) {
				this.openSnack("Logged in successfully.")
				this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
				this.drawer = false
				this.showAdminButton = this.$helper.isAdminUser()
			} else if(loggedIn === 500) {
				this.openSnack("Internal Server Error.", "error")
			} else if(loggedIn === 400) {
				this.openSnack("Login failed.", "error")
			} else if (loggedIn.message) {
				this.openSnack(loggedIn.message, "error")
			}
		},
		async logOut() {
			const isLoggedOut = await this.$store.dispatch("auth/logout", { username: this.currentUser.username })
			if (isLoggedOut === true) {
				this.openSnack("Logged out successfully.")
				this.currentUser = null
				this.showAdminButton = false
			} else {
				this.openSnack(isLoggedOut, "error")
			}

		},
		async submitRegister() {
			const registered = await this.$store.dispatch("user/register", this.register)
			if (registered === true) {
				this.openSnack("User registered successfully.")
				this.registerDialog = false
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
<style>
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
</style>
<style lang="sass" scoped>
@font-face
	font-family: "MainframeBB"
	src: url("../../../../src/assets/MAINBRG_.TTF")
.organization-title
	transition: all .3s
	text-transform: uppercase
	font-size: 1.5rem
	line-height: 1.5rem
	font-family: MainframeBB, serif
	@media only screen and (max-width: 600px)
		font-size: 1.3rem
		line-height: 1.3rem
	@media only screen and (max-width: 320px)
		font-size: 1.1rem
		line-height: 1.1rem
	@media only screen and (max-width: 220px)
		font-size: .8rem
		line-height: .8rem
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
</style>
