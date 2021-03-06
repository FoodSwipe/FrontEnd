<template>
	<v-data-table
		dark
		:headers="headers"
		:items="desserts"
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
							>New Menu Item Group</span>
						</v-btn>
					</template>
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
								@click="save"
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
						<v-card-title class="headline">
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
				@save="updateName"
				@cancel="cancelNameUpdate"
			>
				<span style="font-size: 1.1rem; line-height: 1.3rem;">{{ props.item.name }}</span>
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
		<template #item.items="{ item }">
			<v-row class="ma-0 pa-0">
				<v-avatar
					v-for="(menuItem, index) of item.items"
					:key="index + 565864"
					size="40"
					class="my-1"
					:class="
						item.items.length === index +1 ? '' : 'mr-2'
					"
				>
					<v-img :src="menuItem.image" />
				</v-avatar>
			</v-row>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.is_veg="{ item }">
			<v-checkbox v-model="item.is_veg"
				color="green"
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.is_available="{ item }">
			<v-checkbox v-model="item.is_available"
				color="orange"
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.type="{ item }">
			<v-row class="ma-0 pa-0 fill-height"
				align="center"
			>
				<v-avatar v-for="(i, index) of item.type"
					:key="index"
					size="20"
					:class="
						item.type.length === index +1 ? '' : 'mr-2'
					"
				>
					<v-img :src="i.image" />
				</v-avatar>
			</v-row>
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
</template>
<script>
import helper from "@/Helper"

