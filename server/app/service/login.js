'use strict'

const Service = require('egg').Service

class LoginService extends Service {
  async index(userInfo) {
    const { ctx, service } = this
    const user = await service.user.findByUsername(userInfo.username)
    if (!user) {
      return { state: false, msg: '用户不存在' }
    }
    // let verifyPsw = await ctx.compare(userInfo.password, user.password)
    if (userInfo.password !== user.password) {
      return { state: false, msg: '用户名或密码错误' }
    }
    // 生成Token令牌
    return {
      state: true,
      userMsg: {
        roletype: user.roletype,
        nickname: user.nickname,
        avatarUrl: user.avatarUrl,
        token: await service.token.apply(user._id)
      }
    }
  }
}
module.exports = LoginService
