<template>
	<v-dialog
		v-model="dialog"
		fullscreen
		hide-overlay
		close-delay="1000"
		open-delay="1000"
		transition="dialog-bottom-transition"
	>
		<v-card
			class="zero-border-radius"
			color="rgb(251 250 241)"
		>
			<v-card-title class="sticky-dialog-top">
				<v-avatar
					size="40"
					class="mr-4 elevation-3"
				>
					<v-icon
						dark
						size="22"
					>
						{{ formIcon }}
					</v-icon>
				</v-avatar>
				<span class="form-title">{{ formTitle }}</span>
				<v-spacer />
				<span>
					<v-btn
						icon
						style="background: grey;"
						@click="close"
					>
						<v-icon color="white">close</v-icon>
					</v-btn>
				</span>
			</v-card-title>
			<v-card flat
				max-width="800"
				class="mx-auto" color="transparent"
			>
				<v-row class="ma-0 pa-0"
					justify="center" align="center"
				>
					<v-col cols="12"
						xl="4"
						lg="4"
						md="4"
						sm="4"
					>
						<v-avatar
							size="180"
						>
							<v-img
								v-if="editedIndex !== -1"
								:src="editedItem.image"
							/>
						</v-avatar>
					</v-col>
					<v-col cols="12"
						xl="8"
						lg="8"
						md="8"
						sm="8"
					>
						<v-list
							v-show="editedIndex !== -1"
							class="pa-0 mt-3"
						>
							<v-list-item>
								<v-list-item-content>
									<p
										class="headline cursor"
										@click="routeToUserDetailPage(editedItem.id)"
									>
										{{ editedItem.f_name }} {{ editedItem.l_name }}
										<v-tooltip bottom>
											<template #activator="{ on, attrs }">
												<v-icon
													v-ripple
													v-bind="attrs"
													color="green darken-1"
													v-on="on"
												>
													check
												</v-icon>
											</template>
											<span>Active</span>
										</v-tooltip>
									</p>
									<v-divider class="mb-2" />
									<div class="mb-2">
										<v-chip
											label
											color="blue lighten-5"
											class="mr-1 mb-1"
										>
											<v-icon left>
												stars
											</v-icon>
											<b>Superuser</b>
										</v-chip>
										<v-chip
											label
											dark
											class="mb-1"
										>
											<v-icon
												left
												color="white"
											>
												sentiment_satisfied_alt
											</v-icon>
											<b>Staff</b>
										</v-chip>
									</div>
									<p class="mb-0 mb-2">
										<v-icon class="small-detail-icon">
											mdi-shape-plus
										</v-icon>
										<b>Date created:</b>
										<span class="px-1">{{ editedItem.created_at }}</span>
									</p>
									<p class="mb-0 mb-2">
										<v-icon class="small-detail-icon">
											mdi-plus
										</v-icon>
										<b>Created by:</b>
										<span class="px-1"> Kiran Parajuli </span>
									</p>
									<p class="mb-0 mb-2">
										<v-icon class="small-detail-icon">
											mdi-account-network
										</v-icon>
										<b>Total Members:</b>
										<span class="px-1">558</span>
									</p>
									<p class="mb-0">
										<v-icon class="small-detail-icon">
											mdi-pencil
										</v-icon>
										<b>Last Updated By:</b>
										<span class="px-1">Sam Gellaitry</span>
									</p>
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-col>
				</v-row>
				<v-row class="ma-0 pa-0 px-4">
					<v-col
						cols="12"
						class="pl-0"
					>
						<p class="heading ma-0 pa-0">
							<v-icon class="pb-1"
								size="30"
							>
								account_circle
							</v-icon>
							Personal Information
						</p>
						<v-divider class="pb-2" />
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-text-field
							id="branch-name"
							v-model="editedItem.name"
							class="ma-0"
							outlined
							dense
							clearable
							label="Name"
							prepend-inner-icon="mdi-form-textbox"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-combobox
							v-model="editedItem.contacts"
							class="ma-0 pa-0"
							:items="[]"
							hide-selected
							hint="Add contact number and hit Enter to add a new one."
							label="Contacts"
							multiple
							small-chips
							deletable-chips
							type="number"
							outlined
							dense
							attach=""
							clearable
							prepend-inner-icon="mdi-phone-classic"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0 checkbox-input-column"
					>
						<v-checkbox
							id="is_main"
							v-model="editedItem.is_main"
							label="Is Main Branch?"
							append-icon="mdi-map-marker-star-outline"
							hide-details="auto"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0 checkbox-input-column"
					>
						<v-checkbox
							id="is_approved"
							v-model="editedItem.is_approved"
							label="Approval Status"
							append-icon="mdi-check-circle"
							hide-details="auto"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-file-input
							id="member-image-input"
							v-model="editedItem.imageForUpload"
							class="ma-0"
							outlined
							dense
							small-chips
							show-size
							accept="image/*"
							label="Branch Image"
							clearable
							multiple
							prepend-icon=""
							prepend-inner-icon="mdi-camera"
						/>
					</v-col>
					<v-col
						cols="12"
						class="pl-0"
					>
						<p class="heading ma-0 pa-0">
							<v-icon class="pb-1"
								size="30"
							>
								mdi-map-marker
							</v-icon>
							Location Information
						</p>
						<v-divider class="pb-2" />
					</v-col>
					<v-col
						id="country-input-column"
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="event-country"
							v-model="editedItem.country"
							loading="countriesLoading"
							class="ma-0"
							allow-overflow
							dense
							cache-items
							item-text="name"
							item-value="id"
							:items="countries"
							attach=""
							outlined
							label="Country"
							clearable
							prepend-inner-icon="mdi-web"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>country</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="event-province"
							v-model="editedItem.province"
							loading="provincesLoading"
							class="ma-0"
							allow-overflow
							dense
							cache-items
							outlined
							attach=""
							label="Province"
							item-text="name"
							item-value="id"
							:items="provinces"
							clearable
							prepend-inner-icon="mdi-office-building-marker-outline"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>provinces</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="event-districts"
							v-model="editedItem.district"
							loading="districtsLoading"
							cache-items
							item-text="name"
							item-value="id"
							class="ma-0"
							allow-overflow
							dense
							outlined
							attach=""
							:items="districts"
							label="District"
							clearable
							prepend-inner-icon="mdi-map-marker-multiple-outline"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>district</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="event-municipality"
							v-model="editedItem.municipality"
							loading="municipalitiesLoading"
							cache-items
							item-text="name"
							item-value="id"
							class="ma-0"
							allow-overflow
							dense
							outlined
							attach=""
							label="Municipality"
							:items="municipalities"
							clearable
							prepend-inner-icon="mdi-google-maps"
							:disabled="editedItem.vdc > 0"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>municipality</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="event-municipality-ward"
							v-model="editedItem.municipality_ward"
							loading="municipalityWardsLoading"
							item-text="name"
							item-value="id"
							class="ma-0"
							allow-overflow
							cache-items
							dense
							outlined
							clearable
							attach=""
							label="Municipality Ward"
							:items="municipality_wards"
							:disabled="editedItem.vdc > 0"
							prepend-inner-icon="mdi-numeric"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>municipality ward</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="event-vdc"
							v-model="editedItem.vdc"
							loading="vdcsLoading"
							cache-items
							item-text="name"
							item-value="id"
							allow-overflow
							class="ma-0"
							dense
							attach=""
							outlined
							label="VDC"
							:items="vdcs"
							clearable
							prepend-inner-icon="mdi-home-map-marker"
							:disabled="editedItem.municipality > 0"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>vdc</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0 event-vdc-col"
					>
						<v-autocomplete
							id="event-vdc-ward"
							v-model="editedItem.vdc_ward"
							loading="vdcWardsLoading"
							item-text="name"
							item-value="id"
							class="ma-0"
							allow-overflow
							cache-items
							dense
							outlined
							clearable
							attach=""
							label="VDC Ward"
							:items="vdc_wards"
							:disabled="editedItem.municipality > 0"
							prepend-inner-icon="mdi-numeric"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>vdc ward</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col cols="12"
						class="pb-16"
					>
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
								@click="save"
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
import router from "@/router";
import {mapGetters} from "vuex";
import {cookCreateData, cookEditData, getFormData} from "@/Helper";

