'use strict'

const Service = require('egg').Service

class UserService extends Service {
  async findByUsername(username) {
    return this.ctx.model.User.findOne({ username: username })
  }
  async findByUserId(id) {
    return this.ctx.model.User.findById(id)
  }
  async findByIdAndUpdate(id, values) {
    return this.ctx.model.User.findByIdAndUpdate(id, values)
  }
}

module.exports = UserService
