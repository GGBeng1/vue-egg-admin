export default {
    setUserMsg(state, info) {
        state.userMsg = info
        window.localStorage.setItem('userMsg', JSON.stringify(info))
    },
    setUserAvatarUrl(state, url) {
        state.userMsg.avatarUrl = url
        window.localStorage.setItem('userMsg', JSON.stringify(state.userMsg))
    },
    clearUserMsg(state) {
        state.userMsg = {}
    },
    changeIsCollapse(state) {
        state.isCollapse = !state.isCollapse
    },
    tabsList(state, list) {
        console.log('list', list)
        state.tabsList.push(list)
    }
}