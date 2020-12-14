<template>
	<v-card flat
		max-width="1200" class="mx-auto rounded-0 mt-2"
	>
		<v-expansion-panels v-model="panel"
			multiple
			popout
		>
			<v-expansion-panel
				v-for="(group, index) in storeItemGroups"
				:key="index"
				dense
				class="px-0"
			>
				<v-expansion-panel-header class="panel-header"
					ripple
				>
					<template #default>
						<v-avatar size="52"
							max-width="52"
							class="elevation-4 golden-rod-border-3"
						>
							<v-img :src="group.image" />
						</v-avatar>
						<span class="pl-2">{{ group.name }}</span>
					</template>
				</v-expansion-panel-header>
				<v-expansion-panel-content
					class="px-0"
				>
					<v-row
						class="ma-0 pa-0"
						align="center"
						no-gutters
					>
						<v-col v-for="(item, i) in group.items"
							:key="i"
							cols="6"
							xl="2"
							lg="2"
							md="2"
							sm="3"
							class="pa-2"
						>
							<store-item-card
								:item="item"
							/>
						</v-col>
					</v-row>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</v-card>
</template>
<script>
export default {
	name: "StoreItemGroupView",
	components: {
		StoreItemCard: () => import("./StoreItemCard")
	},
	data: () => ({
		panel: [0,1,2,3],
		storeItemGroups: [
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
	})
}
</script>
<style lang="scss" scoped>
.panel-header{
	transition: all .3s;
	background-color: aliceblue;
	font-size: 1.4rem;
	line-height: 1.4rem;
	@media only screen and (max-width: 1200px) {
		font-size: 1.2rem;
		line-height: 1.2rem;
	}
	@media only screen and (max-width: 300px) {
		font-size: 1rem;
		line-height: 1rem;
	}
	:hover > & {
		background-color: #fffaf0;
	}
}
::v-deep.v-expansion-panel-content > div {
	padding: 0 6px 4px;
}
</style>
