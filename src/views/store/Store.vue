<template>
	<v-row class="ma-0 pa-0"
		no-gutters
	>
		<v-col cols="12">
			<v-img
				class="store-image"
				src="https://static.winenews.it/2018/08/CiboVarioSicuro.jpg"
				gradient="to top right, rgba(0,0,0,.33), rgba(0,0,0,.5)"
				dark
				height="45vh"
			>
				<v-row class="ma-0 pa-0 fill-height"
					no-gutters
					justify="center"
					align="center"
				>
					<div class="display-4 store">
						Store
					</div>
				</v-row>
			</v-img>
			<v-col>
				<store-item-group />
			</v-col>
		</v-col>
	</v-row>
</template>
<script>
export default {
	name: "ItemStoreView",
	components: {
		StoreItemGroup: () => import("./StoreItemGroup")
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
</style>
