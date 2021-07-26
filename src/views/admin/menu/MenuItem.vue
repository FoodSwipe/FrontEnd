<template>
	<div>
		<v-row class="ma-0 pa-0">
			<v-breadcrumbs v-if="!isLoading"
				dark
				:items="menuItemBreadcrumbs"
				class="px-1 pt-3"
			>
				<template #item="{ item }">
					<v-breadcrumbs-item
						class="admin-breadcrumb-item"
						:href="item.href"
						:disabled="item.disabled"
					>
						{{ item.text.toUpperCase() }}
					</v-breadcrumbs-item>
				</template>
			</v-breadcrumbs>
		</v-row>
		<v-data-table
			dark
			:loading="isLoading"
			:headers="headers"
			:items="menuItems"
			:search="searchMenuItem"
			class="elevation-1"
		>
			<template #top>
				<v-toolbar
					flat
				>
					<v-toolbar-title>Menu Items</v-toolbar-title>
					<v-divider
						class="mx-4"
						inset
						vertical
					/>
					<v-text-field
						id="search-user"
						v-model="searchMenuItem"
						solo
						dense
						clearable
						hide-details
						prepend-inner-icon="search"
						placeholder="Search menu items"
					/>
					<v-spacer />
					<v-divider
						class="mx-4"
						inset
						vertical
					/>
					<v-btn
						dark
						color="primary"
						@click="openAddMenuItemFormDialog"
					>
						<v-icon dark>
							add_circle
						</v-icon>
					</v-btn>
					<menu-item-form-dialog @reload="initialize" />
				</v-toolbar>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.name="props">
				<v-edit-dialog
					v-model:return-value="props.item.name"
					dark
					@save="updateName(props.item)"
					@cancel="cancelNameUpdate"
				>
					<span class="menu-item-name">{{ props.item.name }}</span>
					<template #input>
						<v-text-field
							v-model="props.item.name"
							single-line
							counter
						/>
					</template>
				</v-edit-dialog>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.price="props">
				<v-edit-dialog
					v-model:return-value="props.item.price"
					dark
					@save="updatePrice(props.item)"
					@cancel="cancelPriceUpdate"
				>
					<span class="menu-item-price">{{ props.item.price }}</span>
					<template #input>
						<v-text-field
							v-model="props.item.price"
							single-line
							type="number"
						/>
					</template>
				</v-edit-dialog>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.is_veg="{ item }">
				<v-checkbox v-model="item.is_veg"
					color="green"
					@change="updateIsVeg(item)"
				/>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.is_available="{ item }">
				<v-checkbox v-model="item.is_available"
					color="orange"
					@change="updateIsAvailable(item)"
				/>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.is_bar_item="{ item }">
				<v-checkbox v-model="item.is_bar_item"
					color="orange"
					@change="updateIsBarItem(item)"
				/>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.type="{ item }">
				<v-row class="ma-0 pa-0 fill-height"
					align="center"
				>
					<v-avatar v-for="itemType of item.item_type"
						:key="itemType.id"
						size="20"
						class="mr-2"
					>
						<v-img :src="itemType.badge" />
					</v-avatar>
				</v-row>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.actions="{ item }">
				<v-btn icon
					color="primary"
					@click="openEditMenuItemFormDialog(item)"
				>
					<v-icon size="20">
						edit
					</v-icon>
				</v-btn>
				<v-btn icon
					color="error"
					@click="deleteItem(item)"
				>
					<v-icon size="20">
						delete
					</v-icon>
				</v-btn>
			</template>
			<template #no-data>
				<v-btn
					color="primary"
					@click="initialize"
				>
					Reset
				</v-btn>
			</template>
		</v-data-table>
	</div>
</template>
<script>
import { mapGetters } from "vuex"

