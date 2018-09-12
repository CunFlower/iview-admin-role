import { login, logout, getUserInfo, getUserMenu, menuForms, userList, roleParterList, userUpdateBase, userUpdateTeall, userCreate, roleMenuTreeIds, userDelete } from '@/api/user'
import { setToken, getToken, menuTree } from '@/libs/util'

export default {
  state: {
    username: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    USERINFO: localStorage.userInfo !== undefined ? JSON.parse(localStorage.userInfo) : ''
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.username = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setUserInfo (state, data) {
      state['USERINFO'] = data
      localStorage.userInfo = JSON.stringify(state['USERINFO'])
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {username, password}) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        }).then(res => {
          if (res !== false) {
            const data = res.data
            let access = []
            access.push(data.userName)
            data.access = access
            commit('setToken', data.userId + '#' + data.token)
            commit('setUserId', data.userId)
            commit('setAccess', access)
            commit('setUserInfo', data)
            resolve()
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (!localStorage.userInfo) {
          getUserInfo(state['USERINFO'].userId).then(res => {
            const data = res.data
            let access = []
            access.push(data.userName)
            data.access = access
            commit('setUserName', data.userName)
            commit('setAccess', access)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } else {
          const data = JSON.parse(localStorage.userInfo)
          let access = []
          access.push(data.userName)
          data.access = access
          commit('setUserName', data.userName)
          commit('setAccess', access)
          resolve(data)
        }
      })
    },
    // 获取用户权限菜单
    getUserMenu ({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (!localStorage.menuList) {
          getUserMenu(state['USERINFO'].userId).then(res => {
            const data = res.data
            localStorage.menuList = JSON.stringify(data)
            resolve(menuTree(res.data.children))
          }).catch(err => {
            reject(err)
          })
        } else {
          const data = JSON.parse(localStorage.menuList)
          resolve(menuTree(data.children))
        }
      })
    },
    // 获取用户报表权限
    menuForms ({ state, commit }) {
      return new Promise((resolve, reject) => {
        if (!localStorage.menuForms) {
          menuForms().then(res => {
            const data = res.data
            localStorage.menuForms = JSON.stringify(data)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } else {
          const data = JSON.parse(localStorage.menuForms)
          resolve(data)
        }
      })
    },
    // 获取用户报表权限
    userList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        userList(params).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取商户权限列表
    roleParterList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        roleParterList(params).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 创建用户
    userCreate ({ commit }, params) {
      return new Promise((resolve, reject) => {
        userCreate(params).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 删除用户
    userDelete ({ commit }, params) {
      return new Promise((resolve, reject) => {
        userDelete(params).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户菜单权限
    roleMenuTreeIds ({ commit }, params) {
      return new Promise((resolve, reject) => {
        roleMenuTreeIds(params).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 编辑用户资料
    userUpdateTeall ({ commit }, params) {
      return new Promise((resolve, reject) => {
        userUpdateTeall(params).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 重置密码
    userUpdateBase ({ commit }, params) {
      return new Promise((resolve, reject) => {
        userUpdateBase(params).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  getters: {
    /**
     * [userInfo 返回用户信息]
     * @param  {[type]} state [description]
     * @return {[type]}       [description]
     */
    userInfo: (state) => {
      return state['USERINFO']
    },
    /**
     * [userId 返回用户ID]
     * @param  {[type]} state [description]
     * @return {[type]}       [description]
     */
    userId: (state) => {
      if (!!state['USERINFO'] && state['USERINFO'].userId) {
        return state['USERINFO'].userId
      } else {
        return null
      }
    }
  }
}
