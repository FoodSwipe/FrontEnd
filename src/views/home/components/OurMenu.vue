<template>
	<v-card min-height="100vh"
		width="100vw"
		flat
		tile
		color="#fff0f0"
		class="pa-4 d-flex justify-center align-center"
		style="position: relative;"
	>
		<div class="custom-shape-divider-top-1626805339">
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
			<div style="position: relative;">
				<v-chip
					style="position: absolute; left: 2px; top: 10px;"
					color="rgb(255 217 217)"
				>
					Menu
				</v-chip>
			</div>
			<v-row class="ma-0 pa-0">
				<v-col cols="12"
					xl="6" lg="6"
					md="6"
				>
					<v-list max-width="600"
						color="transparent"
						class="mx-auto"
					>
						<v-list-item>
							<v-list-item-avatar size="200">
								<v-img
									:src="require('@/assets/premiumQuality.png')"
									height="200"
									contain
								/>
							</v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title>
									Get Premium Quality Food Only
								</v-list-item-title>
								<v-list-item-subtitle>
									Your appetite is our first priority
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-avatar size="200">
								<v-img
									:src="require('@/assets/moreChoices.png')"
									height="200"
									contain
								/>
							</v-list-item-avatar>
							<v-list-item-content>
								More choices
								<v-list-item-subtitle>
									We have large variety of food and beverage items. Just swipe our menu and order your preference.
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-avatar size="200"
								color="transparent"
							>
								<v-img
									:src="require('@/assets/fastDelivery.png')"
									height="200"
									width="250"
									contain
								/>
							</v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title>
									Gain Time
								</v-list-item-title>
								<v-list-item-subtitle>
									Life can be complicated but ordering food doesn't have to be. Let us take care of the details while you focus on what really matters.
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-col>
				<v-col cols="12"
					xl="6" lg="6"
					md="6"
					class="px-0"
				>
					<v-expansion-panels
						focusable
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
								<v-row class="ma-0 pa-0">
									<v-col v-for="(menuItem, i) of menuItemGroup.items"
										:key="(i + 1) * 21"
										cols="12"
										xl="6"
										lg="6"
										md="6"
										sm="12"
										class="ma-0 pa-0"
									>
										<v-list color="transparent">
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
										</v-list>
									</v-col>
								</v-row>
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>
				</v-col>
			</v-row>
			<div class="py-4" />
		</v-card>
	</v-card>
</template>
<script>
export default {
	name: "OurMenu",
	data: () => ({
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
.custom-shape-divider-top-1626805339 {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
}

.custom-shape-divider-top-1626805339 svg {
	position: relative;
	display: block;
	width: calc(237% + 1.3px);
	height: 500px;
}

.custom-shape-divider-top-1626805339 .shape-fill {
	fill: #ffe7e7;
}
</style>
