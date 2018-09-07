import axios from '@/libs/api.request'
import md5 from 'js-md5'
export const login = ({ username, password }) => {
  const data = {
    username,
    password
  }
  return axios.request({
    url: '/api/user/login',
    data: {
      username: data.username,
      password: md5(data.password)
    },
    method: 'post'
  })
}

export const getUserInfo = (userId) => {
  return axios.request({
    url: '/api/user/info',
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
    url: '/api/user/logout',
    method: 'get'
  })
}

export const menuForms = () => {
  return axios.request({
    url: '/menu/forms',
    method: 'get'
  })
}

export const userList = (params) => {
  return axios.request({
    url: '/api/user/list',
    data: JSON.stringify(params),
    method: 'post'
  })
}
