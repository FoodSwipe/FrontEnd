export const ADD_SWIPER_IMAGE_WITH_CONTENT = "ADD_SWIPER_IMAGE_WITH_CONTENT"
export const REMOVE_SWIPER_IMAGE = "REMOVE_SWIPER_IMAGE"

const state = {
	swiperImages: []
}
const mutations = {
	[ADD_SWIPER_IMAGE_WITH_CONTENT](state, value) {
		state.swiperImages.push = value
	},
	[REMOVE_SWIPER_IMAGE](state, value) {
		state.splice(value, 1)
	}
}

const getters = {
	swiperImagesWithContent: state => {
		return state.swiperImages
	}
}

const actions = {
	addSwiperImageWithContent({commit}, data) {

	},
	removeSwiperImage({state, commit}, value) {

	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
