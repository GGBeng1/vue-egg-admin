'use strict'

const Service = require('egg').Service

class TokenService extends Service {
  async apply(_id) {
    const { ctx } = this
    return ctx.app.jwt.sign(
      {
        data: {
          _id: _id
        },
        exp: Math.floor(Date.now() / 1000 + 60 * 60 * 12)
      },
      ctx.app.config.jwt.secret
    )
  }
  async getUserByToken() {
    const { ctx, service } = this
    // ctx.state.user 可以提取到JWT编码的data
    const _id = ctx.state.user.data._id
    const user = await service.user.findByUserId(_id)
    if (!user) {
      ctx.throw(404, 'user is not found')
    }
    return user
  }
}

module.exports = TokenService
