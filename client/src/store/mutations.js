export default {
  setUserToken (state, token) {
    state.userMsg.token = token
    window.localStorage.setItem('token', JSON.stringify(token))
  },
  setUserAvatarUrl (state, url) {
    state.userMsg.avatarUrl = url
  },
  clearUserMsg (state) {
    state.userMsg = {
      token: '',
      nickname: '',
      avatarUrl: ''
    }
    state.tabsList = [
      {
        name: '首页',
        closable: false,
        type: 'info',
        path: '/home/welcome'
      }
    ]
    state.defaultActive = ''
  },
  updateNickname (state, nickname) {
    state.userMsg.nickname = nickname
  },
  setUserInfo (state, data) {
    state.userMsg.nickname = data.nickname
    state.userMsg.avatarUrl = data.avatarUrl
  },
  changeIsCollapse (state) {
    state.isCollapse = !state.isCollapse
  },
  tabsList (state, arr) {
    state.tabsList = state.tabsList.concat(arr)
  },
  cloleTab (state, path) {
    state.tabsList.forEach((i, index) => {
      if (i.path == path) {
        state.tabsList.splice(index, 1)
      }
    })
  },
  changeColor (state, path) {
    state.tabsList.forEach((item, index) => {
      if (item.path == path) {
        item.type = 'success'
      }
    })
  },
  defaultActive (state, path) {
    state.defaultActive = path
  }
}
