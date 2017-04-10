import {login, userInfo, logout} from '../services/app'

export default {
	namespace: 'app',
	state: {
		login: false,
		loading: false,
		user: {
			name: '吴彦祖'
		},
		loginButtonLoading: false,
		siderFold: false,
		darkTheme: true,
		isNavbar: false
	},
	subscriptions: {
		setup({dispatch, history}) {
			// dispatch({
			//   type: 'queryUser'
			// })
		}

	},
	effects: {
		* login({payload}, {call, put}) {
			yield put({
				type: 'showLoginButtonLoading'
			})
			const data = yield call(login, payload)
			console.info(data)
			if (data.logined) {
				yield put({
					type: 'loginSuccess',
					payload: {
						user: {
							name: data.username
						}
					}
				})
			} else {
				yield put({
					type: 'loginFail'
				})
			}
		},
		* queryUser({payload}, {call, put}) {
			yield put({
				type: 'showLoading'
			})
			const data = yield call(userInfo)
			if (data.success) {
				yield put({
					type: 'loginSuccess',
					payload: {
						user: {
							name: data.username
						}
					}
				})
			} else {
				yield put({
					type: 'hideLoading'
				})
			}
		},
		* logout({payload}, {call, put}) {
			const data = yield call(logout, payload)
			if (data.success) {
				yield put({
					type: 'logoutSuccess'
				})
			}
		},
		* switchSider({payload}, {put}) {
			yield put({
				type: 'handleSwitchSider'
			})
		},
		* changeTheme({payload}, {put}) {
			yield put({
				type: 'handleChangeTheme'
			})
		},
		* changeNavbar({payload}, {put}) {
			if (document.body.clientWidth < 769) {
				yield put({
					type: 'showNavbar'
				})
			} else {
				yield put({
					type: 'hideNavbar'
				})
			}
		}
	},
	reducers: {
		loginSuccess(state, action) {
			return {
				...state,
				...action.payload,
				login: true,
				loginButtonLoading: false
			}
		},
		logoutSuccess(state) {
			return {
				...state,
				login: false
			}
		},
		loginFail(state) {
			return {
				...state,
				login: false,
				loginButtonLoading: false
			}
		},
		showLoginButtonLoading(state) {
			return {
				...state,
				loginButtonLoading: true
			}
		},
		showLoading(state) {
			return {
				...state,
				loading: true
			}
		},
		hideLoading(state) {
			return {
				...state,
				loading: false
			}
		},
		handleSwitchSider(state) {
			//localStorage.setItem('antdAdminSiderFold', !state.darkTheme)
			return {
				...state,
				siderFold: !state.siderFold
			}
		},
		handleChangeTheme(state) {
			//localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
			return {
				...state,
				darkTheme: !state.darkTheme
			}
		},
		showNavbar(state) {
			return {
				...state,
				isNavbar: true
			}
		},
		hideNavbar(state) {
			return {
				...state,
				isNavbar: false
			}
		}
	}
}
