<template>
	<v-app-bar
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
					<v-btn
						v-show="$route.name !== 'Profile'"
						icon
						small
						class="pr-0 mr-sm-6 mr-md-6 mr-lg-6 mr-xl-6 profile-avatar"
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
			<span>Kiran Parajuli</span>
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
</template>

<script>
import router from "@/router"

export default {
	name: "HomeToolbarComponent",
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
	cursor: pointer
	border: 2px solid white
</style>
