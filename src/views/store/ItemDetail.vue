<template>
	<v-card
		class="mx-auto mt-2 item-detail-card"
		max-width="1200"
		flat
	>
		<v-card-title>
			{{ item.name }}
			<span
				v-for="(type, index) in item.type"
				:key="index"
				class="px-1"
			>
				<v-tooltip bottom>
					<template #activator="{on, attrs}">
						<v-avatar
							class="elevation-1"
							size="20"
							v-bind="attrs"
							v-on="on"
						>
							<v-img
								:src="type.image"
							/>
						</v-avatar>
					</template>
					<span>{{ type.name }}</span>
				</v-tooltip>
			</span>
		</v-card-title>
		<v-card-subtitle>
			<v-icon size="14"
				color="orange darken-2"
				class="mr-1"
			>
				account_circle
			</v-icon>John Doe
			<v-icon size="14"
				color="teal"
				class="mr-1"
			>
				event_note
			</v-icon>July 7, 2020
			<v-icon size="14"
				color="blue darken-2"
				class="mr-1"
			>
				rate_review
			</v-icon><u class="dotted-underline mx-1"
				@click="scrollToReviews()"
			>5 reviews</u>
		</v-card-subtitle>
		<v-img
			:src="item.image"
			height="45vh"
		/>
		<div class="to-cart-column">
			<v-avatar v-ripple
				icon
				class="to-cart-avatar elevation-4"
				size="48"
			>
				<v-icon dark>
					add_shopping_cart
				</v-icon>
			</v-avatar>
		</div>
		<v-card-text class="py-2">
			{{ item.description }}
		</v-card-text>
		<v-card-text class="py-0 item-detail-box">
			<v-row class="ma-0 pa-0"
				no-gutters
			>
				<v-col cols="12"
					xl="4"
					lg="4"
					md="4"
					sm="12"
				>
					<v-list two-line>
						<v-list-item @click="1">
							<v-list-item-icon>
								<v-icon :size="
										$vuetify.breakpoint.width > 275
											? '80'
											: $vuetify.breakpoint.width < 210
												? '28'
												: '40'
									"
									color="green darken-3"
								>
									monetization_on
								</v-icon>
							</v-list-item-icon>
							<v-list-item-content class="pt-0">
								<v-list-item-title class="price">
									{{ item.price }}
								</v-list-item-title>
								<v-list-item-subtitle>Price(RS)</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-list-item
							v-for="(statDetail, index) in getStatDetailsArray"
							:key="index"
							@click="1"
						>
							<v-list-item-icon v-if="$vuetify.breakpoint.width > 215">
								<v-avatar size="24"
									color="grey"
								>
									<span class="white--text">{{ statDetail.field[0].toUpperCase() }}</span>
								</v-avatar>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>
									{{ statDetail.value }}
								</v-list-item-title>
								<v-list-item-subtitle>{{ statDetail.field }}</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-col>
				<v-col cols="12"
					xl="4"
					lg="4"
					md="4"
					sm="6"
				>
					<v-list class="extra-details">
						<v-subheader>
							<v-icon color="blue darken-2">
								all_inclusive
							</v-icon>
							<span class="text-uppercase mx-1 blue--text text--darken-2">More Details</span>
						</v-subheader>
						<v-list-item
							v-for="(extraDetail, index) in getExtraDetailsArray"
							:key="index"
							@click="1"
						>
							<v-list-item-icon v-if="$vuetify.breakpoint.width > 215">
								<v-avatar size="24"
									color="grey"
								>
									<span class="white--text">{{ extraDetail.field[0].toUpperCase() }}</span>
								</v-avatar>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>
									{{ extraDetail.value }}
								</v-list-item-title>
								<v-list-item-subtitle class="text-capitalize">
									{{ extraDetail.field }}
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-list-item
							v-for="(exDetail, index) in getBooleanDetailsArray"
							:key="index+1000"
							@click="1"
						>
							<v-list-item-icon v-if="$vuetify.breakpoint.width > 215">
								<v-avatar size="24"
									color="grey"
								>
									<span class="white--text">{{ exDetail.field[0].toUpperCase() }}</span>
								</v-avatar>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>{{ exDetail.field }}</v-list-item-title>
							</v-list-item-content>
							<v-list-item-action>
								<v-icon v-if="exDetail.value"
									color="green"
								>
									done
								</v-icon>
								<v-icon v-else
									color="red"
								>
									close
								</v-icon>
							</v-list-item-action>
						</v-list-item>
					</v-list>
				</v-col>
				<v-col cols="12"
					xl="4"
					lg="4"
					md="4"
					sm="6"
				>
					<v-list class="ingredients-list">
						<v-subheader>
							<v-icon color="pink lighten-1">
								casino
							</v-icon>
							<span class="text-uppercase pink--text mx-1">Ingredients</span>
						</v-subheader>
						<v-list-item
							v-for="(ingredient, index) in item.ingredients"
							:key="index"
							@click="1"
						>
							<v-list-item-icon v-if="$vuetify.breakpoint.width > 215">
								<v-avatar size="24"
									color="grey"
								>
									<span class="white--text">{{ ingredient[0].toUpperCase() }}</span>
								</v-avatar>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>
									{{ ingredient }}
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-text>
			<v-row class="ma-0 pa-0"
				no-gutters
			>
				<v-col
					cols="12"
					xl="3"
					lg="3"
					md="4"
					sm="4"
				>
					<v-subheader class="d-flex justify-center review-item-subheader">
						<v-avatar
							color="grey darken-1"
							class="elevation-4"
							:size="
								$vuetify.breakpoint.width > 600
									? '40'
									: '30'
							"
						>
							<v-icon dark
								:size="
									$vuetify.breakpoint.width > 600
										? '22'
										: '18'
								"
							>
								rate_review
							</v-icon>
						</v-avatar><u class="mx-2 reviews">Reviews</u>
					</v-subheader>
				</v-col>
				<v-col
					cols="12"
					xl="8"
					lg="8"
					md="6"
					sm="7"
				>
					<v-text-field
						id="my-review"
						v-model="myReview"
						clearable
						placeholder="Add a review..."
						filled
						prepend-inner-icon="text_fields"
						append-icon="send"
						hide-details="auto"
					/>
				</v-col>
			</v-row>
			<v-timeline :dense="$vuetify.breakpoint.width < 600">
				<v-timeline-item
					v-for="n in 4"
					:key="n"
					large
				>
					<template #icon>
						<v-avatar>
							<v-img src="http://i.pravatar.cc/64" />
						</v-avatar>
					</template>
					<template #opposite>
						<span>June 15, 2020</span>
					</template>
					<v-card class="elevation-2">
						<v-card-title class="timeline-user-name py-2">
							Lorem ipsum
						</v-card-title>
						<v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>
					</v-card>
				</v-timeline-item>
			</v-timeline>
		</v-card-text>
	</v-card>