export default {
	name: "UserFormDialog",
	data: () => ({
		dialog: false,
		editedIndex: -1,
		editedItem: {
			f_name: "",
			l_name: "",
			email: "",
			phone: null,
			address: "",
			is_superuser: false,
			is_staff: false,
			imageForUpload: []
		},
		defaultItem: {},
		rules: [(value) => !value || value.size < 2000000 || "Image size should be less than 2 MB!"]
	}),
	computed: {

		formTitle() {
			return this.editedIndex === -1 ? "New User" : "Edit User"
		},
		formIcon() {
			return this.editedIndex === -1 ? "person_add" : "person"
		}
	},
	async created() {
		this.$bus.on("open-user-form-dialog-add-item", this.openDialog)
		this.$bus.on("open-user-form-dialog-edit-item", this.openEditDialog)
	},
	beforeUnmount() {
		this.$bus.off("open-user-form-dialog-add-item")
		this.$bus.off("open-user-form-dialog-edit-item")
	},
	methods: {
		openDialog() {
			this.dialog = true
		},

		openEditDialog(args) {
			this.editedIndex = args.editedIndex
			this.editedItem = args.editedItem
			this.openDialog()
		},

		close() {
			this.dialog = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},

		async save() {
			if (this.editedIndex > -1) {
				const body = cookEditData({
					target: "user",
					rawData: this.editedItem,
					imageKey: "image"
				})
				const userData = getFormData(body)
				await this.$store.dispatch(
					"user/update",
					{
						id: this.editedItem.id,
						body: userData
					}
				)
			} else {
				const body = cookCreateData({
					imageKey: "image",
					rawData: this.editedItem
				})
				const userData = getFormData(body)
				await this.$store.dispatch("user/create", userData)
			}
			this.$bus.emit("reload-users")
			this.close()
		},

		routeToUserDetailPage(itemId) {
			router.push({name: "User Detail", params: { id: itemId }})
		}
	},
}
</script>
<style lang="sass" scoped>
.zero-border-radius
	border-radius: 0

	.sticky-dialog-top
		position: sticky
		position: -webkit-sticky
		top: 0
		z-index: 200

.form-title
	color: white
	display: block
	@media only screen and (max-width: 255px)
		display: none

.v-input--selection-controls
	margin-top: 0

.small-detail-icon
	margin-top: -4px
	margin-right: 4px

.v-card__title
	background-color: #535151 !important

.branch-name
	margin: 0
	padding: 0
	font-size: 18px
	font-weight: 300

.cursor
	cursor: pointer

.checkbox-input-column
	::v-deep.v-input--checkbox
		margin: -5px 0 25px
		padding: 10px 10px
		border: 1px solid rgb(156 155 150) !important
		border-radius: 3px
	::v-deep.v-input--checkbox:hover
		border: 1px solid black !important
</style>
