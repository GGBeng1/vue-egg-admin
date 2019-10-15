'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app
  router.post('/login', controller.login.index)
  router.post('/home', jwt, controller.home.index)
}
