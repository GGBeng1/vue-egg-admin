'use strict';

const Controller = require('egg').Controller;
// import redLock from "../common/redLock"
const Redlock = require('redlock');
class UserController extends Controller {
  async createUser() {
    const { ctx, service } = this;
    const obj = {
      username: {
        type: 'string',
        required: true,
      },
      password: {
        type: 'string',
        required: true,
      },
      nickname: {
        type: 'string',
        required: true,
      },
    };
    // 是否符合传参类型
    ctx.validate(obj);
    // 用户登录信息
    const userInfo = ctx.request.body || {};
    const res = await service.user.userCreate(userInfo);
    ctx.helper.success({
      ctx,
      res,
    });
  }
  // 更新用户昵称
  async updateUserNickname() {
    const { ctx, service, app } = this;
    const uuid = (Math.random() * 999999).toFixed();
    // console.log(app.redis)
    const redlock = new Redlock([ app.redis ], {
      retryDelay: 200, // time in ms
      retryCount: 5,
    });
    const obj = {
      nickname: {
        type: 'string',
        required: true,
      },
    };
    ctx.validate(obj);
    const req = ctx.request.body || {};
    const _id = ctx.state.user.data._id;
    const lock = await redlock.lock(_id, uuid, 2000);
    const rest = await service.user.findByIdAndUpdate(_id, {
      nickname: req.nickname,
    });
    const res = {};
    res.nickname = rest.nickname;
    ctx.helper.success({
      ctx,
      res,
    });
    lock.unlock();
  }
}

module.exports = UserController;