export default {
	name: "MenuItemGroupAdministration",
	data: () => ({
		dialog: false,
		dialogDelete: false,
		searchMenuItemGroup: "",
		itemTypeArray: [
			"Spicy",
			"Milky",
			"Cheesy",
		],
		headers: [
			{ text: "Actions", value: "actions", align: "start", sortable: false},
			{ text: "Menu Item Group", value: "name", },
			{ text: "Items", value: "items" },
		],
		desserts: [],
		editedIndex: -1,
		editedItem: {
			name: "",
			items: [],
			description: null,
			image: null,
			imageForUpload: [],
		},
		defaultItem: {
			name: "",
			items: [],
			description: null,
			image: null,
			imageForUpload: [],
		},
	}),

	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "New Menu Item Group" : "Edit Menu Item Group"
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
		updateName() {
			this.$store.dispatch("snack/setSnackState", true)
			this.$store.dispatch("snack/setSnackColor", "success")
			this.$store.dispatch("snack/setSnackText", "Menu item group name updated successfully.")
		},
		cancelNameUpdate() {
			this.$store.dispatch("snack/setSnackState", true)
			this.$store.dispatch("snack/setSnackColor", "error")
			this.$store.dispatch("snack/setSnackText", "Menu item group name update aborted.")
		},
		initialize() {
			this.desserts = [
				{
					name: "Burger & Chips",
					description: "Sed porttitor lectus nibh. Proin eget tortor risus." +
						" Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus" +
						" nibh. Nulla porttitor accumsan tincidunt.",
					image: "https://cdn-b.william-reed.com/var/wrbm_gb_hospitality/storage/images/publications/hospitality/bighospitality.co.uk/article/2017/12/18/meatcure-burger-group-goes-into-liquidation/2704079-1-eng-GB/Meatcure-burger-group-goes-into-liquidation_wrbm_large.jpg",
					items: [
						{
							name: "Mushroom Burger",
							description: "Sed porttitor lectus nibh. Proin eget tortor risus." +
								" Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus",
							image: "https://littlespicejar.com/wp-content/uploads/2018/06/Rockin-Sweet-Onion-Swiss-Mushroom-Burger-1-720x720.jpg",
							ingredients: ["Chopped Mushrooms", "Eggs", "Breadcrumbs", "Shredded Cheese", "Onion", "Flour", "Salt", "Pepper", "Lettuce Leaves"],
							weight: 200,
							calorie: 330,
							price: 450.00,
							is_veg: true,
							is_available: true,
							type: [
								{
									name: "Spicy",
									image: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
								},
								{
									name: "Vegetarian",
									image: "https://e7.pngegg.com/pngimages/741/294/png-clipart-veggie-burger-animal-product-veganism-vegetarianism-computer-icons-veg-symbol-leaf-logo-thumbnail.png"
								}
							]
						},
						{
							name: "Ham Burger",
							description: "A hamburger (also burger for short) is a sandwich consisting of one or more cooked patties of ground meat," +
								" usually beef, placed inside a sliced bread roll or bun. The patty may be pan fried, grilled, smoked or flame broiled. ",
							image: "https://barbecuebible.com/wp-content/uploads/2013/05/featured-great-american-hamburger-1024x640.jpg",
							ingredients: ["Ground Beef", "Mayonnaise", "Breadcrumbs", "Shredded Cheese", "Onion", "Flour", "Salt", "Chillies", "Lettuce Leaves", "Tomato"],
							weight: 200,
							calorie: 330,
							price: 450.00,
							is_veg: false,
							is_available: true,
							type: [
								{
									name: "Spicy",
									image: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
								},
								{
									name: "Non Veg",
									image: "https://lh3.googleusercontent.com/proxy/DN9dGmSCLyEXkwEwUg5f3upEhF4zrZFX_pwo7ISxUgWiHzSEMXzxolvfRutyKQK5GVv-7qlRDNy7JgbgLdQ-zVLQh9utf9WHeRpQJPmplb2itzr1eoQa0aM30V5nNHCjOAyJg7RyaUWV8Q"
								}
							]
						},
					]
				},
				{
					name: "MoMo",
					description: "Momo is a type of East and South Asian steamed filled dumpling." +
						" Momos are native to Southwest Chinese region of Tibet as well as Bhutan," +
						" Nepal, North Indian region of Ladakh, Northeast Indian regions of Sikkim," +
						" Assam, and Arunachal Pradesh, and East Indian region of Darjeeling.",
					image: "https://siddharthabiz.com/wp-content/uploads/2020/06/chicken-steam-momo.jpg",
					items: [
						{
							name: "Veg Momo",
							description: "Sed porttitor lectus nibh. Proin eget tortor risus." +
								" Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus",
							image: "https://c.ndtvimg.com/2020-01/2brioi88_momos_625x300_21_January_20.jpg",
							ingredients: [
								"Maida",
								"salt",
								"baking powder",
								"grated carrot",
								"grated cabbage",
								"onion",
								"garlic",
								"vinegar",
								"black pepper",
								"soya sauce"

							],
							weight: 200,
							calorie: 357.1,
							price: 450.00,
							is_veg: true,
							is_available: true,
							type: [
								{
									name: "Spicy",
									image: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
								},
								{
									name: "Vegetarian",
									image: "https://e7.pngegg.com/pngimages/741/294/png-clipart-veggie-burger-animal-product-veganism-vegetarianism-computer-icons-veg-symbol-leaf-logo-thumbnail.png"
								}
							]
						},
						{
							name: "Chicken Momo",
							description: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat," +
								" accumsan id imperdiet et, porttitor at sem. Curabitur aliquet quam id dui posuere blandit.",
							image: "https://img.taste.com.au/mdKxKxoR/taste/2016/11/chicken-momos-with-tomato-achar-46671-1.jpeg",
							ingredients: [
								"ground chicken breast and thigh",
								"white onion",
								"scallions",
								"grated ginger",
								"grated garlic",
								"white pepper",
								"cumin powder",
								"salt",
								"chopped cilandtro",
								"green chilli sauce",
								"ripe tomatoes",
							],
							weight: 200,
							calorie: 450,
							price: 450.00,
							is_veg: false,
							is_available: true,
							type: [
								{
									name: "Spicy",
									image: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
								},
								{
									name: "Non Veg",
									image: "https://lh3.googleusercontent.com/proxy/DN9dGmSCLyEXkwEwUg5f3upEhF4zrZFX_pwo7ISxUgWiHzSEMXzxolvfRutyKQK5GVv-7qlRDNy7JgbgLdQ-zVLQh9utf9WHeRpQJPmplb2itzr1eoQa0aM30V5nNHCjOAyJg7RyaUWV8Q"
								}
							]
						},
						{
							name: "Fried Chicken Momo",
							description: "Fried version of chicken momo.",
							image: "https://i.pinimg.com/originals/b4/12/81/b4128152cbdae56c4eb9055748f3b1dd.png",
							ingredients: [
								"ground chicken breast and thigh",
								"white onion",
								"scallions",
								"grated ginger",
								"grated garlic",
								"white pepper",
								"cumin powder",
								"salt",
								"chopped cilandtro",
								"green chilli sauce",
								"ripe tomatoes",
							],
							weight: 200,
							calorie: 450,
							price: 450.00,
							is_veg: false,
							is_available: true,
							type: [
								{
									name: "Spicy",
									image: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
								},
								{
									name: "Non Veg",
									image: "https://lh3.googleusercontent.com/proxy/DN9dGmSCLyEXkwEwUg5f3upEhF4zrZFX_pwo7ISxUgWiHzSEMXzxolvfRutyKQK5GVv-7qlRDNy7JgbgLdQ-zVLQh9utf9WHeRpQJPmplb2itzr1eoQa0aM30V5nNHCjOAyJg7RyaUWV8Q"
								}
							]
						},
					]
				},
				{
					name: "Chowmein",
					description: "Chow mein are Chinese stir-fried noodles with vegetables and sometimes meat or tofu." +
						" The dish is popular throughout the Chinese diaspora and appears on the menus" +
						" of most Chinese restaurants abroad.",
					image: "https://static.toiimg.com/thumb/75455420.cms?imgsize=2101247&width=800&height=800",
					items: [
						{
							name: "Veg Chowmein",
							description: "Sed porttitor lectus nibh. Proin eget tortor risus." +
								" Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus" +
								" nibh. Nulla porttitor accumsan tincidunt.",
							image: "https://i.pinimg.com/originals/9f/45/3d/9f453d36b8d2526a1f1bbe74145aedb9.jpg",
							weight: 300,
							calorie: 250,
							ingredients: [],
							price: 150,
							isVeg: true,
							isAvailable: true,
							type: [
								{
									name: "Spicy",
									image: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
								},
								{
									name: "Vegetarian",
									image: "https://e7.pngegg.com/pngimages/741/294/png-clipart-veggie-burger-animal-product-veganism-vegetarianism-computer-icons-veg-symbol-leaf-logo-thumbnail.png"
								}
							]
						},
						{
							name: "Chicken Chowmein",
							description: "Sed porttitor lectus nibh. Proin eget tortor risus." +
								" Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus" +
								" nibh. Nulla porttitor accumsan tincidunt.",
							image: "https://charlotteslivelykitchen.com/wp-content/uploads/2015/01/Chicken-Chow-Mein-Square-Image.jpg",
							weight: 300,
							calorie: 350,
							ingredients: [],
							price: 150,
							isVeg: false,
							isAvailable: true,
							type: [
								{
									name: "Spicy",
									image: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
								},
								{
									name: "Non Veg",
									image: "https://lh3.googleusercontent.com/proxy/DN9dGmSCLyEXkwEwUg5f3upEhF4zrZFX_pwo7ISxUgWiHzSEMXzxolvfRutyKQK5GVv-7qlRDNy7JgbgLdQ-zVLQh9utf9WHeRpQJPmplb2itzr1eoQa0aM30V5nNHCjOAyJg7RyaUWV8Q"
								}
							]
						},
						{
							name: "Buff Chowmein",
							description: "Sed porttitor lectus nibh. Proin eget tortor risus." +
								" Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus" +
								" nibh. Nulla porttitor accumsan tincidunt.",
							image: "https://goodfoodnepal.com/wp-content/uploads/2019/04/Buff-Chowmein.jpg",
							weight: 300,
							calorie: 500,
							ingredients: [
								"Dried or egg noodles",
								"chopped onions",
								"buffalo meat or sukuti",
								"chopped capsicum",
								"green chilli",
								"soy sause",
								"salt",
								"pinch of ajinomoto",
								"chopped coriander"
							],
							price: 150,
							isVeg: false,
							isAvailable: true,
							type: [
								{
									name: "Spicy",
									image: "https://png.pngtree.com/png-vector/20190903/ourmid/pngtree-vector-red-chili-pepper-png-image_1716344.jpg"
								},
								{
									name: "Non Veg",
									image: "https://lh3.googleusercontent.com/proxy/DN9dGmSCLyEXkwEwUg5f3upEhF4zrZFX_pwo7ISxUgWiHzSEMXzxolvfRutyKQK5GVv-7qlRDNy7JgbgLdQ-zVLQh9utf9WHeRpQJPmplb2itzr1eoQa0aM30V5nNHCjOAyJg7RyaUWV8Q"
								}
							]
						}
					]
				},
				{
					name: "Drinks & Beverages",
					description: "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Praesent sapien massa," +
						" convallis a pellentesque nec, egestas non nisi. Curabitur non nulla sit amet" +
						" nisl tempus convallis quis ac lectus.",
					image: "https://shop.pall.com/INTERSHOP/static/WFS/PALL-PALLUS-Site/-/PALL-PALLUS-pall-smb-responsive/en_US/subcategory-images/Beer-Corporate.jpg",
					items: [
						{
							name: "Ruslan Vodka",
							description: "We are Ruslan. We bring decades of uncompromised quality, incredible taste and countless fun memories.",
							image: "https://i.pinimg.com/originals/c3/49/25/c349256a498e3a73af914f2d4adf467b.jpg",
							weight: 1,
							calorie: 500,
							ingredients: [],
							price: 1500,
							isVeg: false,
							isAvailable: true,
							type: [
								{
									name: "Hard Drinks",
									image: "https://upload.wikimedia.org/wikipedia/commons/9/92/Licor-Beir%C3%A3o-%26-Orus_-_Orus_Clothing_%28cropped%29.png"
								},
								{
									name: "Drinks",
									image: "https://i.pinimg.com/originals/99/38/69/99386945bb7208f7a14faf4ddf5083be.png"
								}
							]
						},
						{
							name: "Old Durbar",
							description: "We are Ruslan. We bring decades of uncompromised quality, incredible taste and countless fun memories.",
							image: "https://2.bp.blogspot.com/-H94lYgSr1XQ/XFzvxImlHEI/AAAAAAAANak/M4S7t2KkN0QWXHtSx0aM9zmmRprK8ot3ACLcBGAs/s1600/Cover.PNG",
							weight: 1,
							calorie: 500,
							ingredients: [],
							price: 1500,
							isVeg: false,
							isAvailable: true,
							type: [
								{
									name: "Hard Drinks",
									image: "https://upload.wikimedia.org/wikipedia/commons/9/92/Licor-Beir%C3%A3o-%26-Orus_-_Orus_Clothing_%28cropped%29.png"
								},
								{
									name: "Drinks",
									image: "https://i.pinimg.com/originals/99/38/69/99386945bb7208f7a14faf4ddf5083be.png"
								}
							]
						}
					]
				}
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
::v-deep.v-autocomplete:not(.v-input--is-focused).v-select--chips input {
	max-height: 25px;
}
</style>
