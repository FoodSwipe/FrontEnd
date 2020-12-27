<template>
	<div>
		<v-row class="ma-0 pa-0">
			<v-breadcrumbs v-if="!isLoading"
				dark
				:items="utilityPageBreadcrumbs"
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
			:search="searchHomePageSwiper"
			:headers="headers"
			:items="homePageContents"
			sort-by="calories"
			class="elevation-1"
		>
			<template #top>
				<v-toolbar
					flat
				>
					<v-app-bar-nav-icon><v-icon>view_carousel</v-icon></v-app-bar-nav-icon>
					<v-fade-transition>
						<v-toolbar-title v-if="$vuetify.breakpoint.width > 600">
							Homepage Swiper
						</v-toolbar-title>
					</v-fade-transition>
					<v-divider
						class="mx-4"
						inset
						vertical
					/>
					<v-text-field
						v-model="searchHomePageSwiper"
						solo
						label="Search homepage swiper"
						clearable
						hide-details
						prepend-inner-icon="search"
					/>
					<v-divider
						class="mx-4"
						inset
						vertical
					/>
					<v-btn
						color="primary"
						dark
						@click="openHomePageSwiperCreateDialog()"
					>
						<v-icon>add_circle</v-icon>
						<v-fade-transition>
							<span v-if="$vuetify.breakpoint.width > 470"
								class="pl-2"
							>New Image</span>
						</v-fade-transition>
					</v-btn>
					<v-dialog
						v-model="dialog"
						dark
						max-width="500px"
					>
						<v-card>
							<v-card-title>
								<span><v-icon>{{ formIcon }}</v-icon></span><span class="headline pl-2">{{ formTitle }}</span>
							</v-card-title>
							<v-divider />

							<v-card-text>
								<v-container>
									<v-row>
										<v-col
											cols="12"
										>
											<v-text-field
												v-model="editedItem.heading"
												label="Heading"
												filled
												clearable
												hide-details="auto"
												prepend-inner-icon="title"
												:error-messages="homePageContentFormError.heading"
											/>
										</v-col>
										<v-col
											cols="12"
										>
											<v-textarea
												v-model="editedItem.subtitle"
												label="Subtitle"
												filled
												clearable
												hide-details="auto"
												prepend-inner-icon="message"
												:error-messages="homePageContentFormError.subtitle"
											/>
										</v-col>
										<v-col
											cols="12"
											md="6"
											xl="6"
											lg="6"
											sm="6"
										>
											<v-text-field
												v-model="editedItem.button_icon"
												label="Button Icon"
												filled
												clearable
												hide-details="auto"
												prepend-inner-icon="insert_emoticon"
												:error-messages="homePageContentFormError.button_icon"
											/>
										</v-col>
										<v-col
											cols="12"
											md="6"
											xl="6"
											lg="6"
											sm="6"
										>
											<v-text-field
												v-model="editedItem.button_text"
												label="Button Text"
												filled
												clearable
												hide-details="auto"
												prepend-inner-icon="text_fields"
												:error-messages="homePageContentFormError.button_text"
											/>
										</v-col>
										<v-col cols="12">
											<v-text-field
												v-model="editedItem.button_to"
												label="Button Route To"
												filled
												clearable
												hide-details="auto"
												prepend-inner-icon="router"
												:error-messages="homePageContentFormError.button_to"
											/>
										</v-col>
										<v-col cols="12">
											<v-file-input
												id="swiper-image-input"
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
												:error-messages="homePageContentFormError.image"
											/>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-spacer />
								<v-btn
									color="error"
									text
									@click="close"
								>
									Cancel
								</v-btn>
								<v-btn
									color="blue darken-1"
									text
									@click="save"
								>
									Save
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-dialog v-model="dialogDelete"
						max-width="500px"
					>
						<v-card dark>
							<v-card-title class="headline one-rem d-flex justify-center">
								Are you sure to delete this swiper image content?
							</v-card-title>
							<v-card-actions>
								<v-spacer />
								<v-btn color="error darken-1"
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
			<template #item.image="{ item }">
				<div class="pa-2">
					<v-img :src="item.image"
						max-width="200" max-height="100"
						class="swiper-image-in-table"
					/>
				</div>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.buttonIcon="{ item }">
				<v-icon>
					{{ item.button_icon }}
				</v-icon>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.buttonTo="{ item }">
				<v-chip dense>
					{{ item.button_to }}
				</v-chip>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.actions="{ item }">
				<v-btn icon color="primary"
					@click="editItem(item)"
				>
					<v-icon size="20">
						edit
					</v-icon>
				</v-btn>
				<v-btn color="error"
					icon
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
import { getFormData } from "@/Helper"

