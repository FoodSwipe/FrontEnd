<template>
	<v-card
		:loading="loading"
		class="mx-auto ma-1"
	>
		<template #progress>
			<v-progress-linear
				color="deep-purple"
				height="10"
				indeterminate
			/>
		</template>

		<v-img
			height="200"
			:src="item.image"
		/>

		<v-card-title class="item-name">
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

		<v-card-text class="item-details">
			<v-row
				align="center"
				class="ma-0 pa-0"
				no-gutters
			>
				<v-col cols="10">
					<div>
						<span class="rs">Rs</span><span class="item-price">{{ item.price }}</span>
					</div>
				</v-col>
				<v-spacer />
				<v-col cols="2"
					class="ma-0 pa-0"
				>
					<v-card-actions class="ma-0 pa-0">
						<v-tooltip bottom>
							<template #activator="{on, attrs}">
								<v-btn
									color="deep-purple lighten-2"
									icon
									v-bind="attrs"
									v-on="on"
								>
									<v-icon>
										add_shopping_cart
									</v-icon>
								</v-btn>
							</template>
							<span>Add to cart</span>
						</v-tooltip>
					</v-card-actions>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>
<script>
export default {
	name: "StoreItemCard",
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		loading: false,
		selection: 1,
	}),

	methods: {
		reserve() {
			this.loading = true

			setTimeout(() => (this.loading = false), 2000)
		},
	},
}
</script>
<style scoped lang="scss">
.item-name {
	font-size: 1rem;
	line-height: 1.2rem;
	padding: 5px 15px 0;
}
.item-details {
	padding: 2px 17px 0;
}
.v-card__title {
	font-weight: 400;
}
.item-price {
	color: green;
	font-size: 1.5rem;
	line-height: 1.5rem;
	font-family: 'Yeon Sung', cursive;
}
.rs {
	font-size: .8rem;
	line-height: .8rem;
	font-weight: bold;
	color: red;
	padding-right: 4px;
}
</style>
