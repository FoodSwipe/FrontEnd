<template>
	<div class="pa-4">
		<v-card
			color="brown lighten-4"
			max-width="100vw"
			class="mx-auto pa-2 order-now-card"
		>
			<v-row class="ma-0 pa-0"
				justify="center"
				align="center"
			>
				<v-col cols="12"
					class="pa-1"
					xl="6"
					lg="6"
					md="5"
					sm="7"
				>
					<v-autocomplete
						v-model="friends"
						:disabled="isUpdating"
						:items="people"
						filled
						chips
						color="blue darken-2"
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
					xl="2"
					lg="2"
					md="3"
					sm="12"
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
import helper from "@/Helper"
export default {
	name: "OrderNowComponent",
	data: () => ({
		order: {
			location: ""
		},
		friends: [],
		isUpdating: false,
		name: "Midnight Crew",
	}),
	computed: {
		people() {
			return helper.returnMockMenuItems()
		},
		srcs() {
			return helper.returnMockSrcs()
		}
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
.order-now-card {
	/*background: linear-gradient(rgba(248, 249, 250, 0), rgba(246, 242, 248, 0)), url("https://media-cdn.tripadvisor.com/media/photo-s/0b/05/09/21/dessert.jpg") no-repeat fixed center;*/
	/*background-size: cover;*/
}
</style>
