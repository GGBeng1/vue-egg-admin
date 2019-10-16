'use strict'

const Controller = require('egg').Controller
const awaitWriteStream = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')
const fs = require('fs')
const path = require('path')
class UploadController extends Controller {
  async uploadAvatar() {
    const { ctx, service } = this
    const id = ctx.state.user.data._id
    const stream = await ctx.getFileStream()
    const extname = path.extname(stream.filename).toLowerCase() // 文件扩展名称
    const uuid = (Math.random() * 999999).toFixed()

    // 组装参数 stream
    const target = path.join(
      this.config.baseDir,
      'app/public/uploads',
      `${uuid}${extname}`
    )
    const writeStream = fs.createWriteStream(target)
    // 文件处理，上传到云存储等等
    try {
      await awaitWriteStream(stream.pipe(writeStream))
      await service.user.findByIdAndUpdate(id, {
        avatarUrl: `/public/uploads/${uuid}${extname}`
      })
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream)
      throw err
    }
    let user = await service.user.findByUserId(id)
    let res = {
      avatarUrl: user.avatarUrl
    }
    ctx.helper.success({ ctx, res })
  }
}

module.exports = UploadController
