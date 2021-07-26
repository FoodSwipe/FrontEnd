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
		<v-card flat
			tile
			color="transparent"
		>
			<v-list max-width="600"
				color="transparent"
				class="mx-auto"
			>
				<v-list-item v-for="item in items"
					:key="item.title"
				>
					<v-list-item-avatar :size="avatarSize">
						<v-img
							:src="item.image"
							max-height="200"
							contain
						/>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title class="item-title">
							{{ item.title }}
						</v-list-item-title>
						<p class="item-subtitle">
							{{ item.subtitle }}
						</p>
					</v-list-item-content>
				</v-list-item>
			</v-list>
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
		menuItemGroups: [
			{ name: "Salad",
				image: "",
				items: [
					{
						name: "Green Salad",
						image: "",
						price: 199,
					},
					{
						name: "Mixed Fruit Salad",
						image: "",
						price: 299,
					}
				]
			},
			{ name: "Veg Bites",
				image: "",
				items: [
					{
						name: "Peanut Sadeko",
						image: "",
						price: 149,
					},
					{
						name: "Crispy Corn",
						image: "",
						price: 199,
					},
					{
						name: "French Fries",
						image: "",
						price: 149,
					},
					{
						name: "Aalu Jeera",
						image: "",
						price: 149,
					},
					{
						name: "Wai Wai Sadeko",
						image: "",
						price: 99,
					},
					{
						name: "Panner Chilly",
						image: "",
						price: 249,
					},
					{
						name: "Boiled Veg",
						image: "",
						price: 149,
					},
				]
			},
			{ name: "Non Veg Bites",
				image: "",
				items: [
					{
						name: "Chicken Popcorn",
						image: "",
						price: 249,
					},
					{
						name: "Chrispy Chicken",
						image: "",
						price: 249,
					},
					{
						name: "Chicken Drumstick",
						image: "",
						price: 349,
					},
					{
						name: "Fried Sausage(3pcs)",
						image: "",
						price: 249,
					},
					{
						name: "Chicken Sadeko",
						image: "",
						price: 249,
					},
					{
						name: "Wai Wai Chicken Sadeko",
						image: "",
						price: 199,
					},
					{
						name: "Tawa chicken",
						image: "",
						price: 299,
					},
					{
						name: "Pork Tawa",
						image: "",
						price: 349,
					},
					{
						name: "Chicken Black Pepper",
						image: "",
						price: 299,
					},
					{
						name: "Boiled Sausage(3Pcs)",
						image: "",
						price: 199,
					},
					{
						name: "Boiled Chicken",
						image: "",
						price: 199,
					},
					{
						name: "BBQ wings",
						image: "",
						price: 299,
					},
					{
						name: "Sukuti Fry",
						image: "",
						price: 249,
					},
					{
						name: "Sukuti Sadheko",
						image: "",
						price: 349,
					},

				]
			},
			{ name: "MoMo",
				image: "",
				items: [
					{
						name: "Steam MoMo (Chi/Buff)",
						image: "",
						price: "169 / 149",
					},
					{
						name: "MoMo Sadeko(Chi Buff)",
						image: "",
						price: "249 / 199",
					},
					{
						name: "Fried MoMo(Chi/Buff)",
						image: "",
						price: "199 / 169",
					}
				]
			},
			{ name: "Rice & Noodles",
				image: "",
				items: [
					{
						name: "Biryani (veg/Chi/buff)",
						image: "",
						price: "299 / 399 / 49",
					},
					{
						name: "Fried Rice (Veg/Chi/Buff)",
						image: "",
						price: "149 / 199 / 199",
					},
					{
						name: "Chowmin (Veg/Chi/Buff)",
						image: "",
						price: "149 / 199 / 199",
					}
				]
			},
			{ name: "Chilly",
				image: "",
				items: [
					{
						name: "Chicken Chilly",
						image: "",
						price: 249,
					},
					{
						name: "Sausage Chilly",
						image: "",
						price: 249,
					},
					{
						name: "MoMo Chilly",
						image: "",
						price: 249,
					},
					{
						name: "Buff chilly",
						image: "",
						price: 299,
					},
					{
						name: "Pork Chilly",
						image: "",
						price: 349,
					}
				]
			},
			{ name: "Burger",
				image: "",
				items: [
					{
						name: "Crispy Chicken Burger",
						image: "",
						price: 199,
					},
					{
						name: "Grilled Chicken Burger",
						image: "",
						price: 249,
					}
				]
			},
			{ name: "Khaja Set",
				image: "",
				items: [
					{
						name: "Food swipe combo(Veg/Chi)",
						image: "",
						price: "499 / 599",
					}
				]
			},
			{ name: "Pizza (All sizes are medium)",
				image: "",
				items: [
					{
						name: "Chicken Pizza",
						image: "",
						price: 449,
					},
					{
						name: "Veg. Pizza",
						image: "",
						price: 349,
					},
					{
						name: "Food Swipe Special Pizza",
						image: "",
						price: 599,
					},
					{
						name: "Chi. Mushroom Pizza",
						image: "",
						price: 499,
					}
				]
			},
			{ name: "Pasta & Spaghetti",
				image: "",
				items: [
					{
						name: "Penne Alfredo",
						image: "",
						price: 349,
					},
					{
						name: "Spaghetti Bolognese",
						image: "",
						price: 349,
					}
				]
			},
			{ name: "Rice With Curry",
				image: "",
				items: [
					{
						name: "Veg Curry WIth Rice",
						image: "",
						price: 199,
					},
					{
						name: "Chicken Curry With Rice",
						image: "",
						price: 299,
					},
					{
						name: "Buff Curry With Rice",
						image: "",
						price: 399,
					},
					{
						name: "Briyani Rice",
						image: "",
						price: 149,
					},
					{
						name: "Plain Rice/Jeera Rice",
						image: "",
						price: 99,
					},
					{
						name: "Dal Fry",
						image: "",
						price: 149,
					},
				]
			},
			{ name: "Bar",
				image: "",
				items: [
					{
						name: "Khukuri Rum",
						image: "",
						price: "450 / 900 / 1700",
					},
					{
						name: "Old Durbar",
						image: "",
						price: "650 / 1300 / 2500",
					},
					{
						name: "Ruslan Vodka",
						image: "",
						price: "450 / 900 / 1700",
					},
					{
						name: "Golden Oak",
						image: "",
						price: "250 / 500 / 1000",
					},
					{
						name: "Tuborg Can",
						image: "",
						price: 350,
					},
					{
						name: "Gorkha Can Strong",
						image: "",
						price: 300,
					},
					{
						name: "Coke/Fanta/Sprite",
						image: "",
						price: "100 / 200",
					},
					{
						name: "Red Bull",
						image: "",
						price: 180,
					},
					{
						name: "Mineral Water",
						image: "",
						price: 30,
					},
				]
			},
			{ name: "Tobacco",
				image: "",
				items: [
					{
						name: "Surya Red",
						image: "",
						price: 380,
					},
					{
						name: "Captain",
						image: "",
						price: 150,
					},
					{
						name: "Hukka Flavour",
						image: "",
						price: "150/20",
					},
					{
						name: "Coil Pcs / Roll",
						image: "",
						price: "250/20",
					},
					{
						name: "Hukka Foil",
						image: "",
						price: "10",
					}
				]
			},
		]
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