export default {
	name: "MenuItemAdministration",
	components: {
		MenuItemFormDialog: () => import("./MenuItemFormDialog")
	},
	data: () => ({
		isLoading: false,
		dialogDelete: false,
		searchMenuItem: "",
		headers: [
			{ text: "ACTIONS", value: "actions", align: "start", sortable: false},
			{ text: "MENU ITEM", value: "name", },
			{ text: "PRICE (NRs)", value: "price" },
			{ text: "SCALE (pcs/ml)", value: "scale", align: "center"},
			{ text: "VEGETARIAN?", value: "is_veg", align: "center" },
			{ text: "IS BAR ITEM?", value: "is_bar_item", align: "center" },
			{ text: "AVAILABLE?", value: "is_available", align: "center" },
			{ text: "TYPE", value: "type"},
		],
		menuItemBreadcrumbs: [
			{
				text: "> Home",
				disabled: false,
				href: "/admin/home",
			},
			{
				text: "Menu Items",
				disabled: true,
			}
		]
	}),

	computed: {
		...mapGetters({
			menuItems: "menuItem/allMenuItems"
		})
	},

	created() {
		this.initialize()
	},

	methods: {
		async updatePrice(item) {
			const patched = await this.$store.dispatch("menuItem/patch", {
				id: item.id,
				body: {
					price: item.price
				}
			})
			if (patched === true) {
				await this.openSnack("Menu item price updated successfully.", "success")
			} else if(patched === 500) {
				await this.openSnack("Internal Server Error.")
			} else {
				await this.openSnack(patched.price[0])
			}
			await this.initialize()
		},
		cancelPriceUpdate() {
			//
		},
		async updateName(item) {
			const patched = await this.$store.dispatch("menuItem/patch", {
				id: item.id,
				body: {
					name: item.name
				}
			})
			if (patched === true) {
				await this.openSnack("Menu item name updated successfully.", "success")
			} else if (patched === 500) {
				await this.openSnack("Internal Server Error.")
			} else {
				await this.openSnack(patched.name[0])
			}
			await this.initialize()
		},
		cancelNameUpdate() {
			//
		},
		async updateIsVeg(item) {
			const patched = await this.$store.dispatch("menuItem/patch", {
				id: item.id,
				body: {
					is_veg: item.is_veg
				}
			})
			if (patched === true) {
				await this.openSnack("Menu item updated successfully.", "success")
			} else if (patched === 500) {
				await this.openSnack("Internal Server Error.")
			} else {
				await this.openSnack(patched.is_veg[0])
			}
		},
		async updateIsAvailable(item) {
			const patched = await this.$store.dispatch("menuItem/patch", {
				id: item.id,
				body: {
					is_available: item.is_available
				}
			})
			if (patched === true) {
				await this.openSnack("Menu item availability updated successfully.", "success")
			} else if (patched === 500) {
				await this.openSnack("Internal Server Error.")
			} else {
				await this.openSnack(patched.is_available[0])
			}
		},
		async updateIsBarItem(item) {
			const patched = await this.$store.dispatch("menuItem/patch", {
				id: item.id,
				body: {
					is_bar_item: item.is_bar_item
				}
			})
			if (patched === true) {
				await this.openSnack("Menu item assigned as a bar item.", "success")
			} else if (patched === 500) {
				await this.openSnack("Internal Server Error.")
			} else {
				await this.openSnack(patched.is_available[0])
			}
		},

		async initialize() {
			this.isLoading = true
			await this.$store.dispatch("menuItem/fetchAll")
			this.isLoading = false
		},

		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},

		async deleteItem(item) {
			const index = this.menuItems.indexOf(item)
			const reaction = confirm(`Are you sure you want to delete "${item.name}"?`);
			if (reaction === true) {
				await this.$store.dispatch(
					"menuItem/delete",
					{
						id: item.id,
					})
				this.menuItems.splice(index, 1)
				await this.openSnack(`${item.name} deleted successfully.`)
			}
		},

		openAddMenuItemFormDialog() {
			this.$bus.emit("open-menu-item-form-dialog-add-item")
		},
		async openEditMenuItemFormDialog(item) {
			if (item.menu_item_group) {
				await this.$store.dispatch("menuItemGroup/fetchAll", { search: item.menu_item_group.name })
			}
			if (item.item_type) {
				await this.$store.dispatch("itemType/fetchAllItemTypes", {search: item.item_type.name})
			}
			this.$bus.emit("open-menu-item-form-dialog-edit-item", {
				editedIndex: this.menuItems.indexOf(item),
				editedItem: Object.assign({}, item),
			})
		},
	},
}
</script>
<style lang="scss" scoped>
.menu-item-name {
	font-size: 1.1rem; line-height: 1.3rem;
}
.menu-item-price {
	font-size: 1.1rem; line-height: 1.3rem;
}
</style>
