'use strict';

const Controller = require('egg').Controller;

class RobotController extends Controller {
  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.robot.create(data);
    ctx.body = res;
  }

  async get() {
    const { ctx, service } = this;
    const { name } = ctx.query;
    const res = await service.robot.read(name);
    ctx.body = res;
  }

  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.robot.update(data);
    ctx.body = res;
  }

  async delete() {
    const { ctx, service } = this;
    const { id } = ctx.query;
    const res = await service.robot.delete(id);
    ctx.body = res;
  }
}

module.exports = RobotController;
