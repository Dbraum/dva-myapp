import {fetch} from '../utils'

export async function login(params) {
	return fetch('/api/login', {   method: 'post',   body: params })
}

export async function logout(params) {
	return fetch('/api/logout', {
		method: 'post',
		body: params
	})
}

export async function userInfo() {
	return fetch('/api/userInfo', {method: 'get'})
}
