<template>
	<div>
		<v-row class="ma-0 pa-0">
			<v-breadcrumbs v-if="!loading"
				dark
				:items="topRecommendedBreadcrumbs"
				class="px-1 pt-3"
			>
				<template #item="{ item }">
					<v-breadcrumbs-item
						class="admin-breadcrumb-item"
						:to="item.href"
						:disabled="item.disabled"
					>
						{{ item.text.toUpperCase() }}
					</v-breadcrumbs-item>
				</template>
			</v-breadcrumbs>
		</v-row>
		<v-data-table
			:loading="loading"
			dark
			:search="searchTopItems"
			:headers="headers"
			:items="topRecommendItems"
		>
			<template #top>
				<v-toolbar>
					<v-app-bar-nav-icon>
						<v-icon>
							group_work
						</v-icon>
					</v-app-bar-nav-icon>
					<v-toolbar-title>Item Types</v-toolbar-title>
					<v-divider
						class="mx-4"
						inset
						vertical
					/>
					<v-text-field
						v-model="searchTopItems"
						solo
						label="Search item types"
						hide-details
						prepend-inner-icon="search"
					/>
				</v-toolbar>
			</template>
			<template #no-data>
				<v-btn
					color="primary"
					@click="initialize"
				>
					Reset
				</v-btn>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.top="{item}">
				<v-checkbox v-model="item.top"
					color="orange"
					@change="toggleItemTopStatus(item)"
				/>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.recommended="{item}">
				<v-checkbox v-model="item.recommended"
					color="purple"
					@change="toggleItemRecommendedStatus(item)"
				/>
			</template>
		</v-data-table>
	</div>
</template>
<script>
import { mapGetters } from "vuex"

export default {
	name: "TopRecommendedItemsTable",
	data: () => ({
		loading: false,
		searchTopItems: "",
		headers: [
			{ text: "ID", value: "id" },
			{ text: "MENU_ITEM", value: "menu_item.name" },
			{ text: "TOP", value: "top", align: "start" },
			{ text: "RECOMMEND", value: "recommended", align: "start" },
		],
		topRecommendedBreadcrumbs: [
			{
				text: "> Home",
				disabled: false,
				href: "/admin/home",
			},
			{
				text: "Top | Recommend",
				disabled: true,
			}
		],
	}),
	computed: {
		...mapGetters({
			topRecommendItems: "menuItem/topRecommendedItems"
		})
	},
	async created() {
		await this.initialize()
	},
	methods: {
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async initialize() {
			this.loading = true
			const fetched = await this.$store.dispatch("menuItem/fetchTopRecommendedItems")
			if (!fetched) {
				await this.openSnack("Internal server error. Please try again")
				this.topRecommendItems = []
			}
			this.loading = false
		},
		async toggleItemTopStatus(item) {
			const patched = await this.$store.dispatch("menuItem/patchTopRecommended", {
				id: item.id,
				body: {
					top: item.top
				}
			})
			if (patched === true) {
				if (item.top) {
					await this.openSnack(`${item.menu_item.name} set as a top item.`, "success")
				} else {
					await this.openSnack(`${item.menu_item.name} removed from top items.`, "success")
				}
			} else if (patched === 500) {
				await this.openSnack("Internal server error. Please try again.")
			} else {
				await this.openSnack(patched)
			}
		},
		async toggleItemRecommendedStatus(item) {
			const patched = await this.$store.dispatch("menuItem/patchTopRecommended", {
				id: item.id,
				body: {
					recommended: item.recommended
				}
			})
			if (patched === true) {
				if (item.recommended) {
					await this.openSnack(`${item.menu_item.name} set as a recommended item.`, "success")
				} else {
					await this.openSnack(`${item.menu_item.name} removed from recommended items.`, "success")
				}
			} else if (patched === 500) {
				await this.openSnack("Internal server error. Please try again.")
			} else {
				await this.openSnack(patched)
			}
		},
	}
}
</script>
