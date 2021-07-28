<template>
	<v-card flat
		tile
		width="100vw"
		color="transparent"
	>
		<v-card max-width="1000"
			color="transparent"
			class="pr-4 mx-auto"
			flat tile
		>
			<div class="d-flex align-center justify-space-between"
				style="width: 100%"
			>
				<v-card-title class="organization-title"
					:class="($route.name !== 'Food Swipe') ? 'cursor': ''"
					@click="toHome"
				>
					Food Swipe
				</v-card-title>
				<div class="d-flex align-center justify-space-between">
					<div
						v-if="$vuetify.breakpoint.width > 1000"
						class="pr-3"
					>
						<v-btn
							icon
							to="/store"
						>
							<v-icon size="28">
								store
							</v-icon>
						</v-btn>
					</div>
					<v-tooltip v-if="currentUser === null"
						bottom
					>
						<template #activator="{on, attrs}">
							<v-btn
								v-bind="attrs"
								icon
								small
								class="cursor"
								v-on="on"
								@click.stop="toggleDrawerState()"
							>
								<v-icon size="26">
									input
								</v-icon>
							</v-btn>
						</template>
						<span>Login</span>
					</v-tooltip>
					<v-menu
						v-else
						close-on-content-click
						offset-y
						transition="scale-transition"
						nudge-left="10"
						nudge-bottom="5"
					>
						<template #activator="{on, attrs}">
							<v-btn
								icon
								small
								class="cursor"
								v-bind="attrs"
								v-on="on"
							>
								<v-icon size="26">
									account_circle
								</v-icon>
							</v-btn>
						</template>
						<v-list color="orange lighten-4">
							<v-list-item v-if="showAdminButton"
								class="cursor"
								@click="toAdminPanel()"
							>
								<v-list-item-icon class="mr-2">
									<v-icon>settings_applications</v-icon>
								</v-list-item-icon>
								<v-list-item-title>
									Settings
								</v-list-item-title>
							</v-list-item>
							<v-divider class="ml-4" />
							<v-list-item class="cursor"
								@click="logOut()"
							>
								<v-list-item-icon class="mr-2">
									<v-icon>input</v-icon>
								</v-list-item-icon>
								<v-list-item-title>
									Logout
								</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
					<div class="px-2" />
					<cart-indicator />
				</div>
			</div>
			<auth-sidebar @reload="initialize()" />
		</v-card>
	</v-card>
</template>

<script>
import router from "@/router"
import Snack from "@/mixin/Snack"

export default {
	name: "HomeToolbarComponent",
	components: {
		CartIndicator: () => import("@/components/CartIndicator"),
		AuthSidebar: () => import("@/views/home/components/AuthSidebar"),
	},
	mixins: [Snack],
	data: () => ({
		loginBanner: require("@/assets/banner_1.jpg"),
		cartCount: "0",
		currentUser: null,
	}),
	computed: {
		showAdminButton() {
			if (!this.currentUser) return false
			else return this.currentUser["admin"]
		}
	},
	created() {
		this.initialize()
	},
	methods: {
		initialize() {
			this.currentUser = this.$helper.getCurrentUser()
		},
		routeToFoodSwipeFacebookPage() {
			window.open(this.$constants.facebookUrl, "_blank")
		},
		routeToFoodSwipeInstaPage() {
			window.open(this.$constants.instagramUrl, "_blank")
		},
		toggleDrawerState() {
			this.$bus.emit("open-auth-sidebar")
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
			router.push({name: "Administration Home"})
		},
		async logOut() {
			const isLoggedOut = await this.$store.dispatch("auth/logout", { username: this.currentUser.username })
			if (isLoggedOut === true) {
				await this.openSnack("Logged out successfully.")
				this.currentUser = null
				this.$bus.emit("refresh-order-now")
			} else {
				await this.openSnack(isLoggedOut.detail, "error")
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
