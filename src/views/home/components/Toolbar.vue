<template>
	<div>
		<v-app-bar
			id="home-app-bar"
			dense
			fixed
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
					small
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
					small
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
			</template>
		</v-app-bar>
	</div>
</template>

<script>
import $ from "jquery";

export default {
	name: "HomeToolbarComponent",
	mounted: function () {
		this.initBarTransparency()
		this.initBarScrollColoring()
	},
	methods: {
		initBarTransparency() {
			$(document).ready(() => {
				const scrollTop = $(window).scrollTop()
				if (scrollTop === 0) {
					$("#home-app-bar").css({
						background: "rgb(255,255,255, 0)"
					})
				}
			})
		},
		initBarScrollColoring() {
			$(window).scroll(function () {
				const scrollTop = $(this).scrollTop()
				console.log("here")
				$("#home-app-bar").css({
					backgroundColor: function () {
						const elementHeight = $(this).height();
						return "rgb(224,141,19," + (1 - (elementHeight - scrollTop) / elementHeight).toString()
					}
				})
			})
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
//::v-deep.v-btn__content
//	max-width: 30px
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
