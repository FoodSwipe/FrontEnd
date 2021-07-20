<template>
	<v-card
		width="100vw"
		flat tile
		min-height="94vh"
		color="#fff7df"
		class="pa-4 d-flex justify-center align-center"
	>
		<v-card
			flat tile
			color="transparent"
		>
			<div class="py-6" />
			<v-row class="ma-0 pa-0">
				<v-col cols="12"
					xl="5"
					lg="5"
					md="5"
					sm="6"
				>
					<v-card class="overflow-hidden mx-auto"
						max-width="400"
					>
						<div class="fb-page"
							data-href="https://www.facebook.com/foodswipeonline" data-tabs="timeline"
							data-width="400" data-height=""
							data-small-header="false" data-adapt-container-width="true"
							data-hide-cover="false" data-show-facepile="true"
						>
							<blockquote cite="https://www.facebook.com/foodswipeonline"
								class="fb-xfbml-parse-ignore"
							>
								<a href="https://www.facebook.com/foodswipeonline"
									target="_blank"
								>FoodSwipe Delivery</a>
							</blockquote>
						</div>
					</v-card>
				</v-col>
				<v-col cols="12"
					xl="7"
					lg="7"
					md="7"
					sm="6"
					class="d-flex justify-center align-center"
				>
					<v-card flat
						color="transparent"
						rounded
					>
						<v-card-title class="text-center d-flex justify-center align-center">
							<div class="display-1">
								Stay connected with us!
							</div>
						</v-card-title>
						<v-card height="250"
							max-width="400"
						>
							<v-img
								width="100%"
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
				</v-col>
			</v-row>
		</v-card>
	</v-card>
</template>
<script>
export default {
	methods: {
		routeToFoodSwipeFacebookPage() {
			window.open(this.$constants.facebookUrl, "_blank")
		},
		routeToFoodSwipeInstaPage() {
			window.open(this.$constants.facebookUrl, "_blank")
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
