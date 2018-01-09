import { Controller } from 'egg';

export default class FileController extends Controller {
  public async upload() {
    this.app.logger.info('update mocker');
    this.ctx.body = '1';
  }

  public async list() {
    this.ctx.body = '12313';
  }
}
