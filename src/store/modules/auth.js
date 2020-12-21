import $api from "@/handler/axios"
import urls from "@/urls.json"

const authUrls = urls.auth

export const SET_LOGIN_ERROR_MESSAGES = "SET_LOGIN_ERROR_MESSAGES"

const state = {
	loginError: {
		username: null,
		password: null
	}
}

const mutations = {
	[SET_LOGIN_ERROR_MESSAGES](state, value) {
		state.loginError = value
	},
}

const getters = {
	loginFieldErrorMessages: state => {
		return state.loginError
	}
}

const actions = {
	async login({commit}, payload) {
		try {
			const res = await $api.post(authUrls.login, payload)
			localStorage.setItem("token", res.token)
			localStorage.setItem("currentUser", JSON.stringify(res.user))
			if (res["cooking_order"] !== undefined) {
				localStorage.setItem("cookingOrder", res["cooking_order"].id)
				return res["cooking_order"].total_items
			} else {
				localStorage.removeItem("cookingOrder")
				return true
			}
		} catch (e) {
			if (e.response.status === 400) {
				commit("SET_LOGIN_ERROR_MESSAGES", e.response.data)
				return "formError"
			} else if (e.response.status !== 500) {
				return {message: e.response.data.detail}
			} else {
				return "serverError"
			}
		}
	},
	async logout({}, payload) {
		try {
			await $api.post(authUrls.logout, payload)
			localStorage.removeItem("token")
			localStorage.removeItem("currentUser")
			localStorage.removeItem("cookingOrder")
			return true
		} catch(err) {
			return err.response.data
		}
	},
	changePassword(payload) {
		$api.post(authUrls.logout, payload).then(res => {
			console.log(res)
		})
	},
	requestResetPassword(payload) {
		$api.post(authUrls.requestResetPassword, payload).then(res => {
			console.log(res)
		})
	},
	resetPassword(payload) {
		$api.post(authUrls.resetPassword, payload).then(res => {
			console.log(res)
		})
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
