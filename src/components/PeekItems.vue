<template>
	<v-card
		class="peek-item"
		max-width="140"
		height="320"
		color="elevation-1"
		rounded
	>
		<v-row class="ma-0 pa-0"
			justify="center" align="center"
		>
			<v-col cols="12"
				class="d-flex justify-center"
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
						<v-avatar
							size="25"
							color="transparent"
							class="elevation-4"
						>
							<v-img
								v-if="item.menu_item.item_type.length > 0"
								:src="item.menu_item.item_type[0].badge"
							/>
							<span v-else
								class="grey rounded-circle"
								style="width: 14px;"
							>x</span>
						</v-avatar>
					</template>

					<v-avatar size="100"
						color="white"
						class="item-image-avatar"
					>
						<v-img
							class="car-image"
							:src="item.menu_item.image"
							max-width="100%"
						/>
					</v-avatar>
				</v-badge>
			</v-col>
			<v-col cols="12"
				class="d-flex justify-center"
			>
				<p class="mb-0 text-center item-name">
					{{ item.menu_item.name }}
				</p>
			</v-col>
			<v-col cols="12"
				class="d-flex justify-center"
			>
				<p class="mb-0 text-center">
					<span class="nrs">NRs</span><span class="number-font item-price">
						{{ item.menu_item.price }}
					</span>
				</p>
			</v-col>
			<v-col v-if="!cartItems[item.menu_item.name]"
				cols="12"
				class="d-flex justify-center"
			>
				<v-btn
					:loading="loadingCartBtn"
					dark
					class="to-cart-btn"
					color="orange"
					min-width="25"
					@click.prevent="addItemToCart(item.menu_item)"
				>
					<v-icon>
						add_shopping_cart
					</v-icon>
				</v-btn>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import ToCart from "@/mixin/ToCart"

export default {
	name: "PeekItems",
	mixins: [ToCart],
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		loadingCartBtn: null
	})
}
</script>

<style scoped lang="scss">
.item-price {
	color: green;
	font-size: 1.3rem;
}
.nrs {
	color: red;
	font-size: .875rem;
	font-weight: bold;
}
.item-image-avatar {
	max-width: 100%;
	-webkit-transition: all .4s ease; /* Safari and Chrome */
	-moz-transition: all .4s ease; /* Firefox */
	-ms-transition: all .4s ease; /* IE 9 */
	-o-transition: all .4s ease; /* Opera */
	transition: all .4s ease;
&:hover {
	 -webkit-transform:scale(1.2); /* Safari and Chrome */
	 -moz-transform:scale(1.2); /* Firefox */
	 -ms-transform:scale(1.2); /* IE 9 */
	 -o-transform:scale(1.2); /* Opera */
	 transform:scale(1.2);
 }
}
.hot-items-card {
	border-radius: 25px !important;
}
.to-cart-btn {
	border-radius: 25px;
}
.peek-item {
	background: linear-gradient(to bottom, #ffdba1, transparent);
}
</style>
