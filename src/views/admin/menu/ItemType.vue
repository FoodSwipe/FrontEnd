<template>
	<div>
		<v-data-table
			dark
			:search="searchItemTypes"
			:headers="headers"
			:items="itemTypes"
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
						v-model="searchItemTypes"
						solo
						label="Search item types"
						hide-details
						prepend-inner-icon="search"
					/>
					<v-divider
						class="mx-4"
						inset
						vertical
					/>
					<v-dialog
						v-model="dialog"
						dark
						max-width="600"
					>
						<template #activator="{ on, attrs }">
							<v-btn
								color="primary"
								dark
								v-bind="attrs"
								v-on="on"
							>
								<v-icon>add_circle</v-icon><span v-if="$vuetify.breakpoint.width > 600"
									class="pl-2"
								>New Item Type</span>
							</v-btn>
						</template>
						<v-card class="dark-slate-border-2">
							<v-card-title>
								<span class="headline">Add item type</span>
							</v-card-title>
							<v-container>
								<v-row class="ma-0 pa-0">
									<v-col cols="12">
										<v-text-field
											v-model="newItemType.name"
											clearable
											filled
											label="Item type name (*)"
											prepend-inner-icon="title"
											hide-details="auto"
											:error-messages="addItemTypeErrorMessages.name"
										/>
									</v-col>
									<v-col cols="12">
										<v-file-input
											id="item-type-badge"
											v-model="newItemType.badge"
											required
											filled
											small-chips
											show-size
											accept="image/*"
											label="Add Image (*)"
											clearable
											multiple
											prepend-icon=""
											prepend-inner-icon="camera"
											:error-messages="addItemTypeErrorMessages.badge"
										/>
									</v-col>
								</v-row>
							</v-container>

							<v-card-actions>
								<v-spacer />
								<v-btn
									color="red"
									text
									@click="closeDialog"
								>
									Cancel
								</v-btn>
								<v-btn
									:disabled="!newItemType.badge"
									type="submit"
									color="blue darken-1"
									text
									@click="saveDialogForm"
								>
									Save
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
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
			<template #item.actions="{ item }">
				<v-btn icon
					color="error"
					@click="deleteItemType(item)"
				>
					<v-icon>delete</v-icon>
				</v-btn>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.badge="props">
				<v-edit-dialog
					v-model:return-value="props.item.name"
					dark
					large
					@save="saveItemBadge(props.item)"
					@cancel="cancelItemBadgeUpdate"
				>
					<v-avatar size="40"
						class="ma-2"
					>
						<v-img :src="props.item.badge" />
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
			<template #item.name="props">
				<v-edit-dialog
					v-model:return-value="props.item.name"
					dark
					@save="saveName(props.item)"
					@cancel="cancelNameUpdate"
				>
					<div>{{ props.item.name }}</div>
					<template #input>
						<v-text-field
							v-model="props.item.name"
							label="Item type name"
							single-line
							autofocus
						/>
					</template>
				</v-edit-dialog>
			</template>
		</v-data-table>
	</div>
</template>
<script>
import { mapGetters } from "vuex"
import { getFormData } from "@/Helper"

export default {
	data() {
		return {
			dialog: false,
			loading: false,
			searchItemTypes: null,
			imageForUpload: [],
			headers: [
				{ text: "ACTIONS", value: "actions", align: "center", sortable: false },
				{ text: "NAME", value: "name" },
				{ text: "BADGE", value: "badge", align: "center" },
			],
			newItemType: {
				name: "",
				badge: null,
			}
		}
	},
	computed: {
		...mapGetters({
			itemTypes: "itemType/allItemTypes",
			addItemTypeErrorMessages: "itemType/addItemTypeErrorMessages"
		})
	},
	created() {
		this.initialize();
	},
	methods: {
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		initialize() {
			this.loading = true
			this.$store.dispatch("itemType/fetchAllItemTypes")
			this.loading = false
		},
		async saveName(item) {
			const patched = await this.$store.dispatch("itemType/patch", {
				id: item.id,
				body: {
					name: item.name
				}
			})
			if (patched) {
				await this.openSnack("Item type name updated successfully.", "success")
			} else {
				await this.openSnack("Internal Server Error.")
			}
		},
		cancelNameUpdate() {
			//
		},
		async saveItemBadge(item) {
			const payload = getFormData({
				badge: this.imageForUpload[0]
			})
			const patched = await this.$store.dispatch("itemType/patch", {
				id: item.id,
				body: payload
			})
			if (patched) {
				await this.openSnack("Item type image updated successfully.", "success")
				this.initialize()
			} else {
				await this.openSnack("Internal Server Error.")
			}
		},
		cancelItemBadgeUpdate() {
			//
		},
		async deleteItemType(item) {
			const deleted = await this.$store.dispatch("itemType/delete", { id: item.id })
			if (deleted) {
				await this.openSnack("Item type deleted successfully.", "success")
				const deletedIndex = this.itemTypes.indexOf(item)
				this.itemTypes.splice(deletedIndex, 1)
			}
			else await this.openSnack("Internal Server Error.")
		},
		closeDialog(){
			this.$store.dispatch("itemType/clearAddItemTypeErrorMessages")
			this.newItemType = {
				name: "",
				badge: null,
			}
			this.dialog = false
		},
		async saveDialogForm() {
			const payload = getFormData({
				...this.newItemType,
				badge: this.newItemType.badge[0]
			})
			const created = await this.$store.dispatch("itemType/create", payload)
			if (created === true) {
				await this.openSnack("Item type added successfully.", "success")
				this.closeDialog()
				this.initialize()
			} else if (created === 500) {
				await this.openSnack("Internal Server Error.")
			} else {
				await this.openSnack("Please load a valid form.")
			}
		},
	},
}
</script>
