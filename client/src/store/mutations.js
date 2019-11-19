export default {
    setUserMsg(state, info) {
        state.userMsg = info;
        window.localStorage.setItem("userMsg", JSON.stringify(info));
    },
    setUserAvatarUrl(state, url) {
        state.userMsg.avatarUrl = url;
        window.localStorage.setItem("userMsg", JSON.stringify(state.userMsg));
    },
    clearUserMsg(state) {
        state.userMsg = {};
    },
    updateNickname(state, nickname) {
        state.userMsg.nickname = nickname;
    },
    setUserInfo(state, data) {
        state.userMsg.nickname = data.nickname;
        state.userMsg.avatarUrl = data.avatarUrl;
    },
    changeIsCollapse(state) {
        state.isCollapse = !state.isCollapse;
    },
    tabsList(state, arr) {
        state.tabsList = state.tabsList.concat(arr)
    },
    changeColor(state, name) {
        state.tabsList.forEach((item, index) => {
            if (item.name.trim() == name.trim()) {
                item.type = 'success'
            }
        })
    },
    defaultActive(state, path) {
        state.defaultActive = path
    }
};