export default {
	name: "UtilityAdministration",
	data: () => ({
		isLoading: false,
		dialog: false,
		dialogDelete: false,
		searchHomePageSwiper: "",
		headers: [
			{ text: "Actions", value: "actions", sortable: false },
			{
				text: "Image",
				align: "center",
				sortable: false,
				value: "image",
			},
			{ text: "Heading", value: "heading" },
			{ text: "Button Text", value: "button_text" },
			{ text: "Button Icon", value: "buttonIcon" },
			{ text: "Button Router", value: "buttonTo" },
		],
		imageForUpload: [],
		editedIndex: -1,
		editedItem: {
			id: "",
			heading: "",
			subtitle: "",
			button_icon: "",
			button_text: "",
			button_to: "",
			image: null,
		},
		defaultItem: {
			heading: "",
			subtitle: "",
			button_icon: "",
			button_text: "",
			button_to: "",
			image: null,
		},
		utilityPageBreadcrumbs: [
			{
				text: "> Home",
				disabled: false,
				href: "/admin/home",
			},
			{
				text: "Utilities",
				disabled: true,
			}
		]
	}),

	computed: {
		...mapGetters({
			homePageContents: "homePageContent/allContent",
			homePageContentFormError: "homePageContent/homePageContentAllFormErrors"
		}),
		formTitle() {
			return this.editedIndex === -1 ? "New Swiper Image" : "Edit Swiper Image"
		},
		formIcon() {
			return this.editedIndex === -1 ? "add_to_photos" : "brush"
		},
	},

	watch: {
		dialog(val) {
			val || this.close()
		},
		dialogDelete(val) {
			val || this.closeDelete()
		},
	},

	created() {
		this.initialize()
	},

	methods: {
		async openHomePageSwiperCreateDialog() {
			this.imageForUpload = []
			await this.$store.dispatch("homePageContent/clearHomePageContentFormErrors")
			this.dialog = true
		},
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async initialize() {
			this.isLoading = true
			const fetched = await this.$store.dispatch("homePageContent/fetchAllHomePageContent")
			if (!fetched) {
				await this.openSnack("Internal server error. Please try again")
			} else { this.isLoading = false}
		},

		editItem(item) {
			this.imageForUpload = []
			this.editedIndex = this.homePageContents.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.$store.dispatch("homePageContent/clearHomePageContentFormErrors")
			this.dialog = true
		},

		deleteItem(item) {
			this.editedIndex = this.homePageContents.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialogDelete = true
		},

		async deleteItemConfirm() {
			const deleted = await this.$store.dispatch("homePageContent/delete", {
				id: this.editedItem.id
			})
			if (deleted === true) {
				await this.openSnack("Homepage swiper image deleted successfully.", "success")
				this.homePageContents.splice(this.editedIndex, 1)
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
				this.editedItem["image"] = this.imageForUpload[0]
			} else {
				delete this.editedItem.image
			}
			const payload = getFormData(this.editedItem)
			if (this.editedIndex > -1) {
				const updated = await this.$store.dispatch(
					"homePageContent/update",
					{
						id: this.editedItem.id,
						body: payload
					}
				)
				if (updated === true) {
					await this.openSnack("Home page swiper image updated successfully.", "success")
					await this.close()
					await this.initialize()
				} else if (updated === 500) {
					await this.openSnack("Internal Server Error.")
				} else {
					await this.openSnack("Please load a valid form.")
				}
			} else {
				const created = await this.$store.dispatch("homePageContent/create", { body: payload })
				if (created === true) {
					await this.openSnack("Home page swiper image added successfully.", "success")
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
.swiper-image-in-table {
	border: 2px solid #d6931f;
	border-radius: 10px;
}
.one-rem {
	font-size: 1.2rem !important;
	line-height: 1.4rem;
}
</style>
