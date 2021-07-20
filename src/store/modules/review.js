import $api from "@/handler/axios"

export const SET_REVIEWS_OF_ITEM = "SET_REVIEWS_OF_ITEM"
export const SET_ADD_REVIEW_ERROR_MESSAGES = "SET_ADD_REVIEW_ERROR_MESSAGES"

import urls from "@/urls.json"

const reviewUrls = urls.review

const defaultFormErrors = {
	review: null,
	menu_item: null,
	reviewer_contact: null,
	image: null
}

const state = {
	itemReviews: {},
	addReviewFormErrors: {
		...defaultFormErrors
	}
}

const mutations = {
	[SET_REVIEWS_OF_ITEM](state, value) {
		state.itemReviews = value
	},
	[SET_ADD_REVIEW_ERROR_MESSAGES](state, value) {
		state.addReviewFormErrors = value
	}
}

const getters = {
	allReviewsOfItem: state => {
		return state.itemReviews
	},
	addReviewFormErrors: state => {
		return state.addReviewFormErrors
	}
}

const actions = {
	clearAddReviewFormErrorMessages({commit}) {
		commit("SET_ADD_REVIEW_ERROR_MESSAGES", {
			...defaultFormErrors
		})
	},
	async addReviewForMenuItem({commit}, payload) {
		try {
			await $api.post(reviewUrls.list, payload)
			return true
		} catch(e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_ADD_REVIEW_ERROR_MESSAGES", e.response.data)
				return false
			}
			return 500
		}
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
