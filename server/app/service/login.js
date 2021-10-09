'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

class LoginService extends Service {
  async index(userInfo) {
    const { ctx, service } = this;
    const vcode = ctx.session.code.toLowerCase();
    if (vcode !== userInfo.verify) {
      return { state: false, msg: '验证码错误' };
    }
    const user = await service.user.findByUsername(userInfo.username);
    if (!user) {
      return { state: false, msg: '用户不存在' };
    }
    // let verifyPsw = await ctx.compare(userInfo.password, user.password)
    if (userInfo.password !== user.password) {
      return { state: false, msg: '用户名或密码错误' };
    }
    // 生成Token令牌
    return {
      state: true,
      token: await service.token.apply(user._id),
    };
  }
  async captcha() {
    const { ctx } = this;
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      bacground: '#cc9966',
    });
    ctx.session.code = captcha.text;
    return captcha;
  }
}
module.exports = LoginService;
