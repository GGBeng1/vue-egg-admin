'use strict'

const Service = require('egg').Service

class UserService extends Service {
  async findByUsername(username) {
    return this.ctx.model.User.findOne({ username: username })
  }
}

module.exports = UserService
