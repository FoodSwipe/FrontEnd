<template>
	<v-dialog
		v-model="drawer"
		width="500"
		overlay-color="black"
		transition="scale-transition"
	>
		<v-card class="pb-6">
			<v-card-title dense
				class="nav-toolbar"
				flat
			>
				<v-tooltip bottom>
					<template #activator="{attrs, on}">
						<v-btn icon
							v-bind="attrs"
							v-on="on"
							@click="clearSiteStorage"
						>
							<v-icon>clear_all</v-icon>
						</v-btn>
					</template>
					<span>Clear Site Storage</span>
				</v-tooltip>
				<v-spacer />
				<v-btn icon
					small
					large
					@click.stop="drawer = false"
				>
					<v-icon>
						close
					</v-icon>
				</v-btn>
			</v-card-title>
			<v-form class="login-form px-6">
				<v-row class="ma-0 pa-0"
					justify="center" align="center"
				>
					<v-col cols="12">
						<p class="organization-title text-center">
							Food Swipe Online Pvt. Ltd.
						</p>
						<v-divider class="mx-6" />
					</v-col>
					<v-col cols="12">
						<v-text-field
							id="login-username"
							v-model="login.username"
							solo
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
							solo
							clearable
							label="Password"
							prepend-inner-icon="lock"
							type="password"
							autocomplete="on"
							hide-details="auto"
							:error-messages="loginFieldErrors.password"
							@keydown="submitLoginIfEnter"
						/>
					</v-col>
				</v-row>
			</v-form>
			<v-row class="ma-0 pa-0 px-6"
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
		</v-card>
	</v-dialog>
</template>
<script>
import { mapGetters } from "vuex"
import Snack from "@/mixin/Snack"

export default {
	name: "AuthSideBar",
	mixins: [Snack],
	emits: ["reload"],
	data: () => ({
		agree: false,
		drawer: false,
		resetPasswordDialog: false,
		registerDialog: false,
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
	}),
	computed: {
		...mapGetters({
			loginFieldErrors: "auth/loginFieldErrorMessages",
			registrationErrors: "user/registrationErrors",
		})
	},
	created() {
		this.$bus.on("open-auth-sidebar", this.openAuthSidebar)
	},
	beforeUnmount() {
		this.$bus.off("open-auth-sidebar", this.openAuthSidebar)
	},
	methods: {
		clearSiteStorage() {
			localStorage.removeItem("token")
			localStorage.removeItem("currentUser")
			localStorage.removeItem("cookingOrder")
			this.openSnack("Site local storage cleared successfully.")
		},
		openAuthSidebar() {
			this.login = {
				username: "",
				password: ""
			}
			this.drawer = true
		},
		async submitLogin() {
			const loggedIn = await this.$store.dispatch("auth/login", this.login)
			if (loggedIn === true) {
				// logged in with zero pending order
				await this.openSnack("Logged in successfully.")
				this.$bus.emit("set-cart-count", 0)
				this.$bus.emit("refresh-order-now")
				this.$emit("reload")
				this.drawer = false
			} else if(loggedIn === "serverError") {
				await this.openSnack("Internal Server Error.", "error")
			} else if(loggedIn === "formError") {
				await this.openSnack(this.loginFieldErrors.detail, "error")
			} else if (loggedIn.message) {
				await this.openSnack(loggedIn.message, "error")
			} else if (typeof loggedIn === "number") {
				// logged in with a pending order
				await this.openSnack("Logged in successfully.")
				this.$bus.emit("set-cart-count", loggedIn)
				this.$bus.emit("refresh-cart")
				this.$bus.emit("refresh-order-now")
				this.$emit("reload")
				this.drawer = false
			}
		},
		async submitRegister() {
			const registered = await this.$store.dispatch("user/register", this.register)
			if (registered === true) {
				await this.openSnack("User registered successfully.")
				this.registerDialog = false
				this.drawer = true
			} else {
				if (registered === 500) await this.openSnack("Internal server error.", "error")
				else await this.openSnack("User registered failed.", "error")
			}
		},
		submitResetPasswordForm() {
			this.openSnack("Email address sent to email successfully.")
			this.resetPasswordDialog = false
		},
		openRegisterDialog() {
			this.$store.dispatch("user/clearRegisterErrorMessages")
			this.registerDialog = true
		},
		submitLoginIfEnter(e) {
			if (e.key === "Enter") this.submitLogin()
		}
	}
}
</script>
<style lang="sass" scoped>
.login-terms
	font-size: .65rem
.login-to-proceed
	text-align: center
	text-transform: capitalize
	margin: 0
	font-size: 2rem
	font-family: 'Sacramento', cursive
	color: green
.nav-close
	border: 2px solid #6db6de
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
.nav-toolbar
	height: 4rem
	background: linear-gradient(to bottom, orange, transparent)
</style>
