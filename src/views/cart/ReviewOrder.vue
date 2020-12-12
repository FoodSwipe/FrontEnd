<template>
	<v-card max-width="600"
		flat
		class="mx-auto review-order-card"
	>
		<v-card-title class="grey--text text--darken-3">
			<v-icon>rate_review</v-icon>
			<span class="pl-3">Review Ordered Items</span>
		</v-card-title>
		<v-card-subtitle class="grey--text text--darken-3">
			Lets add some review to your ordered items so that others can decide according to your views.
		</v-card-subtitle>
		<v-card-text>
			<v-expansion-panels focusable
				popout
			>
				<v-expansion-panel
					v-for="(item,i) in items"
					:key="i"
				>
					<v-expansion-panel-header>
						<template #default>
							<v-avatar size="60"
								max-width="60"
							>
								<v-img :src="item.image" />
							</v-avatar>
							<span class="pl-3">{{ item.name }}</span>
						</template>
					</v-expansion-panel-header>
					<v-expansion-panel-content>
						<v-divider class="py-2" />
						<v-text-field
							v-model="reviewItem[item.name]"
							clearable
							filled
							:label="'Add review for ' + item.name"
							prepend-inner-icon="chat"
							hide-details
						>
							<template #append>
								<v-icon color="#774803"
									style="transform: rotate(305deg);"
								>
									send
								</v-icon>
							</template>
						</v-text-field>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-card-text>
		<v-card-actions class="d-flex justify-center pt-4 pb-8">
			<v-btn filled
				to="/store"
			>
				<v-icon>store</v-icon>
				<span v-if="$vuetify.breakpoint.width > 320"
					class="pl-2"
				>Return to store</span>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script>
export default {
	name: "ReviewOrderView",
	data: () => ({
		items: [
			{name: "Burger", image: "https://www.tasteofhome.com/wp-content/uploads/2018/01/Scrum-Delicious-Burgers_EXPS_CHMZ19_824_B10_30_2b-1.jpg"},
			{name: "Momo", image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/1/10/0/DV2802_Nepali-Momo_s4x3.jpg.rend.hgtvcom.616.462.suffix/1515644556794.jpeg"},
			{name: "Old Durbar", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShN4wBvhPWL2MLSONxeKbE4Wf_D_6l3FRzFg&usqp=CAU"}
		],
		reviewItem: {}
	})
}
</script>
<style lang="scss" scoped>
.review-order-card {
	transition: all .3s ease;
	margin: -130px 0 50px 0;
	background-color: aliceblue;
	@media only screen and (max-width: 600px) {
		margin: 0 0 50px 0;
		background-color: transparent;
	}
}
</style>
