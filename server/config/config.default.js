/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1571107417264_279'

  // add your middleware config here
  config.middleware = []

  // config.swaggerdoc = {
  //   dirScanner: './app/controller',
  //   apiInfo: {
  //     title: '自动接口生成',
  //     description: 'swagger-ui for egg',
  //     version: '1.0.0'
  //   },
  //   schemes: ['http', 'https'],
  //   consumes: ['application/json'],
  //   produces: ['application/json'],
  //   enableSecurity: false,
  //   // enableValidate: true,
  //   routerMap: true,
  //   enable: true
  // }

  config.security = {
    csrf: {
      enable: false
    }
  }
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH'
  }
  config.mongoose = {
    url: 'mongodb://localhost:27017/123',
    // url: 'mongodb://127.0.0.1:27017/123',
    options: {
      // useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0
    }
  }
  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    match: /^\/api/ // optional
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }
  return {
    ...config,
    ...userConfig
  }
}
