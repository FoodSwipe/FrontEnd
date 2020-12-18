import $api from "@/handler/axios"
import urls from "@/urls.json"

const authUrls = urls.auth

export const SET_CURRENT_USER = "SET_CURRENT_USER"
export const SET_LOGIN_ERROR_MESSAGES = "SET_LOGIN_ERROR_MESSAGES"

const state = {
	user: null,
	loginError: {
		username: null,
		password: null
	}
}

const mutations = {
	[SET_CURRENT_USER](state, value){
		state.user = value
	},
	[SET_LOGIN_ERROR_MESSAGES](state, value) {
		state.loginError = value
	}
}

const getters = {
	currentUser: state => {
		return state.user
	},
	loginFieldErrorMessages: state => {
		return state.loginError
	}
}

const actions = {
	async login({commit}, payload) {
		try {
			const res = await $api.post(authUrls.login, payload)
			commit("SET_CURRENT_USER", res.data)
			localStorage.setItem("token", res.token)
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
	logout({commit}, payload) {
		$api.post(authUrls.logout, payload)
			.then(res => {
				localStorage.removeItem("token")
				commit("SET_CURRENT_USER", null)
			})
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
