<template>
	<div class="pa-4">
		<v-card
			max-width="1000"
			class="mx-auto pa-2"
		>
			<v-row class="ma-0 pa-0"
				justify="center"
				align="center"
			>
				<v-col cols="12"
					class="pa-1"
					xl="8"
					lg="8"
					md="8"
					sm="7"
				>
					<v-autocomplete
						v-model="friends"
						:disabled="isUpdating"
						:items="people"
						filled
						chips
						color="blue-grey lighten-2"
						placeholder="Select menu item group"
						item-text="name"
						item-value="name"
						multiple
						prepend-inner-icon="emoji_food_beverage"
						hide-details="auto"
						attach=""
						clearable
					>
						<template #selection="data">
							<v-chip
								v-bind="data.attrs"
								:input-value="data.selected"
								close
								@click="data.select"
								@click:close="remove(data.item)"
							>
								<v-avatar left>
									<v-img :src="data.item.avatar" />
								</v-avatar>
								{{ data.item.name }}
							</v-chip>
						</template>
						<template #item="data">
							<template v-if="typeof data.item !== 'object'">
								<v-list-item-content v-text="data.item" />
							</template>
							<template v-else>
								<v-list-item-avatar>
									<img :src="data.item.avatar">
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title v-html="data.item.name" />
									<v-list-item-subtitle v-html="data.item.group" />
								</v-list-item-content>
							</template>
						</template>
					</v-autocomplete>
				</v-col>
				<v-col cols="12"
					class="pa-1"
					xl="4"
					lg="4"
					md="4"
					sm="5"
				>
					<v-text-field
						v-model="order.location"
						clearable
						filled
						prepend-inner-icon="explore"
						label="Your location here..."
						hide-details="auto"
					/>
				</v-col>
				<v-col cols="12"
					class="d-flex justify-center pa-1"
				>
					<v-btn depressed
						class="purple-gradient"
						dark
					>
						<v-icon>fastfood</v-icon>
						<span v-if="$vuetify.breakpoint.width > 255"
							class="ml-2"
						>start my order</span>
					</v-btn>
				</v-col>
			</v-row>
		</v-card>
	</div>
</template>
<script>
export default {
	name: "OrderNowComponent",
	data: () => ({
		order: {
			location: ""
		},
		friends: [],
		isUpdating: false,
		name: "Midnight Crew",
		srcs: {
			burger: "https://i.insider.com/5d8ca1222e22af53447766c2?width=1100&format=jpeg&auto=webp",
			vegMomo: "https://c.ndtvimg.com/2020-01/2brioi88_momos_625x300_21_January_20.jpg",
			chickenBiryani: "https://static.toiimg.com/thumb/54308405.cms?imgsize=510571&width=800&height=800",
			aaloPakoda: "https://www.whiskaffair.com/wp-content/uploads/2020/07/Aloo-Pakora-3.jpg",
			samosaTarkari: "https://akm-img-a-in.tosshub.com/sites/dailyo//story/embed/201805/chaat-samosa_050218055428.jpg",
			chickenKorma: "https://i.ndtvimg.com/i/2016-10/chicken-korma_650x400_51475662188.jpg",
			buffChowmein: "https://i.ytimg.com/vi/NYpY3fg7pbA/maxresdefault.jpg",
			chickenChowmein: "https://i.ndtvimg.com/i/2016-06/noodles-625_625x350_41465896870.jpg"
		},
	}),
	computed: {
		people() {
			return [
				{ header: "Fast food" },
				{
					name: "Burger & Chips",
					group: "Fast food",
					avatar: this.srcs.burger
				},
				{
					name: "Fried Veg Momo",
					group: "Fast food",
					avatar: this.srcs.vegMomo
				},
				{
					name: "Chicken Biryani",
					group: "Fast food",
					avatar: this.srcs.chickenBiryani
				},
				{
					name: "Aalo Pakauda",
					group: "Fast food",
					avatar: this.srcs.aaloPakoda
				},
				{ divider: true },
				{ header: "Momo & Chowmein" },
				{
					name: "Samosa Tarkari",
					group: "Momo & Chowmein",
					avatar: this.srcs.samosaTarkari
				},
				{
					name: "Chicken Korma",
					group: "Momo & Chowmein",
					avatar: this.srcs.chickenKorma
				},
				{
					name: "Buff Chowmein",
					group: "Momo & Chowmein",
					avatar: this.srcs.buffChowmein
				},
				{
					name: "Chicken Chowmein",
					group: "Momo & Chowmein",
					avatar: this.srcs.chickenChowmein
				},
			]
		},
	},
	methods: {
		remove(item) {
			const index = this.friends.indexOf(item.name)
			if (index >= 0) this.friends.splice(index, 1)
		},
	},
}
</script>
<style scoped>
::v-deep.v-autocomplete:not(.v-input--is-focused).v-select--chips input {
	max-height: 25px;
}
</style>
