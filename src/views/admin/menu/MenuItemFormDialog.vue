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
					<text-field v-model="editedItem.name"
						icon="title"
						label="name (*)"
						name="name"
						split
						:errors="menuItemFormErrors"
						@change="patch({name: editedItem.name})"
					/>

					<v-col cols="12"
						xl="6"
						lg="6"
						md="6"
						sm="6"
						class="checkbox-input-column"
					>
						<v-checkbox
							v-model="editedItem.is_veg"
							class="checkbox-field"
							label="Vegetarian ?"
							hide-details
							:error-messages="menuItemFormErrors['is_veg']"
							@change="patch({is_veg: editedItem.is_veg})"
						/>
					</v-col>

					<menu-item-group-field v-model="editedItem.menu_item_group"
						:errors="menuItemFormErrors"
						@change="patch({menu_item_group: editedItem.menu_item_group})"
					/>
					<text-field
						v-model="editedItem.weight"
						type="number"
						label="Weight (g)"
						icon="save_alt"
						name="weight"
						split
						hint="in grams for regular item and ml for bar item"
						:errors="menuItemFormErrors"
						@change="patch({weight: editedItem.weight})"
					/>
					<text-field
						id="item-calorie"
						v-model="editedItem.calorie"
						split
						type="number"
						label="Calorie (kCal)"
						icon="flash_on"
						name="calorie"
						:error-messages="menuItemFormErrors"
						@change="patch({calorie: editedItem.calorie})"
					/>
					<menu-item-type-field v-model="editedItem.item_type"
						:errors="menuItemFormErrors"
						@change="patch({item_type: editedItem.item_type})"
					/>
					<text-field
						id="item-ingredients"
						v-model="editedItem.ingredients"
						hint="Comma separated values will be very useful for item presentation"
						label="Ingredients"
						icon="casino"
						name="ingredients"
						:errors="menuItemFormErrors"
						@change="patch({ingredients: editedItem.ingredients})"
					/>
					<v-col cols="12"
						xl="6"
						lg="6"
						md="6"
						sm="6"
						class="checkbox-input-column"
					>
						<v-checkbox
							v-model="editedItem.is_bar_item"
							class="checkbox-field"
							label="BAR ITEM ?"
							hide-details
							:error-messages="menuItemFormErrors['is_bar_item']"
							@change="patch({is_veg: editedItem.is_bar_item})"
						/>
					</v-col>
					<v-scale-transition>
						<select-field
							v-if="editedItem.is_bar_item"
							id="bar-weight"
							v-model="editedItem.bar_size"
							split
							:options="BAR_SIZE_ARRAY"
							label="Bar item size"
							name="bar_size"
							icon="format_color_fill"
							:error-messages="menuItemFormErrors"
							@change="patch({bar_size: editedItem.bar_size})"
						/>
					</v-scale-transition>
					<v-col cols="12"
						class="form-group-heading"
					>
						Business Information
					</v-col>
					<text-field
						v-model="editedItem.price"
						label="Price (NRs) (*)"
						type="number"
						icon="money"
						name="price"
						:errors="menuItemFormErrors"
						split
						@change="patch({price: editedItem.price})"
					/>
					<text-field
						id="scale"
						v-model="editedItem.scale"
						split
						label="Scale"
						hint="How much (quantity(pcs) / weight(ml)) at this price?"
						type="number"
						icon="network_check"
						name="scale"
						:errors="menuItemFormErrors"
						@change="patch({scale: editedItem.scale})"
					/>
					<v-col cols="12"
						class="checkbox-input-column"
					>
						<v-checkbox
							v-model="editedItem.is_available"
							class="checkbox-field"
							label="IS AVAILABLE ?"
							hide-details
							:error-messages="menuItemFormErrors['is_available']"
							@change="patch({is_veg: editedItem.is_available})"
						/>
					</v-col>
					<v-col cols="12"
						class="form-group-heading"
					>
						More Information
					</v-col>
					<textarea-field
						id="description"
						v-model="editedItem.description"
						hint="Add features, specialities or uniqueness about the item."
						icon="message"
						counter="512"
						:errors="menuItemFormErrors"
						name="description"
						label="Description"
						@change="patch({description: editedItem.description})"
					/>
					<v-col cols="12">
						<v-file-input
							v-model="imageForUpload"
							outlined
							small-chips
							show-size
							accept="image/*"
							label="IMAGE (*)"
							clearable
							prepend-icon=""
							prepend-inner-icon="camera"
							hide-details="auto"
							:error-messages="menuItemFormErrors['image']"
							@change="patch({image: imageForUpload})"
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
								v-if="editedIndex === -1"
								:loading="loading"
								color="green lighten-5"
								class="green--text"
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
import { getFormData } from "@/Helper"
import Snack from "@/mixin/Snack"
import MenuItemGroupField from "@/components/FormFields/MenuItemGroupField"
import MenuItemTypeField from "@/components/FormFields/MenuItemTypeField"
import TextField from "@/components/FormFields/TextField"

export default {
	name: "MenuItemFormDialog",
	components: { TextField, MenuItemTypeField, MenuItemGroupField },
	mixins: [Snack],
	emits: ["reload"],
	data: () => ({
		loading: false,
		dialog: false,
		editedIndex: -1,
		imageForUpload: null,
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
		defaultItem: {
			name: "",
			description: "",
			ingredients: [],
			weight: 0,
			calorie: 0,
			scale: 1,
			price: 0,
			is_veg: false,
			is_available: true,
			is_bar_item: false,
			bar_size: "",
		},
		BAR_SIZE_ARRAY: ["Quarter", "Half", "Full"]
	}),
	computed: {
		...mapGetters({
			menuItemFormErrors: "menuItem/menuItemFormErrors",
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
	},
	beforeUnmount() {
		this.$bus.off("open-menu-item-form-dialog-add-item")
		this.$bus.off("open-menu-item-form-dialog-edit-item")
	},
	methods: {
		openDialog() {
			this.$store.dispatch("menuItem/clearFormErrors")
			this.imageForUpload = null
			this.editedItem.is_available = true
			this.dialog = true
		},

		async openEditDialog(args) {
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
					imageForUpload: null,
				}
				this.editedIndex = -1
			})
			this.dialog = false
		},
		async patch(payload) {
			if (this.editedIndex !== -1) {
				const patched = await this.$store.dispatch("menuItem/patch", {
					id: this.editedItem.id,
					body: payload
				})
				if (patched === true) {
					await this.openSnack("Menu item updated successfully.", "success")
					this.$emit("reload")
				} else if (patched === false) {
					await this.openSnack("Internal server error. Please try again.")
				}
			}
		},
		async createMenuItem() {
			this.loading = true
			const payload = getFormData({
				...this.editedItem,
				image: this.imageForUpload
			})
			const created = await this.$store.dispatch("menuItem/create", payload)
			if (created === true) {
				await this.openSnack("Menu item added successfully.", "success")
				this.$emit("reload")
				this.close()
			} else if (created === 500) {
				await this.openSnack("Internal Server Error.")
			} else {
				await this.openSnack("Please load a valid form.")
			}
			this.loading = false
		},
		async save() {
			if (this.editedIndex === -1) {
				await this.createMenuItem()
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
		background-color: #1e1e1e;
		margin-top: 0;
		padding: 15px 14px;
		border: 1px solid #545454 !important;
		border-radius: 4px;
		&:hover {
			border: 1.2px solid white !important;
		}
	}
}
th[role='columnheader'] span {
	font-weight: bold !important;
}
</style>
