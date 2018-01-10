import { Context, Service } from 'egg';
import * as qr from 'qr-image';

export default class QRService extends Service {
  constructor(ctx: Context) {
    super(ctx);
  }

  public genImgByText(
    text: string,
    options?: { ec_level?: string; type?: string },
  ) {
    return qr.image(text, options);
  }
}
