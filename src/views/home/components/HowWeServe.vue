<template>
	<v-card class="mx-auto"
		flat max-width="1200"
	>
		<v-row class="ma-0 pa-0"
			justify="center"
			align-content="center"
		>
			<v-col cols="12"
				class="text-center"
			>
				<p class="mb-0 display-1 font-weight-light">
					How we deliver?
				</p>
				<p class="mb-0 subtitle">
					Ordering food online has never been this easy
				</p>
			</v-col>
			<v-col cols="12"
				xl="4"
				lg="4"
				md="4"
				sm="4"
				class="text-center"
			>
				<v-card class="mx-auto"
					color="#fddadb"
				>
					<v-img
						width="100%"
						height="140"
						src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/6a6fd549558457.58b8217c4d619.gif"
					/>
					<v-card-title>Just click, add and get your order</v-card-title>
				</v-card>
			</v-col>
			<v-col cols="12"
				xl="4"
				lg="4"
				md="4"
				sm="4"
				class="text-center"
			>
				<v-card class="mx-auto"
					color="#b9d7d9"
				>
					<v-img
						contain
						src="https://i.gifer.com/EnnH.gif"
						height="140"
					/>
					<v-card-title>
						Pay your order at your doorstep
					</v-card-title>
				</v-card>
			</v-col>
			<v-col cols="12"
				xl="4"
				lg="4"
				md="4"
				sm="4"
				class="text-center"
			>
				<v-card class="mx-auto"
					color="rgb(122 205 223)"
				>
					<v-img
						contain
						src="https://goingdigitalx.files.wordpress.com/2020/08/mp.gif"
						height="140"
					/>
					<v-card-title>Secure online payment system</v-card-title>
				</v-card>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
export default {
	name: "HowWeServeView"
}
</script>
<style lang="scss" scoped>
::v-deep.v-card__title {
	font-weight: 400;
	font-size: 1.1rem;
	line-height: 1.1rem;
}
</style>
