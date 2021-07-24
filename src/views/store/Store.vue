<template>
	<v-card width="100vw"
		flat tile
		color="#fff5e6"
	>
		<v-toolbar class="px-2 mx-auto"
			max-width="1200"
			flat
			color="#fcf8f2"
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
		<v-row class="ma-0 pa-0"
			no-gutters
		>
			<v-col cols="12">
				<store-item-group />
			</v-col>
			<start-order-dialog />
		</v-row>
	</v-card>
</template>
<script>
import CartIndicator from "@/components/CartIndicator"
export default {
	name: "ItemStoreView",
	components: {
		CartIndicator,
		StoreItemGroup: () => import("./StoreItemGroup"),
		StartOrderDialog: () => import("@/components/StartOrder")
	},
	data: function () {
		return {
			search: null
		};
	},
	methods: {
		setSearchValue(e) {
			this.search = e.target.value
		},
		searchMenuItems() {
			console.log(this.search)
			this.$bus.emit("search-menu-item", { search: this.search})
		}
	}
}
</script>
<style lang="scss" scoped>
.store-image {
	border-radius: 0 0 10px 10px;
}
.store {
	transition: all .3s;
	@media only screen and (max-width: 800px) {
		font-size: 4.5rem !important;
		line-height: 4.5rem !important;
	}
	@media only screen and (max-width: 350px) {
		font-size: 3.5rem !important;
		line-height: 3.5rem !important;
	}
	@media only screen and (max-width: 200px) {
		font-size: 2.5rem !important;
		line-height: 2.5rem !important;
	}
}
.search-container {
	position: relative;
	.search-store {
		width: 50vw;
		max-width: 450px;
		height: 60px;
		box-shadow: rgb(28 28 28 / 8%) 0 2px 8px;
		border-radius: 4px;
		border: 1px solid rgb(232 232 232);
		padding: 0 50px;
		font-size: 14px;
	}
	.search-store:focus {
		outline: none;
	}
	.fast-food-icon {
		position: absolute; left: 15px; top: 15px;
	}
	.search-btn {
		position: absolute; right: 5px; top: 5px;
	}
}
</style>
