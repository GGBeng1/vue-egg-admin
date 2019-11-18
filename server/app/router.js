"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post("/login", controller.login.index);
  router.post("/api/home", controller.home.index);
  router.post("/api/upload", controller.upload.uploadAvatar);
  router.post("/createUser", controller.user.createUser);
  router.post("/api/tableExport", controller.upload.tableExport);
  router.post("/api/tableUpload", controller.upload.tableUpload);
  router.post("/api/updateUserNickname", controller.user.updateUserNickname);
};
