"use strict";

const Service = require("egg").Service;

class UserService extends Service {
  async findByUsername(username) {
    return this.ctx.model.User.findOne({ username: username });
  }
  async findByUserId(id) {
    return this.ctx.model.User.findById(id);
  }
  async createUser(userInfo) {
    return this.ctx.model.User.create(userInfo);
  }
  async findByIdAndUpdate(id, values) {
    return this.ctx.model.User.findByIdAndUpdate(id, values, { new: true });
  }
  async userCreate(userInfo) {
    let { service } = this;
    let user = await service.user.findByUsername(userInfo.username);
    if (user) {
      return { state: false, msg: "用户名已经存在，请重新注册" };
    } else {
      userInfo.avatarUrl = "/public/uploads/77058.jpg";
      let done = await service.user.createUser(userInfo);
      if (done) {
        return { state: true, msg: "注册成功，快去登录吧！" };
      }
    }
  }
}

module.exports = UserService;
