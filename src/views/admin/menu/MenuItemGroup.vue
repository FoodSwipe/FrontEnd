<template>
	<div>
		<v-row class="ma-0 pa-0">
			<v-breadcrumbs v-if="!isLoading"
				dark
				:items="menuItemGroupBreadcrumbs"
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
			:loading="isLoading"
			dark
			:headers="headers"
			:items="menuItemGroups.results"
			:search="searchMenuItemGroup"
			class="elevation-1"
		>
			<template #top>
				<v-toolbar
					flat
				>
					<v-toolbar-title>Menu Item Groups</v-toolbar-title>
					<v-divider
						class="mx-4"
						inset
						vertical
					/>
					<v-text-field
						id="search-user"
						v-model="searchMenuItemGroup"
						solo
						dense
						clearable
						hide-details
						prepend-inner-icon="search"
						placeholder="Search menu item groups"
					/>
					<v-spacer />
					<v-divider
						class="mx-4"
						inset
						vertical
					/>
					<v-btn
						color="primary"
						dark
						@click="openCreateDialog()"
					>
						<v-icon>add_circle</v-icon>
					</v-btn>
					<v-dialog
						v-model="dialog"
						dark
						max-width="600"
					>
						<v-card class="dark-slate-border-2">
							<v-card-title>
								<span class="headline">{{ formTitle }}</span>
							</v-card-title>

							<v-container>
								<v-row class="ma-0 pa-0">
									<v-col cols="12">
										<v-text-field
											v-model="editedItem.name"
											clearable
											filled
											label="Menu item name"
											prepend-inner-icon="title"
											hide-details="auto"
											:error-messages="formErrors.name"
										/>
									</v-col>
									<v-col cols="12">
										<v-textarea
											v-model="editedItem.description"
											label="Description"
											filled
											clearable
											counter
											prepend-inner-icon="message"
											hide-details="auto"
											:error-messages="formErrors.description"
										/>
									</v-col>
									<v-col cols="12">
										<v-file-input
											id="member-image-input"
											v-model="imageForUpload"
											filled
											small-chips
											show-size
											accept="image/*"
											label="Add Image"
											clearable
											multiple
											prepend-icon=""
											prepend-inner-icon="camera"
											hide-details="auto"
											:error-messages="formErrors.image"
										/>
									</v-col>
								</v-row>
							</v-container>

							<v-card-actions>
								<v-spacer />
								<v-btn
									color="red"
									text
									@click="close"
								>
									Cancel
								</v-btn>
								<v-btn
									color="blue darken-1"
									text
									@click.prevent="save()"
								>
									Save
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-dialog v-model="dialogDelete"
						max-width="500px"
						dark
					>
						<v-card
							color="grey darken-3"
							class="dark-slate-border-2"
						>
							<v-card-title class="headline d-flex justify-center">
								Are you sure you want to delete this menu item group?
							</v-card-title>
							<v-card-actions>
								<v-spacer />
								<v-btn color="red"
									text @click="closeDelete"
								>
									Cancel
								</v-btn>
								<v-btn color="blue darken-1"
									text @click="deleteItemConfirm"
								>
									OK
								</v-btn>
								<v-spacer />
							</v-card-actions>
						</v-card>
					</v-dialog>
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
					<span class="item-group-name">{{ props.item.name }}</span>
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
			<template #item.image="props">
				<v-edit-dialog
					v-model:return-value="props.item.name"
					dark
					large
					@open="cancelItemImageUpdate"
					@save="saveItemImage(props.item)"
					@cancel="cancelItemImageUpdate"
					@close="cancelItemImageUpdate"
				>
					<v-avatar size="40"
						class="ma-2"
					>
						<v-img
							:src="props.item.image"
						/>
					</v-avatar>
					<template #input>
						<v-file-input
							id="item-type-image-input"
							v-model="imageForUpload"
							class="pt-3"
							filled
							small-chips
							show-size
							accept="image/*"
							label="Add Image"
							clearable
							multiple
							prepend-icon=""
							prepend-inner-icon="camera"
							single-line
						/>
					</template>
				</v-edit-dialog>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.actions="{ item }">
				<v-btn icon
					color="primary"
					@click="editItem(item)"
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
import { getFormData } from "@/Helper"
import { mapGetters } from "vuex"

