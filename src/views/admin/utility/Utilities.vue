<template>
	<v-data-table
		dark
		:search="searchHomePageSwiper"
		:headers="headers"
		:items="desserts"
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
				<v-dialog
					v-model="dialog"
					dark
					max-width="500px"
				>
					<template #activator="{ on, attrs }">
						<v-btn
							color="primary"
							dark
							v-bind="attrs"
							v-on="on"
						>
							<v-icon>add_circle</v-icon>
							<v-fade-transition>
								<span v-if="$vuetify.breakpoint.width > 470"
									class="pl-2"
								>New Image</span>
							</v-fade-transition>
						</v-btn>
					</template>
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
											v-model="editedItem.mainHeading"
											label="Heading"
											filled
											clearable
											hide-details="auto"
											prepend-inner-icon="title"
										/>
									</v-col>
									<v-col
										cols="12"
									>
										<v-text-field
											v-model="editedItem.mainHeading"
											label="Subtitle"
											filled
											clearable
											hide-details="auto"
											prepend-inner-icon="message"
										/>
									</v-col>
									<v-col
										cols="12"
										md="4"
										xl="4"
										lg="4"
										sm="6"
									>
										<v-text-field
											v-model="editedItem.buttonIcon"
											label="Button Icon"
											filled
											clearable
											hide-details="auto"
											prepend-inner-icon="insert_emoticon"
										/>
									</v-col>
									<v-col
										cols="12"
										md="4"
										xl="4"
										lg="4"
										sm="6"
									>
										<v-text-field
											v-model="editedItem.buttonColor"
											label="Button Color"
											filled
											clearable
											hide-details="auto"
											prepend-inner-icon="palette"
										/>
									</v-col>
									<v-col
										cols="12"
										md="4"
										xl="4"
										lg="4"
										sm="6"
									>
										<v-text-field
											v-model="editedItem.buttonText"
											label="Button Text"
											filled
											clearable
											hide-details="auto"
											prepend-inner-icon="text_fields"
										/>
									</v-col>
									<v-col
										cols="12"
										md="4"
										xl="4"
										lg="4"
										sm="6"
									>
										<v-text-field
											v-model="editedItem.buttonTo"
											label="Button Route To"
											filled
											clearable
											hide-details="auto"
											prepend-inner-icon="router"
										/>
									</v-col>
									<v-col cols="12">
										<v-file-input
											id="member-image-input"
											v-model="editedItem.imageForUpload"
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
					<v-card>
						<v-card-title class="headline">
							Are you sure you want to delete this item?
						</v-card-title>
						<v-card-actions>
							<v-spacer />
							<v-btn color="blue darken-1"
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
		<template #item.src="{ item }">
			<div class="pa-2">
				<v-img :src="item.src"
					max-width="200" max-height="100"
					class="swiper-image-in-table"
				/>
			</div>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.buttonColor="{ item }">
			<v-card
				dark
				width="50"
				height="50" :color="item.buttonColor"
			>
				<div class="fill-height d-flex align-center justify-center">
					<b>Color</b>
				</div>
			</v-card>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.buttonIcon="{ item }">
			<v-icon>
				{{ item.buttonIcon }}
			</v-icon>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.buttonTo="{ item }">
			<v-chip dense>
				{{ item.buttonTo }}
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
</template>
<script>
export default {
	name: "UtilityAdministration",
	data: () => ({
		dialog: false,
		dialogDelete: false,
		searchHomePageSwiper: "",
		headers: [
			{ text: "Actions", value: "actions", sortable: false },
			{
				text: "Image",
				align: "center",
				sortable: false,
				value: "src",
			},
			{ text: "Heading", value: "mainHeading" },
			{ text: "Button Text", value: "buttonText" },
			{ text: "Button Color", value: "buttonColor" },
			{ text: "Button Icon", value: "buttonIcon" },
			{ text: "Button Router", value: "buttonTo" },
		],
		desserts: [],
		editedIndex: -1,
		editedItem: {
			src: "",
			mainHeading: "",
			subtitle: "",
			buttonIcon: "",
			buttonColor: "",
			buttonText: "",
			buttonTo: "",
			imageForUpload: [],
		},
		defaultItem: {
			src: "",
			mainHeading: "",
			subtitle: "",
			buttonIcon: "",
			buttonColor: "",
			buttonText: "",
			buttonTo: "",
			imageForUpload: [],
		},
	}),

	computed: {
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
		initialize() {
			this.desserts = [
				{
					src: "https://i.ytimg.com/vi/fovrUHwf0e8/maxresdefault.jpg",
					mainHeading: "Hello Welcome Tasty Momo",
					subtitle: "Vivamus suscipit tortor eget felis porttitor volutpat." +
						" Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
					buttonIcon: "hdr_weak",
					buttonText: "Get Momo'ed",
					buttonColor: "peach-gradient-rgba",
					buttonTo: "/store/MoMo",
				},
				{
					src: "https://i.pinimg.com/originals/6d/79/e6/6d79e62312ae92757667ca1dae5289d9.jpg",
					mainHeading: "Get Hot & Spicy Foods at your location",
					subtitle: "Donec molestie malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
					buttonIcon: "local_grocery_store",
					buttonText: "Order Now",
					buttonColor: "aqua-gradient-rgba",
					buttonTo: "/store",
				},
				{
					src: "https://s1.1zoom.me/b5050/401/Drinks_Bar_Bottle_468131_1920x1080.jpg",
					mainHeading: "Enjoy our bar service online",
					subtitle: "Cras ultricies ligula sed magna dictum porta. Donec sollicitudin molestie malesuada.",
					buttonIcon: "store",
					buttonText: "Visit Store",
					buttonColor: "blue-gradient",
					buttonTo: "/store",
				},
				{
					src: "https://wallpaperaccess.com/full/235960.jpg",
					mainHeading: "Get booz'ed and oozed with our beverages",
					subtitle: "Vivamus suscipit tortor eget felis porttitor volutpat. Donec rutrum congue leo eget malesuada.",
					buttonIcon: "local_bar",
					buttonText: "Get booz'ed",
					buttonColor: "green-gradient-rgba",
					buttonTo: "/store/Bar",
				},
			]
		},

		editItem(item) {
			this.editedIndex = this.desserts.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		deleteItem(item) {
			this.editedIndex = this.desserts.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialogDelete = true
		},

		deleteItemConfirm() {
			this.desserts.splice(this.editedIndex, 1)
			this.closeDelete()
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

		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.desserts[this.editedIndex], this.editedItem)
			} else {
				this.desserts.push(this.editedItem)
			}
			this.close()
		},
	},
}
</script>
<style lang="scss" scoped>
.swiper-image-in-table {
	border: 2px solid #d6931f;
	border-radius: 10px;
}
</style>
