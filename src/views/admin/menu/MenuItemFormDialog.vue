<template>
	<v-dialog
		v-model="dialog"
		dark
		fullscreen
		hide-overlay
		close-delay="1000"
		open-delay="1000"
		transition="dialog-bottom-transition"
	>
		<v-card flat>
			<v-toolbar>
				<v-app-bar-nav-icon>
					<v-avatar
						size="40"
						class="elevation-10 golden-rod-border-3"
					>
						<v-icon
							size="20"
						>
							{{ formIcon }}
						</v-icon>
					</v-avatar>
				</v-app-bar-nav-icon>
				<v-toolbar-title class="form-title">
					{{ formTitle }}
				</v-toolbar-title>
				<v-spacer />
				<v-btn
					icon
					@click="close"
				>
					<v-icon>
						close
					</v-icon>
				</v-btn>
			</v-toolbar>
			<v-card flat color="transparent"
				max-width="800"
				class="mx-auto"
			>
				<v-row
					v-if="editedIndex !== -1"
					class="ma-0 pa-0 pt-8"
					justify="center" align="center"
				>
					<v-col cols="12"
						xl="4"
						lg="4"
						md="4"
						sm="4"
						class="text-center"
					>
						<v-avatar
							size="180"
							color="orange"
							class="golden-rod-border-4"
						>
							<v-img
								:src="editedItem.image"
							/>
						</v-avatar>
					</v-col>
					<v-col cols="12">
						<v-list
							class="pa-0 mt-3"
						>
							<v-row class="ma-0 pa-0"
								no-gutters justify="center"
								align="center"
							>
								<v-col cols="12">
									<v-list-item>
										<v-list-item-content>
											<p class="headline text-center">
												{{ editedItem.name }}
												<v-tooltip bottom>
													<template #activator="{ on, attrs }">
														<v-icon
															v-if="editedItem.is_available"
															v-bind="attrs"
															color="green darken-1"
															v-on="on"
														>
															check
														</v-icon>
														<v-icon
															v-else
															v-bind="attrs"
															color="red darken-1"
															v-on="on"
														>
															close
														</v-icon>
													</template>
													<span v-if="editedItem.is_available">Available</span>
													<span v-else>Not Available</span>
												</v-tooltip>
											</p>
											<v-divider class="mb-2" />
										</v-list-item-content>
									</v-list-item>
								</v-col>
								<v-col v-for="(showCaseItem, index) in topShowBoxData"
									:key="index"
									cols="6"
								>
									<v-list-item>
										<v-list-item-icon>
											<v-icon class="small-detail-icon">
												{{ showCaseItem.icon }}
											</v-icon>
										</v-list-item-icon>
										<v-list-item-content
											class="mb-0 mb-2"
										>
											<v-list-item-title>{{ showCaseItem.field }}:</v-list-item-title>
											<v-list-item-action-text>{{ showCaseItem.value }}</v-list-item-action-text>
										</v-list-item-content>
									</v-list-item>
								</v-col>
							</v-row>
						</v-list>
					</v-col>
				</v-row>
				<v-row class="ma-0 pa-0"
					justify="center" align="center"
				>
					<v-col cols="12"
						class="form-group-heading"
					>
						Menu Item Information
					</v-col>
					<v-col cols="12"
						xl="6"
						lg="6"
						md="6"
						sm="6"
					>
						<v-text-field
							id="name"
							v-model="editedItem.name"
							label="Name (*)"
							filled
							clearable
							prepend-inner-icon="title"
							hide-details="auto"
							:error-messages="menuItemFormErrors.name"
						/>
					</v-col>
					<v-col cols="12"
						xl="6"
						lg="6"
						md="6"
						sm="6"
						class="checkbox-input-column"
					>
						<v-checkbox
							id="is-veg"
							v-model="editedItem.is_veg"
							label="Vegetarian ?"
							hide-details="auto"
							:error-messages="menuItemFormErrors.is_veg"
						/>
					</v-col>
					<v-col cols="12">
						<v-autocomplete
							id="item-group"
							v-model="editedItem.menu_item_group"
							:items="menuItemGroups"
							item-text="name"
							item-value="id"
							filled
							clearable
							attach=""
							label="Item Group (*)"
							hide-details="auto"
							prepend-inner-icon="bubble_chart"
							:value="editedItem.menu_item_group"
							return-object
							:error-messages="menuItemFormErrors.menu_item_group"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>Menu Item Group</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col cols="6">
						<v-text-field
							id="item-weight"
							v-model="editedItem.weight"
							filled
							clearable
							type="number"
							label="Weight (g)"
							hide-details="auto"
							prepend-inner-icon="save_alt"
							hint="in grams for regular item and ml for bar item"
							:error-messages="menuItemFormErrors.weight"
						/>
					</v-col>
					<v-col cols="6">
						<v-text-field
							id="item-calorie"
							v-model="editedItem.calorie"
							filled
							clearable
							type="number"
							label="Calorie (kCal)"
							hide-details="auto"
							prepend-inner-icon="flash_on"
							:error-messages="menuItemFormErrors.calorie"
						/>
					</v-col>
					<v-col cols="12">
						<v-autocomplete id="item-type"
							v-model="editedItem.item_type"
							:items="itemTypes"
							item-text="name"
							item-value="id"
							filled
							small-chips
							deletable-chips
							multiple
							attach=""
							clearable
							label="Item type"
							hide-details="auto"
							prepend-inner-icon="group_work"
							return-object
							:error-messages="menuItemFormErrors.item_type"
						/>
					</v-col>
					<v-col cols="12">
						<v-text-field
							id="item-ingredients"
							v-model="editedItem.ingredients"
							hint="Comma separated values will be very useful for item presentation"
							label="Ingredients"
							filled
							clearable
							prepend-inner-icon="casino"
							hide-details="auto"
							:error-messages="menuItemFormErrors.ingredients"
						/>
					</v-col>
					<v-col cols="6"
						xl="6"
						lg="6"
						md="6"
						sm="6"
						class="checkbox-input-column"
					>
						<v-checkbox
							id="is-bar-item"
							v-model="editedItem.is_bar_item"
							label="Is Bar Item?"
							append-icon="local_bar"
							hide-details="auto"
							:error-messages="menuItemFormErrors.is_bar_item"
						/>
					</v-col>
					<v-scale-transition>
						<v-col v-if="editedItem.is_bar_item"
							cols="6"
							xl="6"
							lg="6"
							md="6"
							sm="6"
						>
							<v-select
								id="bar-weight"
								v-model="editedItem.bar_size"
								dark
								:items="BAR_SIZE_ARRAY"
								label="Bar item size"
								hide-details="auto"
								clearable
								filled
								attach=""
								prepend-inner-icon="format_color_fill"
								:error-messages="menuItemFormErrors.bar_size"
							/>
						</v-col>
					</v-scale-transition>
					<v-col cols="12"
						class="form-group-heading"
					>
						Business Information
					</v-col>
					<v-col cols="12"
						xl="6"
						lg="6"
						md="6"
						sm="6"
					>
						<v-text-field
							id="price"
							v-model="editedItem.price"
							label="Price (NRs) (*)"
							filled
							type="number"
							clearable
							prepend-inner-icon="money"
							hide-details="auto"
							:error-messages="menuItemFormErrors.price"
						/>
					</v-col>
					<v-col cols="12"
						xl="6"
						lg="6"
						md="6"
						sm="6"
					>
						<v-text-field
							id="scale"
							v-model="editedItem.scale"
							label="Scale"
							hint="How much (quantity(pcs) / weight(ml)) at this price?"
							filled
							type="number"
							clearable
							prepend-inner-icon="network_check"
							hide-details="auto"
							:error-messages="menuItemFormErrors.scale"
						/>
					</v-col>
					<v-col cols="12"
						class="checkbox-input-column"
					>
						<v-checkbox
							id="is-available"
							v-model="editedItem.is_available"
							label="Is available?"
							hide-details="auto"
							:error-messages="menuItemFormErrors.is_available"
						/>
					</v-col>
					<v-col cols="12"
						class="form-group-heading"
					>
						More Information
					</v-col>
					<v-col cols="12">
						<v-textarea
							id="description"
							v-model="editedItem.description"
							label="Description"
							filled
							clearable
							hint="Add features, specialities or uniqueness about the item."
							prepend-inner-icon="message"
							hide-details="auto"
							:error-messages="menuItemFormErrors.description"
						/>
					</v-col>
					<v-col cols="12">
						<v-file-input
							id="item-image"
							v-model="imageForUpload"
							filled
							small-chips
							show-size
							accept="image/*"
							label="Add Image (*)"
							clearable
							multiple
							prepend-icon=""
							prepend-inner-icon="camera"
							hide-details="auto"
							:error-messages="menuItemFormErrors.image"
						/>
					</v-col>
					<v-col cols="12">
						<v-card-actions>
							<v-spacer />
							<v-btn
								color="red lighten-5"
								class="red--text"
								depressed
								@click="close"
							>
								Cancel
							</v-btn>
							<v-btn
								color="blue lighten-5"
								class="blue--text"
								depressed
								@click.stop="save"
							>
								Save
							</v-btn>
						</v-card-actions>
					</v-col>
				</v-row>
			</v-card>
		</v-card>
	</v-dialog>
