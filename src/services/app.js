import {fetch} from '../utils'

export async function login(params) {
  // return fetch('/api/login', {   method: 'post',   body: params })
  const {username, password} = params;
  const response = {};
  if (username === 'guest' && password === 'guest') {

    const now = new Date()
    now.setDate(now.getDate() + 1)
    localStorage.setItem('user_session', now.getTime())
    localStorage.setItem('user_name', username)
    response.message = '登录成功'
    response.success = true
    localStorage
  } else {
    response.message = "账号或者密码不正确"
  }
  return response
}

export async function logout(params) {
  return fetch('/api/logout', {
    method: 'post',
    body: params
  })
}

export async function userInfo() {
  // return fetch('/api/userInfo', {   method: 'get' })
  return {
    success: localStorage.getItem('user_session') && localStorage.getItem('user_session') > new Date().getTime(),
    username: localStorage.getItem('user_name') || '',
    message: ''
  }
}
