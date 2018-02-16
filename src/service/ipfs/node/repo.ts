import { Context, Service } from 'egg';
import * as IPFS from 'ipfs-api';
import { promisify } from 'util';

export interface IIpfsNodeRepoService {
  gc: (options?) => Promise<any>;
  stat: (options?) => Promise<any>;
  version: () => Promise<any>;
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
    const gcAsync = promisify(this.ipfs.repo.gc);
    try {
      const resp = gcAsync(options);
      this.ctx.logger.debug(resp);
      return resp;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }

  public async stat(options?): Promise<any> {
    const statAsync = promisify(this.ipfs.repo.stat);
    try {
      const result = statAsync(options);
      this.ctx.logger.debug(result);
      return result;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }

  public async version(): Promise<any> {
    const versionAsync = promisify(this.ipfs.repo.version);
    try {
      const result = versionAsync();
      this.ctx.logger.debug(result);
      return result;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }
}
