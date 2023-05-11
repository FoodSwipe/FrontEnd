<template>
	<v-card
		width="100vw"
		flat tile
		min-height="100vh"
		color="#fff7df"
		class="pa-4 d-flex justify-center align-center"
		style="position: relative"
	>
		<div class="custom-shape-divider-top">
			<svg data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
				preserveAspectRatio="none"
			>
				<path d="M1200 0L0 0 598.97 114.72 1200 0z"
					class="shape-fill"
				/>
			</svg>
		</div>
		<div class="custom-shape-divider-bottom">
			<svg data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
				preserveAspectRatio="none"
			>
				<path d="M1200 0L0 0 598.97 114.72 1200 0z"
					class="shape-fill"
				/>
			</svg>
		</div>
		<v-card
			flat tile
			color="transparent"
			max-width="1000"
			class="mx-auto d-flex justify-center align-center flex-wrap"
		>
			<v-card :width="fbCardWidth"
				height="450"
			>
				<!-- <div class="fb-page"
					data-href="https://www.facebook.com/foodswipeonline" data-tabs="timeline"
					data-width="400" data-height=""
					data-small-header="false" data-adapt-container-width="true"
					data-hide-cover="false" data-show-facepile="true"
				>
					<blockquote cite="https://www.facebook.com/foodswipeonline"
						class="fb-xfbml-parse-ignore"
					>
						<a href="https://www.facebook.com/foodswipeonline">Food Swipe Food Delivery</a>
					</blockquote>
				</div> -->
			</v-card>
			<div v-if="$vuetify.breakpoint.width > 900"
				class="px-12"
			/>
			<v-card flat
				color="transparent"
				rounded
				max-width="600"
			>
				<v-card-text class="text-center py-0">
					<div class="text-uppercase">
						Contact us here
					</div>
				</v-card-text>
				<v-card-text class="text-center">
					<v-chip class="ma-1">
						<v-icon small
							left color="primary"
						>
							call
						</v-icon>
						<a href="tel:98xxxxxxxx"
							class="phone"
						>
							98xxxxxxxx
						</a>
					</v-chip>
					<v-chip class="ma-1">
						<v-icon small
							left color="primary"
						>
							call
						</v-icon>
						<a href="tel:98xxxxxxxx"
							class="phone"
						>
							98xxxxxxxx
						</a>
					</v-chip>
				</v-card-text>
				<v-card-title class="text-center d-flex justify-center align-center">
					<div class="section-sub-header">
						Stay connected with us!
					</div>
				</v-card-title>
				<v-card height="250"
					:width="($vuetify.breakpoint.width) > 900 ? '400': '60vw'"
					class="mx-auto"
				>
					<v-img
						:width="($vuetify.breakpoint.width) > 900 ? '400': '60vw'"
						contain
						:src="require('@/assets/social_networking.jpg')"
						height="250"
					/>
				</v-card>
				<div class="text-center">
					<v-card-title class="text-uppercase d-flex justify-center reach-us">
						Reach us on social media
					</v-card-title>
					<v-card-subtitle>
						<v-avatar size="40"
							color="transparent" class="elevation-4 mx-1 cursor"
							@click="routeToFoodSwipeFacebookPage()"
						>
							<v-img :src="require('@/assets/fb_splash_logo.png')" />
						</v-avatar>
						<v-avatar size="40"
							color="transparent"
							class="elevation-4 mx-1 cursor" @click="routeToFoodSwipeInstaPage()"
						>
							<v-img contain
								:src="require('@/assets/insta_splash_logo.jpg')"
							/>
						</v-avatar>
					</v-card-subtitle>
				</div>
			</v-card>
		</v-card>
	</v-card>
</template>
<script>
export default {
	computed: {
		fbCardWidth() {
			if (this.$vuetify.breakpoint.width > 900) {
				return 400
			} else if (this.$vuetify.breakpoint.width > 500) {
				return 400
			} else return "80vw"
		}
	},
	methods: {
		routeToFoodSwipeFacebookPage() {
			// window.open(this.$constants.facebookUrl, "_blank")
		},
		routeToFoodSwipeInstaPage() {
			// window.open(this.$constants.facebookUrl, "_blank")
		},
	}
}

</script>
<style lang="scss">
.fb-page > span {
	-moz-border-radius: 4px !important;
	border-radius: 4px !important;
	overflow: hidden !important;
}
.reach-us {
	font-family: 'Righteous', cursive;
}
</style>

<style scoped>
.custom-shape-divider-top {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
}

.custom-shape-divider-top svg {
	position: relative;
	display: block;
	width: calc(203% + 1.3px);
	height: 325px;
}

.custom-shape-divider-top .shape-fill {
	fill: #fdf5da;
}

/** For tablet devices **/
@media (min-width: 768px) and (max-width: 1023px) {
	.custom-shape-divider-top svg {
		width: calc(202% + 1.3px);
		height: 322px;
	}
}
.custom-shape-divider-bottom {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
	transform: rotate(180deg);
}

.custom-shape-divider-bottom svg {
	position: relative;
	display: block;
	width: calc(203% + 1.3px);
	height: 325px;
}

.custom-shape-divider-bottom .shape-fill {
	fill: #fdf5da;
}

/** For tablet devices **/
@media (min-width: 768px) and (max-width: 1023px) {
	.custom-shape-divider-bottom svg {
		width: calc(202% + 1.3px);
		height: 322px;
	}
}
.phone {
	text-decoration: none;
}
</style>
