import { Controller } from 'egg';

export class FileController extends Controller {
  public async upload() {
    this.app.logger.info('update mocker');
  }
}
