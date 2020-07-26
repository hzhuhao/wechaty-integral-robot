'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/wxuser/create', controller.robot.create);
  router.get('/api/wxuser/get', controller.robot.get);
  router.post('/api/wxuser/update', controller.robot.update);
  router.delete('/api/wxuser/delete', controller.robot.delete);
};
