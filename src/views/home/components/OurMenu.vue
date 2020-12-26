<template>
	<div id="menuColumn">
		<div class="text-center pa-2">
			<v-avatar size="120"
				tile
			>
				<v-img :src="logo" />
			</v-avatar>
			<p class="our-menu">
				Our Menu
			</p>
		</div>
		<v-card max-width="800"
			class="mx-auto my-2 py-4 our-menu-wrapper-card"
			flat
		>
			<v-row class="ma-0 pa-0"
				align="center" justify="center"
			>
				<v-expansion-panels focusable
					popout
					dark
				>
					<v-expansion-panel v-for="(menuItemGroup, index) of menuItemGroups"
						:key="index"
						class="menu-list"
					>
						<v-expansion-panel-header class="menu-item-group-name">
							{{ menuItemGroup.name }}
						</v-expansion-panel-header>
						<v-expansion-panel-content>
							<v-row class="ma-0 pa-0"
								no-gutters
							>
								<v-col v-for="(menuItem, i) of menuItemGroup.items"
									:key="(i + 1) * 21"
									cols="12"
									xl="6"
									lg="6"
									md="6"
									sm="12"
								>
									<v-list-item>
										<v-list-item-icon>
											<v-avatar size="30"
												color="grey darken-3"
												class="slight-up"
											>
												{{ menuItem.name[0] }}
											</v-avatar>
										</v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>{{ menuItem.name }}</v-list-item-title>
										</v-list-item-content>
										<v-list-item-action-text class="menu-item-price">
											{{ menuItem.price }}
										</v-list-item-action-text>
									</v-list-item>
								</v-col>
							</v-row>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-row>
		</v-card>
	</div>
</template>
<script>
export default {
	name: "OurMenu",
	data: () => ({
		logo: require("@/assets/food_swipe_logo.png"),
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
	created() {
		// do something
	}
}
</script>
<style lang="scss" scoped>
.our-menu {
	margin: 0;
	padding: 15px 0 0 0;
	font-size: 2.5rem;
	line-height: 2.5rem;
	font-family: 'Sacramento', cursive;
}
.custom-shape-divider-bottom-1608137131 {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
	transform: rotate(180deg);
}

.custom-shape-divider-bottom-1608137131 svg {
	position: relative;
	display: block;
	width: calc(109% + 1.3px);
	height: 97px;
}

.custom-shape-divider-bottom-1608137131 .shape-fill {
	fill: #292929;
}

/** For mobile devices **/
@media (max-width: 767px) {
	.custom-shape-divider-bottom-1608137131 svg {
		width: calc(186% + 1.3px);
		height: 102px;
	}
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
</style>
