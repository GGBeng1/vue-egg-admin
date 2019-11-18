"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  async createUser() {
    let { ctx, service } = this;
    let obj = {
      username: {
        type: "string",
        required: true
      },
      password: {
        type: "string",
        required: true
      },
      nickname: {
        type: "string",
        required: true
      }
    };
    //是否符合传参类型
    ctx.validate(obj);
    //用户登录信息
    const userInfo = ctx.request.body || {};
    let res = await service.user.userCreate(userInfo);
    ctx.helper.success({
      ctx,
      res
    });
  }
  //更新用户昵称
  async updateUserNickname() {
    let { ctx, service } = this;
    let obj = {
      nickname: {
        type: "string",
        required: true
      }
    };
    ctx.validate(obj);
    const req = ctx.request.body || {};
    const _id = ctx.state.user.data._id;
    let rest = await service.user.findByIdAndUpdate(_id, {
      nickname: req.nickname
    });
    let res = {};
    res.nickname = rest.nickname;
    ctx.helper.success({
      ctx,
      res
    });
  }
}

module.exports = UserController;
