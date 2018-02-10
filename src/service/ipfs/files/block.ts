import { Context, Service } from 'egg';
import * as IPFS from 'ipfs-api';
import { promisify } from 'util';

export interface IIpfsFilesBlockService {
  get: (cid) => Promise<any>;
  put: (block, options?) => Promise<any>;
}

export default class IpfsFilesBlockService extends Service
  implements IIpfsFilesBlockService {
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

  public async get(cid): Promise<any> {
    try {
      const getSync = promisify(this.ipfs.blcok.get);
      const res = await getSync(cid);
      this.ctx.logger.debug(res);
      return res;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }

  public async put(block, options?): Promise<any> {
    try {
      const putSync = promisify(this.ipfs.blcok.put);
      const res = await putSync(block, options);
      this.ctx.logger.debug(res);
      return res;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }
}
