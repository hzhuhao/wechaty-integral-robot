'use strict';

const Service = require('egg').Service;

class RobotService extends Service {
  async create(data) {
    const result = await this.app.mysql.insert('wxuser', data);
    this.ctx.logger.info(result);
    return result;
  }

  async read(name) {
    const result = await this.app.mysql.get('wxuser', { name });
    this.ctx.logger.info(result);
    return result;
  }

  async update(data) {
    const result = await this.app.mysql.update('wxuser', data);
    this.ctx.logger.info(result);
    return result;
  }

  async delete(id) {
    const result = await this.app.mysql.delete('wxuser', { id });
    this.ctx.logger.info(result);
    return result;
  }
}

module.exports = RobotService;
