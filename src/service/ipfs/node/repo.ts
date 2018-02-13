import { Context, Service } from 'egg';
import * as IPFS from 'ipfs-api';
import { promisify } from 'util';

export interface IIpfsNodeRepoService {
  gc: (options?) => Promise<any>;
}

export default class IpfsNodeRepoService extends Service
  implements IIpfsNodeRepoService {
  private ipfs: any;
  constructor(ctx: Context) {
    super(ctx);
    if (!this.ctx.service.ipfs) {
      this.ipfs = IPFS({
        host: this.config.ipfs.host,
        port: this.config.ipfs.port,
        protocol: this.config.ipfs.protocol,
      });
    }
  }

  public async gc(options?): Promise<any> {
    const gcAsync = promisify(this.ipfs.id);
    try {
      const resp = gcAsync(options);
      this.ctx.logger.debug(resp);
      return resp;
    } catch (err) {
      this.ctx.logger.warn(err);
      return null;
    }
  }
}