export default {
	name: "MenuItemGroupAdministration",
	data: () => ({
		dialog: false,
		dialogDelete: false,
		isLoading: false,
		searchMenuItemGroup: "",
		itemTypeArray: [
			"Spicy",
			"Milky",
			"Cheesy",
		],
		headers: [
			{ text: "Actions", value: "actions", align: "start", sortable: false},
			{ text: "Menu Item Group", value: "name", },
			{ text: "Image", value: "image" },
		],
		editedIndex: -1,
		imageForUpload: [],
		editedItem: {
			id: "",
			name: "",
			description: [],
			created_at: null,
			created_by: null,
			updated_at: null,
			updated_by: null,
			image: null,
		},
		defaultItem: {
			id: "",
			name: "",
			description: [],
			created_at: null,
			created_by: null,
			updated_at: null,
			updated_by: null,
			image: null,
		},
		menuItemGroupBreadcrumbs: [
			{
				text: "> Home",
				disabled: false,
				href: "/admin/home",
			},
			{
				text: "Menu Groups",
				disabled: true,
			}
		]
	}),

	computed: {
		...mapGetters({
			menuItemGroups: "menuItemGroup/allMenuItemGroups",
			formErrors: "menuItemGroup/menuItemGroupFormErrors"
		}),
		formTitle() {
			return this.editedIndex === -1 ? "New Menu Item Group" : "Edit Menu Item Group"
		},
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
		async openCreateDialog() {
			await this.$store.dispatch("menuItemGroup/clearFormErrors")
			this.imageForUpload = []
			this.dialog = true

		},
		async updateName(item) {
			const patched = await this.$store.dispatch("menuItemGroup/patch", {
				id: item.id,
				body: {
					name: item.name
				}
			})
			if (patched === true) {
				await this.openSnack("Menu item group name updated successfully.", "success")
			} else if (patched === 500) {
				await this.openSnack("Internal Server Error.")
			} else {
				await this.openSnack(patched.name[0])
			}
			await this.initialize()
		},
		cancelNameUpdate() {
			// do nothing
		},
		async saveItemImage(item) {
			const payload = getFormData({
				image: this.imageForUpload[0]
			})
			const patched = await this.$store.dispatch("menuItemGroup/patch", {
				id: item.id,
				body: payload
			})
			if (patched) {
				await this.openSnack("Item type image updated successfully.", "success")
				await this.initialize()
			} else {
				await this.openSnack("Internal Server Error.")
			}
		},
		async cancelItemImageUpdate() {
			this.imageForUpload = []
		},
		async initialize() {
			this.isLoading = true
			await this.$store.dispatch("menuItemGroup/fetchAll")
			this.isLoading = false
		},

		async editItem(item) {
			await this.$store.dispatch("menuItemGroup/clearFormErrors")
			this.editedIndex = this.menuItemGroups.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		deleteItem(item) {
			this.editedIndex = this.menuItemGroups.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialogDelete = true
		},

		async deleteItemConfirm() {
			const deleted = await this.$store.dispatch("menuItemGroup/delete", {
				id: this.editedItem.id
			})
			if (deleted === true) {
				await this.openSnack(this.editedItem.name + " deleted successfully.", "success")
				this.menuItemGroups.splice(this.editedIndex, 1)
				this.closeDelete()
			} else {
				await this.openSnack("Internal Server Error.")
			}
		},

		close() {
			this.dialog = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},

		closeDelete() {
			this.dialogDelete = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},

		async save() {
			if (this.imageForUpload.length > 0) {
				this.editedItem.image = this.imageForUpload[0]
			} else {
				delete this.editedItem.image
			}
			const payload = getFormData(this.editedItem)
			if (this.editedIndex > -1) {
				const updated = await this.$store.dispatch(
					"menuItemGroup/update",
					{
						id: this.editedItem.id,
						body: payload
					}
				)
				if (updated === true) {
					await this.openSnack("Menu item updated successfully.", "success")
					await this.close()
					await this.initialize()
				} else if (updated === 500) {
					await this.openSnack("Internal Server Error.")
				} else {
					await this.openSnack("Please load a valid form.")
				}
			} else {
				const created = await this.$store.dispatch("menuItemGroup/create", payload)
				if (created === true) {
					await this.openSnack("Menu item group added successfully.", "success")
					await this.close()
					await this.initialize()
				} else if (created === 500) {
					await this.openSnack("Internal Server Error.")
				} else {
					await this.openSnack("Please load a valid form.")
				}
			}
		},
	},
}
</script>
<style lang="scss" scoped>
::v-deep.v-autocomplete:not(.v-input--is-focused).v-select--chips input {
	max-height: 25px;
}
.item-group-name {
	font-size: 1.1rem; line-height: 1.3rem;
}
</style>
