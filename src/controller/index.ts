import { Controller } from 'egg';

export default class IndexController extends Controller {
  public async welcome() {
    this.ctx.body = 'Welcome to Hero Node!';
  }

  public async generateQrImg() {
    const payload: string = this.ctx.query as string;
    const imgStream = this.ctx.service.misc.qr.genImgByText(payload);
  }
}
