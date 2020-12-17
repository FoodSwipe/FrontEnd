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

						<v-btn v-bind="attrs"
							icon
							small
							class="pr-0 mr-sm-6 mr-md-6 mr-lg-6 mr-xl-6 cursor"
							v-on="on"
							@click.stop="drawer = !drawer"
						>
							<v-icon size="$vuetify.breakpoint.width > 300
									? ''
									: '16'"
							>
								input
							</v-icon>
						</v-btn>
						<!-- v-if authenticated -->
						<!--					<v-btn-->
						<!--						v-show="$route.name !== 'Profile'"-->
						<!--						icon-->
						<!--						small-->
						<!--						class="pr-0 mr-sm-6 mr-md-6 mr-lg-6 mr-xl-6 profile-avatar cursor"-->
						<!--						v-bind="attrs"-->
						<!--						@click="toProfile()"-->
						<!--						v-on="on"-->
						<!--					>-->
						<!--						<v-icon :size="-->
						<!--							$vuetify.breakpoint.width > 300-->
						<!--								? ''-->
						<!--								: '16'-->
						<!--						"-->
						<!--						>-->
						<!--							account_circle-->
						<!--						</v-icon>-->
						<!--					</v-btn>-->
					</v-scale-transition>
				</template>
				<span>Login</span>
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
					v-show="$route.name !== 'Cart'"
					dark
					color="black"
					content="5"
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
						filled
						label="Username"
						clearable
						prepend-inner-icon="account_circle"
						hide-details="auto"
					/>
				</v-col>
				<v-col cols="12">
					<v-text-field
						filled
						label="Password"
						clearable
						prepend-inner-icon="lock"
						type="password"
						hide-details="auto"
					/>
				</v-col>
				<v-col cols="6">
					<v-btn text
						color="error"
					>
						Forget password?
					</v-btn>
				</v-col>
				<v-col cols="6"
					class="text-right"
				>
					<v-btn text
						color="primary"
					>
						Register
					</v-btn>
				</v-col>
				<v-col cols="12">
					<v-btn block
						dark
						class="peach-gradient"
					>
						<v-icon>input</v-icon><span class="pl-3">Login</span>
					</v-btn>
				</v-col>
				<v-col cols="12">
					<div class="login-terms">
						By clicking <code>Login</code>, you agree to our <code>Terms</code>, <code>Data Policy</code> and <code>Cookies Policy</code>.
						You may receive <i>Email Notifications</i> from us and can opt out any time. We will track your last <code>orders</code>, <code>locations</code> and try to serve you more better.
					</div>
				</v-col>
			</v-row>
		</v-navigation-drawer>
	</div>
</template>

<script>
import router from "@/router"

export default {
	name: "HomeToolbarComponent",
	data: () => ({
		drawer: null,
		loginBanner: require("@/assets/banner_1.jpg"),
		items: [
			{ title: "Home", icon: "mdi-view-dashboard" },
			{ title: "About", icon: "mdi-forum" },
		],
	}),
	methods: {
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
