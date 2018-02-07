import { Context, Service } from 'egg';
import * as IPFS from 'ipfs-api';
import { promisify } from 'util';

export interface IIpfsFilesFilesService {
  add: (data, options?) => Promise<any>;
  cat: (path) => Promise<any>;
}

export default class IpfsNetworkBootstrapService extends Service
  implements IIpfsFilesFilesService {
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

  public async add(data, options?): Promise<any> {
    try {
      const addSync = promisify(this.ipfs.files.files.add);
      const res = await addSync(data, options);
      this.ctx.logger.debug(res);
      return res;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }

  public async cat(path): Promise<any> {
    try {
      const catSync = promisify(this.ipfs.files.files.cat);
      const res = await catSync(path);
      this.ctx.logger.debug(res);
      return res;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }

  public async get(path): Promise<any> {
    try {
      const getAsync = promisify(this.ipfs.files.files.get);
      const res = await getAsync(path);
      this.ctx.logger.debug(res);
      return res;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }
}
