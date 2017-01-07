import {fetch} from '../utils'

export async function myCity(params) {
  return fetch('http://www.zuimeitianqi.com/zuimei/myCity', {
    method: 'get',
    cross: true,
    data: params
  })
}

export async function queryWeather(params) {
  return fetch('http://www.zuimeitianqi.com/zuimei/queryWeather', {
    method: 'get',
    cross: true,
    data: params
  })
}

export async function query(params) {
  return fetch('/api/dashboard', {
    method: 'get',
    data: params
  })
}
