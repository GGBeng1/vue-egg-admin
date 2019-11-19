export default {
  setUserToken(state, token) {
    state.userMsg.token = token;
    window.localStorage.setItem("token", JSON.stringify(token));
  },
  setUserAvatarUrl(state, url) {
    state.userMsg.avatarUrl = url;
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
  }
};
