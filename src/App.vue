<template>
	<v-app>
		<router-view />
	</v-app>
</template>

<script>
export default {
	name: "App"
}
</script>
<!--global css variables-->
<style lang="scss">
.dark-slate-border-2 {
	border: 2px solid darkslategrey !important;
}
.goldenrod {
	color: goldenrod !important;
}
.golden-rod-border-2 {
	border: 2px solid goldenrod;
}
.golden-rod-border-3 {
	border: 3px solid goldenrod;
}
.golden-rod-border-4 {
	border: 4px solid goldenrod;
}
.cursor {
	cursor: pointer;
}

.order-card-header {
	background-color: #ffc107a8;
	border-radius: 20px !important;
}

// gradient backgrounds

.green-gradient-rgba {
	background: linear-gradient(40deg, rgb(153, 208, 117), rgb(16, 157, 105)) !important
}
.red-gradient {
	background: linear-gradient(45deg, #580404, #e05757)
}
.our-blue-gradient {
	background: linear-gradient(45deg, #032466, #3b63dd)
}
.orange-gradient {
	background: linear-gradient(45deg, #582104, #c66c3c)
}
.light-orange-gradient {
	background: linear-gradient(45deg, #c85c09, #eac290)
}
.light-orange-gradient-x {
	background: linear-gradient(90deg, #ecb063, #c85c09, #ea9d72)
}
.teal-gradient {
	background: linear-gradient(45deg, #505804, #a2ac56)
}
.dark-purple-gradient {
	background: linear-gradient(45deg, #380458, #8b44b7)
}
.green-gradient {
	background: linear-gradient(45deg, #045558, #22aeb3)
}
.brown-gradient {
	background: linear-gradient(45deg, #582804, #bc753f)
}
.deep-blue-gradient {
	background: linear-gradient(45deg, #2c1079, #7c60cd)
}
.tilt {
	transform: rotate(305deg);
}
.number-font {
	font-family: 'Yeon Sung', cursive;
}
.admin-breadcrumb-item {
	font-family: 'Righteous', cursive;
	a {
		color: white !important;
	}
	.v-breadcrumbs__item--disabled {
		color: grey !important;
	}
}
.home-breadcrumb-item {
	font-family: 'Righteous', cursive;
	a {
		color: darkslategrey !important;
	}
	.v-breadcrumbs__item--disabled {
		color: slategray !important;
	}
}
</style>
