<template>
	<v-card
		flat
		tile
		:loading="isLoading"
		class="pa-4"
		width="100vw"
		min-height="100vh"
		color="#ececec"
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
		<div class="py-8" />
		<v-card width="100%"
			class="px-2"
			flat tile
			color="transparent"
		>
			<top-sheet-card
				title="Hot items you can pick right now"
				color="orange"
			>
				<div class="d-flex flex-wrap">
					<peek-items
						v-for="(topItem, index) in topItemsSet"
						:key="topItem.id"
						class="swiper-slide"
						:item="topItem"
						:class="{
							'mr-3': topItemsSet.length !== index + 1
						}"
					/>
				</div>
			</top-sheet-card>

			<div class="py-8" />

			<top-sheet-card
				title="Recommendation from Foodswipe"
				color="teal"
			>
				<div class="d-flex flex-wrap">
					<peek-items
						v-for="(item, index) in recommendations"
						:key="item.id"
						:item="item"
						:class="{
							'mr-3': recommendations.length !== index + 1
						}"
					/>
				</div>
			</top-sheet-card>
			<div class="py-8" />
			<top-sheet-card
				title="Swipe Through Our Menu Item Collections"
				color="indigo"
			>
				<div class="d-flex flex-wrap">
					<menu-item-group-avatar
						v-for="(itemGroup, index) in itemGroups"
						:key="itemGroup.id"
						:item-group="itemGroup"
						class="mb-2"
						:class="{
							'mr-3': itemGroups.length !== index + 1
						}"
					/>
				</div>
			</top-sheet-card>
		</v-card>
		<start-order-component />
	</v-card>
</template>
<script>
import { mapGetters } from "vuex"
import StartOrderComponent from "@/components/StartOrder"
import PeekItems from "@/components/PeekItems"
import TopSheetCard from "@/components/TopSheetCard"
import MenuItemGroupAvatar from "@/components/MenuItemGroupAvatar"

export default {
	name: "HotItemsComponent",
	components: { MenuItemGroupAvatar, TopSheetCard, PeekItems, StartOrderComponent },
	data: () => ({
		isLoading: false,
		topItemsSet: [],
		recommendations: [],
		itemGroups: [],
	}),
	computed: {
		...mapGetters({
			topItems: "menuItem/allTopItems",
			recommendedItems: "menuItem/allRecommendedItems",
			menuItemGroups: "menuItemGroup/allMenuItemGroups"
		})
	},
	async created() {
		await this.initialize()
	},
	methods: {
		async initialize() {
			this.isLoading = true
			let fetched
			fetched = await this.$store.dispatch("menuItem/fetchTopItems")
			if (fetched) {
				this.topItemsSet = this.topItems
			}
			fetched = await this.$store.dispatch("menuItem/fetchRecommendedItems")
			if (fetched) {
				this.recommendations = this.recommendedItems
			}
			fetched = await this.$store.dispatch("menuItemGroup/withItems")
			if (fetched) {
				this.itemGroups = this.menuItemGroups.results
			}
			console.log(this.itemGroups)
			this.isLoading = false
		}
	}
}
</script>


<style scoped lang="sass">
.hot-items
	display: flex
	justify-content: center
	text-transform: uppercase
	font-size: 1.5rem
	line-height: 1.5rem
	font-family: "Rasa SemiBold", cursive
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
	fill: #e5e5e5;
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
	fill: #e5e5e5;
}

/** For tablet devices **/
@media (min-width: 768px) and (max-width: 1023px) {
	.custom-shape-divider-bottom svg {
		width: calc(202% + 1.3px);
		height: 322px;
	}
}
</style>
