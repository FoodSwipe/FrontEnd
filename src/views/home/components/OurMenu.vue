<template>
	<v-card min-height="100vh"
		width="100vw"
		flat
		tile
		color="#fff0f0"
		class="pa-4 d-flex justify-center align-center"
		style="position: relative;"
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
			color="transparent"
			rounded
		>
			<v-row no-gutters
				class="pa-2"
				justify="space-around"
			>
				<v-col
					v-for="item in items"
					:key="item.title"
				>
					<v-card
						:max-width="($vuetify.breakpoint.width < 600) ? 600 : 300"
						outlined
						class="ma-2 text-center"
					>
						<v-card-text>
							<v-avatar size="200">
								<v-img :src="item.image" />
							</v-avatar>
						</v-card-text>
						<v-card-title class="d-flex justify-center">
							{{ item.title }}
						</v-card-title>
						<v-divider />
						<v-card-subtitle>
							{{ item.subtitle }}
						</v-card-subtitle>
					</v-card>
				</v-col>
			</v-row>
		</v-card>
	</v-card>
</template>
<script>
export default {
	name: "OurMenu",
	data: () => ({
		items: [
			{
				image: require("@/assets/premiumQuality.png"),
				title: "Premium Quality",
				subtitle: "Your appetite is our first priority"
			},
			{
				image: require("@/assets/fastDelivery.png"),
				title: "Gain Time",
				subtitle: "Life can be complicated but ordering food doesn't have to be. Let us take care of the details while you focus on what really matters."
			},
			{
				image: require("@/assets/moreChoices.png"),
				title: "More choices",
				subtitle: "We have large variety of food and beverage items. Just swipe our menu and order your preference."
			}
		],
	}),
	computed: {
		avatarSize() {
			if (this.$vuetify.breakpoint.width > 400) {
				return 200
			} else if (this.$vuetify.breakpoint.width > 300) {
				return 150
			} else if (this.$vuetify.breakpoint.width > 200) {
				return 120
			} else if (this.$vuetify.breakpoint.width > 100) {
				return 80
			} else return 60
		}
	}
}
</script>
<style lang="scss" scoped>
.our-menu {
	margin: 0;
	padding: 15px 0 0 0;
	font-size: 2.5rem;
	line-height: 2.5rem;
}
.menu-item-group-name {
	font-size: 1.2rem;
	font-family: "Crete Round", serif;
}
.our-menu-wrapper-card {
	background: transparent;
}
.menu-item-price {
	font-size: 1.2rem; color: greenyellow !important;
}
.slight-up {
	margin-top: -3px;
}
.menu-list {
	background: #0e3e54 !important;
}
.divider-menu {
	margin: 2px 0;
}
.item-title {
	font-family: 'Otomanopee One', sans-serif;
	font-size: 24px;
}

.item-subtitle {
	font-size: 16px;
	color: grey;
}

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
	fill: #ffe7e7;
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
	fill: #ffe7e7;
}

/** For tablet devices **/
@media (min-width: 768px) and (max-width: 1023px) {
	.custom-shape-divider-bottom svg {
		width: calc(202% + 1.3px);
		height: 322px;
	}
}
</style>
