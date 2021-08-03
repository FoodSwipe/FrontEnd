<template>
	<v-card width="100vw"
		color="#fcf8f2" tile
	>
		<v-toolbar class="px-2 mx-auto"
			max-width="1200"
			flat
			color="transparent"
			height="75"
		>
			<v-avatar size="70"
				class="mx-2 cursor"
				@click="$router.push('/')"
			>
				<v-img :src="require('@/assets/food_swipe_logo.png')"
					height="70"
					width="70"
				/>
			</v-avatar>
			<v-spacer />
			<v-scale-transition>
				<div
					v-if="$vuetify.breakpoint.width > 400"
					class="search-container"
				>
					<v-icon class="fast-food-icon"
						color="orange lighten-2"
					>
						fastfood
					</v-icon>
					<v-btn class="search-btn"
						icon
						color="orange"
						@click="searchMenuItems()"
					>
						<v-icon
							size="24"
						>
							search
						</v-icon>
					</v-btn>
					<input
						type="text"
						:value="search"
						placeholder="Search our store"
						class="search-store"
						@change="setSearchValue"
						@keypress.enter="searchMenuItems"
					>
				</div>
			</v-scale-transition>
			<v-spacer />
			<v-btn color="light-orange-gradient"
				class="elevation-0"
				icon
				small
				to="/"
			>
				<v-icon size="26">
					home
				</v-icon>
			</v-btn>
			<div class="px-4">
				<cart-indicator :dark="false" />
			</div>
		</v-toolbar>
		<v-scale-transition>
			<v-card
				v-if="$vuetify.breakpoint.width < 400"
				color="transparent"
				flat tile
				class="d-flex justify-center align-center pt-2"
			>
				<div class="search-container">
					<v-icon class="fast-food-icon"
						color="orange lighten-2"
					>
						fastfood
					</v-icon>
					<v-btn class="search-btn"
						icon
						color="orange"
						@click="searchMenuItems()"
					>
						<v-icon
							size="24"
						>
							search
						</v-icon>
					</v-btn>
					<input
						type="text"
						:value="search"
						placeholder="Search our store"
						class="search-store"
						@keypress="setSearchValue"
						@keypress.enter="searchMenuItems"
					>
				</div>
			</v-card>
		</v-scale-transition>
	</v-card>
</template>

<script>
import CartIndicator from "@/components/CartIndicator"
export default {
	name: "StoreToolBar",
	components: { CartIndicator },
	props: {},
	data: () => ({
		search: null
	}),
	computed: {},
	methods: {
		setSearchValue(e) {
			this.search = e.target.value
		},
		searchMenuItems() {
			this.$bus.emit("search-menu-item", { search: this.search})
		}
	}
}
</script>

<style lang="scss" scoped>
.search-container {
	position: relative;
	z-index: 2;
	.search-store {
		width: 50vw;
		max-width: 450px;
		height: 60px;
		box-shadow: rgb(28 28 28 / 8%) 0 2px 8px;
		border-radius: 4px;
		border: 1px solid rgb(232 232 232);
		padding: 0 50px;
		font-size: 14px;
		@media only screen and (max-width: 400px) {
			width: 90vw;
		}
	}
	.search-store:focus {
		outline: none;
	}
	.fast-food-icon {
		position: absolute; left: 15px; top: 15px;
	}
	.search-btn {
		position: absolute; right: 5px; top: 5px;
		@media only screen and (max-width: 400px) {
			top: 10px;
		}
	}
}
</style>
