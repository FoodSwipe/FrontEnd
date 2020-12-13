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
.cursor {
	cursor: pointer;
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
</style>