</template>
<script>
export default {
	name: "ItemDetailView",
	data: () => ({
		myReview: "",
		item: {
			name: "Buff Chowmein",
			description: "Sed porttitor lectus nibh. Proin eget tortor risus." +
				" Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus" +
				" nibh. Nulla porttitor accumsan tincidunt.",
			image: "https://goodfoodnepal.com/wp-content/uploads/2019/04/Buff-Chowmein.jpg",
			weight: 300,
			calorie: 500,
			ingredients: [
				"Dried or egg noodles",
				"chopped onions",
				"buffalo meat or sukuti",
				"chopped capsicum",
				"green chilli",
				"soy sause",
				"salt",
				"pinch of ajinomoto",
				"chopped coriander"
			],
			price: 150,
			isVeg: false,
			isAvailable: true,
			type: [
				{
					name: "Spicy",
					image: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
				},
				{
					name: "Non Veg",
					image: require("@/assets/nonveglogo.png")
				}
			]
		}
	}),
	computed: {
		getExtraDetailsArray() {
			return [
				{ field: "weight (in grams)", value: this.item.weight },
				{ field: "calorie in (kCal)", value: this.item.calorie },
			]
		},
		getBooleanDetailsArray() {
			return [
				{ field: "Vegetarian?", value: this.item.isVeg },
				{ field: "Available?", value: this.item.isAvailable },
			]
		},
		getStatDetailsArray() {
			return [
				{ field: "Total order appearances", value: 50 },
				{ field: "Total purchases", value: 50 },
			]
		}
	},
	methods: {
		scrollToReviews() {
			this.$vuetify.goTo(".review-item-subheader")
		}
	}
}
</script>
<style lang="scss" scoped>
.item-detail-card {
	scroll-behavior: smooth;
}
.dotted-underline {
	cursor: pointer;
	border-bottom: 2px dotted darkslategrey;
	text-decoration: none;
}
.price {
	transition: all .3s;
	font-family: 'Yeon Sung', cursive;
	font-size: 4rem;
	line-height: 4rem;
	color: green;
	@media only screen and (max-width: 230px) {
		font-size: 3rem;
		line-height: 3rem;
	}
	@media only screen and (max-width: 210px) {
		font-size: 2rem;
		line-height: 2rem;
	}
}
.to-cart-column {
	display: flex;
	justify-content: center;
	margin-top: -24px;
}
.to-cart-avatar {
	border: 2px solid #3054b0;
	background: #3054b0;
}
.reviews {
	transition: all .3s;
	font-size: 1.8rem;
	line-height: 1.8rem;
	@media only screen and (max-width: 600px) {
		font-size: 1.5rem;
		line-height: 1.5rem;
	}
}
</style>
<style lang="sass" scoped>
::v-deep.v-list-item__title
	white-space: normal !important
::v-deep.v-list-item__subtitle
	white-space: normal !important
.timeline-user-name
	font-size: 1rem
	line-height: 1rem
</style>
