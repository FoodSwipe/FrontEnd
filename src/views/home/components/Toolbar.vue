<template>
	<div>
		<v-app-bar
			color="black"
			dense
			dark
		>
			<v-spacer />

			<div class="organization-title">
				Food Swipe
			</div>
			<v-spacer />
			<template #extension>
				<v-app-bar-nav-icon>
					<v-icon :size="
						$vuetify.breakpoint.width > 300
							? ''
							: '16'
					"
					>
						menu
					</v-icon>
				</v-app-bar-nav-icon>

				<v-spacer />

				<v-btn icon
					max-width="24"
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

				<v-btn icon
					class="mx-1"
					max-width="24"
				>
					<v-icon :size="
						$vuetify.breakpoint.width > 300
							? ''
							: '16'
					"
					>
						search
					</v-icon>
				</v-btn>
				<v-badge
					light
					bordered
					color="black"
					content="5"
					offset-x="10"
					offset-y="15"
				>
					<v-btn icon
						dark
						max-width="24"
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
			</template>
		</v-app-bar>
	</div>
</template>

<script>
export default {
	name: "HomeToolbarComponent"
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
::v-deep.v-btn__content
	max-width: 24px
.organization-title
	font-size: 2.5rem
	line-height: 2.5rem
	font-family: 'Sacramento', cursive
	@media only screen and (max-width: 220px)
		font-size: 1.8rem
		line-height: 1.8rem
	@media only screen and (max-width: 160px)
		font-size: 1.2rem
		line-height: 1.2rem
</style>