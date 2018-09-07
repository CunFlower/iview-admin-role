import { login, logout, getUserInfo, getUserMenu } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

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
            let arr = []
            let selects = res.data.children
            for (let i = 0; i < selects.length; i++) {
              if (selects[i].children.length > 0) {
                arr.push(selects[i].name)
                if (selects[i].hasChildren) {
                  for (let j = 0; j < selects[i].children.length; j++) {
                    arr.push(selects[i].children[j].name)
                    if (selects[i].children[j].hasChildren) {
                      for (let v = 0; v < selects[i].children[j].children.length; v++) {
                        arr.push(selects[i].children[j].children[v].name)
                      }
                    }
                  }
                }
              }
            }
            localStorage.menuList = JSON.stringify(data)
            resolve(arr)
          }).catch(err => {
            reject(err)
          })
        } else {
          const data = JSON.parse(localStorage.menuList)
          let arr = []
          let selects = data.children
          for (let i = 0; i < selects.length; i++) {
            if (selects[i].children.length > 0) {
              arr.push(selects[i].name)
              if (selects[i].hasChildren) {
                for (let j = 0; j < selects[i].children.length; j++) {
                  arr.push(selects[i].children[j].name)
                  if (selects[i].children[j].hasChildren) {
                    for (let v = 0; v < selects[i].children[j].children.length; v++) {
                      arr.push(selects[i].children[j].children[v].name)
                    }
                  }
                }
              }
            }
          }
          resolve(arr)
        }
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
