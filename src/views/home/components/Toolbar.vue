<template>
	<div>
		<v-app-bar
			id="home-app-bar"
			dense
			color="#FFC107"
			height="60"
			class="pr-4"
		>
			<div class="organization-title">
				{{ $route.name }}
			</div>
			<v-spacer />
			<v-tooltip bottom>
				<template #activator="{on, attrs}">
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
				</template>
				<span>Home</span>
			</v-tooltip>
			<v-tooltip bottom>
				<template #activator="{on, attrs}">
					<v-avatar
						v-show="$route.name !== 'Profile'"
						size="32"
						class="pr-0 mr-sm-6 mr-md-6 mr-lg-6 mr-xl-6 profile-avatar"
						v-bind="attrs"
						color="white"
						@click="toProfile()"
						v-on="on"
					>
						<v-img
							src="https://image.freepik.com/free-vector/beard-man-barber-shop-logo-vector-illustration_56473-434.jpg"
						/>
					</v-avatar>
				</template>
				<span>Kiran Parajuli</span>
			</v-tooltip>
			<v-tooltip bottom>
				<template #activator="{on, attrs}">
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
				</template>
				<span>Store</span>
			</v-tooltip>

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
		</v-app-bar>
	</div>
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
//::v-deep.v-btn__content
//	max-width: 30px
.organization-title
	transition: all .3s
	font-size: 2.5rem
	line-height: 2.6rem
	font-family: 'Sacramento', cursive
	@media only screen and (max-width: 600px)
		font-size: 2rem
		line-height: 2rem
	@media only screen and (max-width: 300px)
		font-size: 1.6rem
		line-height: 1.6rem
	@media only screen and (max-width: 185px)
		font-size: 1.2rem
		line-height: 1.2rem
.profile-avatar
	transition: all .3s
	cursor: pointer
	border: 2px solid white
	@media only screen and (max-width: 285px)
		height: 24px !important
		min-width: 24px !important
		width: 24px !important
</style>
