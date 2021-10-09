'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, service } = this;
    const _id = ctx.state.user.data._id;
    const userInfo = await service.user.findByUserId(_id);
    const res = {
      nickname: userInfo.nickname,
      avatarUrl: userInfo.avatarUrl,
    };
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = HomeController;