</template>
<script>
import { mapGetters } from "vuex"
import { cookEditData, getFormData } from "@/Helper"

export default {
	name: "MenuItemFormDialog",
	data: () => ({
		dialog: false,
		editedIndex: -1,
		imageForUpload: [],
		editedItem: {
			id: null,
			name: "",
			description: "",
			ingredients: [],
			weight: null,
			calorie: null,
			scale: 1,
			price: null,
			is_veg: false,
			is_available: true,
			is_bar_item: false,
			bar_size: "",
			menu_item_group: null,
			item_type: null,
			image: null,
			created_at: null,
			created_by: null,
			updated_at: null,
			updated_by: null,
		},
		defaultItem: {},
		BAR_SIZE_ARRAY: ["Quarter", "Half", "Full"]
	}),
	computed: {
		...mapGetters({
			menuItemFormErrors: "menuItem/menuItemFormErrors",
			menuItemGroups: "menuItemGroup/allMenuItemGroups",
			itemTypes: "itemType/allItemTypes",
		}),
		formTitle() {
			return this.editedIndex === -1 ? "New menu item" : "Edit menu item"
		},
		formIcon() {
			return this.editedIndex === -1 ? "add_circle" : "edit"
		},
		topShowBoxData() {
			return [
				{field: "Created at", value: this.editedItem.created_at},
				{field: "Created by", value: this.editedItem.created_by.username},
				{field: "Updated at", value: this.editedItem.updated_at},
				{field: "Updated by", value: (this.editedItem.updated_by) ? this.editedItem.updated_by.username : "None"},
				{field: "Bar Item", value: this.editedItem.is_bar_item},
				{field: "Price (NRs)", value: this.editedItem.price + " / " + this.editedItem.scale + (this.editedItem.is_bar_item) ? "ml": "g"},
			]
		}
	},
	async created() {
		this.$bus.on("open-menu-item-form-dialog-add-item", this.openDialog)
		this.$bus.on("open-menu-item-form-dialog-edit-item", this.openEditDialog)
		await this.$store.dispatch("itemType/fetchAllItemTypes")
		await this.$store.dispatch("menuItemGroup/fetchAll")
	},
	beforeUnmount() {
		this.$bus.off("open-menu-item-form-dialog-add-item")
		this.$bus.off("open-menu-item-form-dialog-edit-item")
	},
	methods: {
		openDialog() {
			this.dialog = true
			this.$store.dispatch("menuItem/clearFormErrors")
			this.imageForUpload = []
		},

		openEditDialog(args) {
			this.editedIndex = args.editedIndex
			this.editedItem = args.editedItem
			this.openDialog()
		},

		close() {
			this.$store.dispatch("menuItem/clearFormErrors")
			this.$nextTick(() => {
				this.editedItem = {
					id: null,
					name: "",
					ingredients: [],
					weight: null,
					calorie: null,
					price: null,
					is_veg: null,
					is_bar_item: null,
					bar_size: null,
					is_available: null,
					menu_item_group: null,
					item_type: [],
					image: null,
					imageForUpload: [],
				}
				this.editedIndex = -1
			})
			this.dialog = false
		},
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async save() {
			if (this.editedIndex > -1) {
				let rawData = cookEditData(this.editedItem, ["item_type", "menu_item_group"])
				if (this.imageForUpload.length > 0) {
					rawData = {
						...rawData,
						image: this.imageForUpload[0]
					}
				}
				const payload = getFormData(rawData)
				const updated = await this.$store.dispatch(
					"menuItem/update",
					{
						id: this.editedItem.id,
						body: payload
					}
				)
				if (updated === true) {
					await this.openSnack("Menu item updated successfully.", "success")
					this.$bus.emit("reload-menu-items")
					this.close()
				} else if (updated === 500) {
					await this.openSnack("Internal Server Error.")
				} else {
					await this.openSnack("Please load a valid form.")
				}
			} else {
				const rawData = cookEditData(this.editedItem, ["item_type", "menu_item_group"])
				const payload = getFormData({
					...rawData,
					image: this.imageForUpload[0]
				})
				const created = await this.$store.dispatch("menuItem/create", payload)
				if (created === true) {
					await this.openSnack("Menu item added successfully.", "success")
					this.$bus.emit("reload-menu-items")
					this.close()
				} else if (created === 500) {
					await this.openSnack("Internal Server Error.")
				} else {
					await this.openSnack("Please load a valid form.")
				}
			}
		},
	}
}
</script>

<style lang="scss" scoped>
.form-title {
	color: white;
	display: block;
	@media only screen and (max-width: 255px) {
		display: none;
	}
}
.v-card__title {
	background-color: #535151 !important
}
.form-group-heading {
	font-weight: 500;
	background-color: rgba(86, 86, 86, 0.4);
	border-radius: 10px;
	margin: 10px 0 7px 0;
}
.checkbox-input-column {
	::v-deep.v-input--checkbox {
		background-color: rgb(255 255 255 / 8%);
		margin-top: 0;
		padding: 18px 12px;
		border-bottom: 1px solid rgb(156 155 150) !important;
		border-radius: 3px 3px 0 0;
		&:hover {
			background-color: #484848;
		}
	}
}
::v-deep.v-autocomplete:not(.v-input--is-focused).v-select--chips input {
	max-height: 25px;
}
th[role='columnheader'] span {
	font-weight: bold !important;
}
</style>
