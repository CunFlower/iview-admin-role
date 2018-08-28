import axios from '@/libs/api.request'
import md5 from 'js-md5'
export const login = ({ username, password }) => {
  const data = {
    username,
    password
  }
  return axios.request({
    url: '/user/login',
    data: {
      username: data.username,
      password: md5(data.password)
    },
    method: 'post'
  })
}

export const getUserInfo = (userId) => {
  return axios.request({
    url: '/user/info',
    params: {
      userId
    },
    method: 'get'
  })
}

export const getUserMenu = (userId) => {
  return axios.request({
    url: '/menu/list',
    params: {
      userId
    },
    method: 'get'
  })
}

export const logout = () => {
  return axios.request({
    url: '/user/logout',
    method: 'get'
  })
}
