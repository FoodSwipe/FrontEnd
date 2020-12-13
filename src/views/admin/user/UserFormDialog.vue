<template>
	<v-dialog
		v-model="dialog"
		fullscreen
		hide-overlay
		close-delay="1000"
		open-delay="1000"
		transition="dialog-bottom-transition"
	>
		<v-toolbar dark>
			<v-app-bar-nav-icon>
				<v-avatar
					size="40"
					class="elevation-10"
					style="border: 2px solid goldenrod;"
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
		<v-card
			class="rounded"
			color="rgb(251 250 241)"
		>
			<v-card flat
				max-width="800"
				class="mx-auto" color="transparent"
			>
				<v-row
					v-show="editedIndex !== -1"
					class="ma-0 pa-0"
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
						>
							<v-img
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
							Account Information
						</p>
						<v-divider class="pb-2" />
					</v-col>
					<v-col
						cols="12"
						xl="6"
						lg="6"
						md="6"
						sm="6"
						class="ma-0 pa-0 pr-sm-2 pr-md-2 pr-lg-2 pr-xl-2"
					>
						<v-text-field
							id="username"
							v-model="editedItem.username"
							class="ma-0"
							outlined
							dense
							clearable
							label="Username"
							prepend-inner-icon="account_circle"
						/>
					</v-col>
					<v-col
						cols="12"
						xl="6"
						lg="6"
						md="6"
						sm="6"
						class="ma-0 pa-0"
					>
						<v-text-field
							id="email"
							v-model="editedItem.email"
							class="ma-0 pl-sm-2 pl-md-2 pl-lg-2 pl-xl-2"
							outlined
							dense
							clearable
							label="Email address"
							prepend-inner-icon="alternate_email"
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
								face
							</v-icon>
							Profile Information
						</p>
						<v-divider class="pb-2" />
					</v-col>
					<v-col
						cols="12"
						xl="6"
						lg="6"
						md="6"
						sm="6"
						class="ma-0 pa-0"
					>
						<v-text-field
							id="first-name"
							v-model="editedItem.f_name"
							class="ma-0 pr-sm-2 pr-md-2 pr-lg-2 pr-xl-2"
							outlined
							dense
							clearable
							label="First name"
							prepend-inner-icon="title"
						/>
					</v-col>
					<v-col
						cols="12"
						xl="6"
						lg="6"
						md="6"
						sm="6"
						class="ma-0 pa-0"
					>
						<v-text-field
							id="last-name"
							v-model="editedItem.l_name"
							class="ma-0 pl-sm-2 pl-md-2 pl-lg-2 pl-xl-2"
							outlined
							dense
							clearable
							label="Last name"
							prepend-inner-icon="title"
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
							prepend-inner-icon="contact_phone"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-file-input
							id="user-image-input"
							v-model="editedItem.imageForUpload"
							class="ma-0"
							outlined
							dense
							small-chips
							show-size
							accept="image/*"
							label="Profile Image"
							clearable
							multiple
							prepend-icon=""
							prepend-inner-icon="camera"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-textarea
							id="user-bio"
							v-model="editedItem.bio"
							class="ma-0"
							outlined
							dense
							counter
							label="Bio"
							clearable
							prepend-inner-icon="info"
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
								vpn_key
							</v-icon>
							Permissions Information
						</p>
						<v-divider class="pb-2" />
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0 checkbox-input-column"
					>
						<v-checkbox
							id="is_main"
							v-model="editedItem.is_superuser"
							label="Is super user?"
							append-icon="stars"
							hide-details="auto"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0 checkbox-input-column"
					>
						<v-checkbox
							id="is_main"
							v-model="editedItem.is_staff"
							label="Is staff user?"
							hide-details="auto"
						>
							<template #append>
								<v-icon>account_circle</v-icon>
							</template>
						</v-checkbox>
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
			username: "",
			bio: "",
			contacts: [],
			birth_date: null,
			current_city: "",
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
.sticky-dialog-top
	position: sticky
	position: -webkit-sticky
	top: 0
	z-index: 200
	height: 55px

.form-title
	color: white
	display: block
	@media only screen and (max-width: 255px)
		display: none

.v-card__title
	background-color: #535151 !important

.checkbox-input-column
	::v-deep.v-input--checkbox
		margin: -5px 0 25px
		padding: 10px 10px
		border: 1px solid rgb(156 155 150) !important
		border-radius: 3px
	::v-deep.v-input--checkbox:hover
		border: 1px solid black !important
</style>
