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
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,200;0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500;1,600&display=swap');

.v-label {
	font-size: 14px !important;
}

.v-input {
	font-size: 14px !important;
}

.section-header {
	font-family: 'Raleway', sans-serif;
	font-size: 24px !important;
	line-height: 24px !important;
}
.section-sub-header {
	font-family: 'Otomanopee One', sans-serif;
	font-size: 32px !important;
	line-height: 32px !important;
}

.point875{
	font-size: .875rem !important;
	line-height: 1rem;
}

.one-rem {
	font-size: 1rem !important;
	line-height: 1.2rem;
}
.one-point-two-rem {
	font-size: 1.2rem !important;
}
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
<style lang="sass">
@font-face
	font-family: "MainframeBB"
	src: url("../src/assets/MAINBRG_.TTF")
.organization-title
	transition: font-size .3s ease
	text-transform: uppercase
	font-family: MainframeBB, serif
	font-size: 20px
	line-height: 22px
	letter-spacing: 0
	@media only screen and (max-width: 320px)
		font-size: 1.2rem
		line-height: 1.5rem
</style>
