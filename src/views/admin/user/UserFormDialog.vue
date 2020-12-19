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
								v-if="editedItem.image"
								:src="editedItem.image"
							/>
							<span v-else
								class="display-4"
							>
								{{ firstLetter }}
							</span>
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
										{{ editedItem.user.first_name }} {{ editedItem.user.last_name }}
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
									<div
										class="mb-2"
									>
										<v-chip
											v-show="editedItem.user.is_superuser"
											label
											color="purple lighten-1"
											class="mr-1 mb-1"
										>
											<v-icon left>
												stars
											</v-icon>
											<b>Superuser</b>
										</v-chip>
										<v-chip
											v-show="editedItem.user.is_staff"
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
											event
										</v-icon>
										<b class="pl-2">Date joined:</b>
										<span class="pl-2">{{ editedItem.user.date_joined }}</span>
									</p>
									<p class="mb-0 mb-2">
										<v-icon class="small-detail-icon">
											cake
										</v-icon>
										<b class="pl-2">Birth date:</b>
										<span class="pl-2">{{ editedItem.birth_date }}</span>
									</p>
									<p class="mb-0">
										<v-icon class="small-detail-icon">
											history
										</v-icon>
										<b class="pl-2">Last Updated At:</b>
										<span class="px-1">{{ editedItem.last_updated }}</span>
									</p>
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-col>
				</v-row>
				<v-form>
					<v-row class="ma-0 pa-0 px-4 pt-4">
						<v-col
							cols="12"
							class="form-group-heading"
						>
							<p class="heading ma-0 pa-0">
								<v-icon class="pb-1"
									size="30"
								>
									account_circle
								</v-icon>
								Account Information
							</p>
							<v-divider />
						</v-col>
						<v-col
							cols="12"
							xl="6"
							lg="6"
							md="6"
							sm="6"
						>
							<v-text-field
								id="username"
								v-model="editedItem.user.username"
								filled
								hide-details="auto"
								clearable
								label="Username (*)"
								required
								prepend-inner-icon="account_circle"
								:error-messages="addUserErrorMessages.username"
							/>
						</v-col>
						<v-col
							cols="12"
							xl="6"
							lg="6"
							md="6"
							sm="6"
						>
							<v-text-field
								id="email"
								v-model="editedItem.user.email"
								filled
								hide-details="auto"
								clearable
								label="Email address"
								prepend-inner-icon="alternate_email"
								:error-messages="addUserErrorMessages.email"
							/>
						</v-col>
						<v-col cols="12">
							<v-text-field
								id="password"
								v-model="editedItem.user.password"
								type="password"
								filled
								hide-details="auto"
								clearable
								label="Password (*)"
								autocomplete="on"
								prepend-inner-icon="lock"
								:error-messages="addUserErrorMessages.password"
							/>
						</v-col>
						<v-col
							cols="12"
							class="form-group-heading"
						>
							<p class="heading ma-0 pa-0">
								<v-icon class="pb-1"
									size="30"
								>
									face
								</v-icon>
								Profile Information
							</p>
							<v-divider />
						</v-col>
						<v-col
							cols="12"
							xl="6"
							lg="6"
							md="6"
							sm="6"
						>
							<v-text-field
								id="first-name"
								v-model="editedItem.user.first_name"
								filled
								hide-details="auto"
								clearable
								label="First name"
								prepend-inner-icon="title"
								:error-messages="addUserErrorMessages.first_name"
							/>
						</v-col>
						<v-col
							cols="12"
							xl="6"
							lg="6"
							md="6"
							sm="6"
						>
							<v-text-field
								id="last-name"
								v-model="editedItem.user.last_name"
								filled
								hide-details="auto"
								clearable
								label="Last name"
								prepend-inner-icon="title"
								:error-messages="addUserErrorMessages.last_name"
							/>
						</v-col>
						<v-col
							cols="12"
							xl="6"
							lg="6"
							md="6"
							sm="6"
						>
							<v-text-field
								v-model="editedItem.contact"
								label="Contact (*)"
								type="number"
								filled
								hide-details="auto"
								clearable
								required
								prepend-inner-icon="contact_phone"
								:error-messages="addUserErrorMessages.contact"
							/>
						</v-col>
						<v-col cols="12"
							xl="6"
							lg="6"
							md="6"
							sm="6"
						>
							<v-menu
								ref="menu"
								v-model="birthDateMenu"
								:close-on-content-click="false"
								transition="scale-transition"
								offset-y
								min-width="290px"
							>
								<template #activator="{ on, attrs }">
									<v-text-field
										v-model="editedItem.birth_date"
										label="Birth date"
										prepend-inner-icon="event"
										readonly
										filled
										hide-details="auto"
										v-bind="attrs"
										:error-messages="addUserErrorMessages.birth_date"
										v-on="on"
									/>
								</template>
								<v-date-picker
									ref="picker"
									v-model="editedItem.birth_date"
									dark
									:max="new Date().toISOString().substr(0, 10)"
									min="1950-01-01"
								/>
							</v-menu>
						</v-col>
						<v-col
							cols="12"
						>
							<v-text-field
								id="user-bio"
								v-model="editedItem.address"
								filled
								hide-details="auto"
								label="Address (*)"
								clearable
								required
								prepend-inner-icon="room"
								:error-messages="addUserErrorMessages.address"
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
				</v-form>
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
		birthDateMenu: false,
		editedIndex: -1,
		editedItem: {
			user: {
				first_name: "",
				last_name: "",
				email: "",
				username: "",
				is_superuser: null,
				is_staff: null,
				date_joined: null,
			},
			image: "",
			contact: null,
			birth_date: null,
			address: "",
			last_updated: null,
		},
		defaultItem: {},
	}),
	computed: {
		...mapGetters({
			addUserErrorMessages: "user/addUserErrorMessages"
		}),
		formTitle() {
			return this.editedIndex === -1 ? "New User" : "Edit User"
		},
		formIcon() {
			return this.editedIndex === -1 ? "person_add" : "person"
		},
		firstLetter() {
			return this.editedIndex === -1 ? "F" : this.editedItem.user.username[0].toUpperCase()
		}
	},
	watch: {
		birthDateMenu(val) {
			val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"))
		},
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
			this.$store.dispatch("user/clearAddUserErrorMessages")
		},

		openEditDialog(args) {
			this.editedIndex = args.editedIndex
			this.editedItem = args.editedItem
			this.openDialog()
		},

		close() {
			this.$store.dispatch("user/clearAddUserErrorMessages")
			this.$nextTick(() => {
				this.editedItem = {
					user: {
						first_name: "",
						last_name: "",
						email: "",
						username: "",
						is_superuser: null,
						is_staff: null,
						date_joined: null,
					},
					image: "",
					contact: null,
					birth_date: null,
					address: "",
					last_updated: null,
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
			const payload = {
				first_name: this.editedItem.user.first_name,
				last_name: this.editedItem.user.last_name,
				email: this.editedItem.user.email,
				username: this.editedItem.user.username,
				password: this.editedItem.user.password,
				contact: this.editedItem.contact,
				birth_date: this.editedItem.birth_date,
				address: this.editedItem.address,
			}
			if (this.editedIndex > -1) {
				const updated = await this.$store.dispatch(
					"user/update",
					{
						id: this.editedItem.user.id,
						body: payload
					}
				)
				if (updated === true) {
					await this.openSnack("User updated successfully.", "success")
					this.$bus.emit("reload-users")
					this.close()
				} else if (created === 500) {
					await this.openSnack("Internal Server Error.")
				} else {
					await this.openSnack("Please load a valid form.")
				}
			} else {
				const created = await this.$store.dispatch("user/addUser", payload)
				if (created === true) {
					await this.openSnack("User added successfully.", "success")
					this.$bus.emit("reload-users")
					this.close()
				} else if (created === 500) {
					await this.openSnack("Internal Server Error.")
				} else {
					await this.openSnack("Please load a valid form.")
				}
			}
		},

		routeToUserDetailPage(itemId) {
			router.push({name: "User Detail", params: { id: itemId }})
		}
	},
}
</script>
<style lang="sass" scoped>
.form-title
	color: white
	display: block
	@media only screen and (max-width: 255px)
		display: none

.v-card__title
	background-color: #535151 !important

.form-group-heading
	font-weight: 500
	background-color: rgba(86, 86, 86, 0.4)
	border-radius: 10px
	margin: 10px 0 7px 0
</style>
