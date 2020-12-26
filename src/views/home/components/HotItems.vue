<template>
	<v-card
		:loading="isLoading"
		flat
		class="rounded-0 pa-4"
	>
		<v-card-title class="hot-items">
			<u>Hot Items</u>
		</v-card-title>
		<v-card class="pa-0 mx-auto"
			flat max-width="1000"
			color="transparent"
		>
			<div class="swiper-container pa-1">
				<div class="swiper-wrapper">
					<v-card
						v-for="(item, index) in topItemsSet"
						:key="index"
						flat
						class="swiper-slide"
						max-width="140"
					>
						<!-- eslint-disable-next-line vue/no-v-for-template-key-on-child-->
						<v-badge
							avatar
							bordered
							overlap
							bottom
							offset-x="30"
							offset-y="20"
							color="white"
						>
							<template #badge>
								<v-avatar size="25"
									color="transparent"
								>
									<v-img :src="item.menu_item.item_type[0].badge" />
								</v-avatar>
							</template>

							<v-avatar size="100"
								color="white"
							>
								<v-img
									class="car-image"
									:src="item.menu_item.image"
									max-width="100%"
								/>
							</v-avatar>
						</v-badge>

						<p class="mb-0 text-center item-name">
							{{ item.menu_item.name }}
						</p>
					</v-card>
				</div>
				<div class="swiper-button-next" />
				<div class="swiper-button-prev" />
			</div>
		</v-card>
	</v-card>
</template>
<script>
import Swiper, { Navigation } from "swiper"
import { mapGetters } from "vuex"

export default {
	name: "HotItemsComponent",
	data: () => ({
		isLoading: false,
		topItemsSet: []
	}),
	computed: {
		...mapGetters({
			topItems: "menuItem/allTopItems"
		})
	},
	async created() {
		await this.initialize()
	},
	mounted() {
		Swiper.use([Navigation]);

		const mySwiper = new Swiper(".swiper-container", {
			slidesPerView: "auto",
			direction: "horizontal",
			loop: false,
			centeredSlides: true,
			spaceBetween: 0,
			speed: 400,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			}
		})
	},
	methods: {
		async initialize() {
			this.isLoading = true
			const fetched = await this.$store.dispatch("menuItem/fetchTopItems")
			if (fetched) {
				this.topItemsSet = this.topItems
			}
			this.isLoading = false
		}
	}
}
</script>
<style scoped>
.swiper-pagination{
	bottom: -1px !important;
}
</style>

<style scoped lang="sass">
.hot-items
	text-transform: uppercase
	font-size: 1.5rem
	line-height: 1.5rem
	font-family: "Rasa SemiBold", cursive
.item-name
	width: 100px
	font-size: 1rem
</style>
