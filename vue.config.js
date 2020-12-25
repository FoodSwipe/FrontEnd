module.exports = {
	transpileDependencies: [
		"vuetify"
	],
	publicPath: process.env.NODE_ENV === "production"
		? ""
		: process.env.NODE_ENV === "github"
			? "/FrontEnd/"
			: ""
}
