import { Controller } from 'egg';

export interface IHomeController {
  welcome: () => void;
  generateQrImg: () => void;
}

export default class HomeController extends Controller {
  public async welcome() {
    this.ctx.body = 'Welcome to Hero Node!';
  }

  public async generateQrImg() {
    const payload: string = this.ctx.query.payload as string;
    const imgStream = this.ctx.service.misc.qr.genImgByText(payload);
    this.ctx.set('Content-type', 'image/png');
    this.ctx.body = imgStream;
  }
}
