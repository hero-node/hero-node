import { Controller } from 'egg';

export default class IndexController extends Controller {
  public async welcome() {
    this.ctx.body = 'Welcome to Hero Node!';
  }
}
