const Snack = {
	methods: {
		async openSnack(text, color="success") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
	},
}

export default Snack
