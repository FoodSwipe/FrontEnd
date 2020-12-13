<template>
	<v-card
		class="mx-auto item-detail-card"
		max-width="1200"
		flat
		color="transparent"
	>
		<v-card color="transparent"
			flat
		>
			<v-row class="ma-0 pa-0"
				no-gutters
			>
				<!--item image column-->
				<v-col cols="12"
					xl="6"
					lg="6"
					md="6"
					sm="6"
					class="pt-0 pt-sm-12 pt-md-12 pt-lg-12 pt-xl-12"
				>
					<transition
						appear
						:css="false"
						@before-enter="beforeEnter"
						@enter="enter"
					>
						<v-img
							:src="item.image"
							max-height="70vh"
							class="rounded-0 rounded-b"
						/>
					</transition>
					<div class="to-cart-column mb-1">
						<v-avatar v-ripple
							icon
							class="cursor elevation-4 blue-gradient"
							size="48"
						>
							<v-icon dark>
								add_shopping_cart
							</v-icon>
						</v-avatar>
					</div>
				</v-col>
				<!--crucial details				-->
				<v-col cols="12"
					xl="6"
					lg="6"
					md="6"
					sm="6"
					class="pa-0 pa-sm-6 pa-md-16 pa-lg-16 pa-xl-16"
				>
					<v-card-title class="pt-0">
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
					<v-list class="extra-details pt-0"
						dense two-line
					>
						<transition
							appear
							@before-enter="beforeEnterPriceItem"
							@enter="enterPriceItem"
						>
							<v-list-item>
								<v-list-item-icon>
									<v-icon :size="
											$vuetify.breakpoint.width > 275
												? '58'
												: $vuetify.breakpoint.width < 210
													? '28'
													: '40'
										"
										color="green darken-3"
									>
										monetization_on
									</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title class="price">
										{{ item.price }}
									</v-list-item-title>
									<v-list-item-subtitle>Price (RS)</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</transition>
						<v-row class="ma-0 pa-0"
							no-gutters
						>
							<v-col v-for="(extraDetail, index) in getExtraDetailsArray"
								:key="index"
								cols="6"
							>
								<v-list-item
									@click="1"
								>
									<v-list-item-icon v-if="$vuetify.breakpoint.width > 215">
										<v-avatar
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
							</v-col>
						</v-row>
						<v-list-item
							v-for="(exDetail, index) in getBooleanDetailsArray"
							:key="index+1000"
							@click="1"
						>
							<v-list-item-icon v-if="$vuetify.breakpoint.width > 215">
								<v-avatar
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
					<v-list class="ingredients-list pt-0"
						dense
					>
						<div class="pl-4">
							<v-icon color="pink lighten-1">
								casino
							</v-icon>
							<span class="text-uppercase pink--text mx-1">Ingredients</span>
						</div>
						<v-row class="ma-0 pa-0"
							no-gutters
						>
							<v-col v-for="(ingredient, index) in item.ingredients"
								:key="index"
								cols="4"
							>
								<v-list-item
									@click="1"
								>
									<v-list-item-content>
										<v-list-item-title>
											{{ ingredient }}
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-col>
						</v-row>
					</v-list>
					<div class="actions px-4">
						<v-btn dark
							class="peach-gradient"
							x-large
							block
						>
							<v-icon>
								add_shopping_cart
							</v-icon>
							<v-fade-transition mode="out-in">
								<span v-if="$vuetify.breakpoint.width > 240"
									class="pl-2"
								>Add to cart</span>
							</v-fade-transition>
						</v-btn>
					</div>
				</v-col>
			</v-row>
		</v-card>
		<hot-items />
		<v-card-text class="review-section">
			<v-row class="ma-0 pa-0"
				no-gutters
				align="center"
			>
				<v-col
					cols="12"
					xl="3"
					lg="3"
					md="4"
					sm="4"
				>
					<v-subheader class="d-flex justify-center align-center review-item-subheader">
						<v-avatar
							color="grey darken-1"
							class="elevation-4"
							:size="
								$vuetify.breakpoint.width > 600
									? '32'
									: '20'
							"
						>
							<v-icon dark
								:size="
									$vuetify.breakpoint.width > 600
										? '18'
										: '14'
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
			<v-card class="ma-0 pa-0 mx-auto"
				max-width="900"
				flat
				color="transparent"
			>
				<v-timeline dense
					reverse
				>
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
			</v-card>
		</v-card-text>
	</v-card>
</template>
<script>
import gsap from "gsap"

export default {
	name: "ItemDetailView",
	components: {
		HotItems: () => import("@/views/home/components/HotItems"),
	},
	data: () => ({
		myReview: "",
		item: {
			name: "Buff Chowmein",
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
			]
		},
		getStatDetailsArray() {
			return [
				{ field: "Total order appearances", value: 50 },
				{ field: "Total purchases", value: 50 },
				{ field: "Available?", value: this.item.isAvailable },
			]
		}
	},
	methods: {
		scrollToReviews() {
			this.$vuetify.goTo(".review-item-subheader")
		},
		beforeEnter(el) {
			el.style.opacity = 0
			el.style.transform = "scale(0,0)"
		},
		enter(el, done) {
			gsap.to(el, {
				duration: 1,
				opacity: 1,
				scale: 1,
				ease: "bounce.out",
				onComplete: done
			})
		},
		beforeEnterPriceItem(el) {
			el.style.opacity = 0
			el.style.transform = "scale(0,0)"
		},
		enterPriceItem(el, done) {
			gsap.to(el, {
				duration: 1,
				opacity: 1,
				scale: 1,
				onComplete: done
			})
		}
	}
}
</script>
<style lang="scss" scoped>
.item-detail-card {
	scroll-behavior: smooth;
}
.price {
	transition: all .3s;
	font-family: 'Yeon Sung', cursive;
	font-size: 2.4rem !important;
	line-height: 2.4rem !important;
	color: green;
	@media only screen and (max-width: 230px) {
		font-size: 2rem;
		line-height: 2rem;
	}
	@media only screen and (max-width: 210px) {
		font-size: 1.52rem;
		line-height: 1.52rem;
	}
}
.to-cart-column {
	display: flex;
	justify-content: center;
	margin-top: -24px;
}
.reviews {
	transition: all .3s;
	font-size: 1.5rem;
	line-height: 1.5rem;
	@media only screen and (max-width: 600px) {
		font-size: 1.2rem;
		line-height: 1.2rem;
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
.review-section
	//background-image: linear-gradient(gold, green)
</style>
