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
				Food Swipe
			</div>
			<v-spacer />
			<v-btn icon
				small
				class="pr-0 pr-sm-6 pr-md-6 pr-lg-6 pr-xl-6"
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
			<v-badge
				dark
				color="black"
				content="5"
				offset-x="10"
				offset-y="15"
			>
				<v-btn
					light
					icon
					small
					class="mr-2"
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
			</v-badge>
		</v-app-bar>
	</div>
</template>

<script>
export default {
	name: "HomeToolbarComponent",
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
</style>
