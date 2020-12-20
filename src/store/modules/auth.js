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
			localStorage.setItem("currentUser", JSON.stringify(res.data))
			return true
		} catch (e) {
			if (e.response.status === 400) {
				commit("SET_LOGIN_ERROR_MESSAGES", e.response.data)
				return 400
			} else if (e.response.status !== 500) {
				return {message: e.response.data.detail}
			} else {
				return 500
			}
		}
	},
	async logout({}, payload) {
		try {
			await $api.post(authUrls.logout, payload)
			localStorage.removeItem("token")
			localStorage.removeItem("currentUser")
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
