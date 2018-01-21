import { Context, Service } from 'egg';
import * as IPFS from 'ipfs-api';
import { promisify } from 'util';

export interface IIpfsNodeConfigService {
  get: (key: string) => any;
  set: (key: string, value: any) => any;
}

export default class IpfsNodeConfigService extends Service
  implements IIpfsNodeConfigService {
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

  public async get(key: string): Promise<any> {
    const getConfigAsync = promisify(this.ipfs.config.get);
    try {
      const val = getConfigAsync(key);
      this.ctx.logger.debug(val);
      return val;
    } catch (err) {
      this.ctx.logger.warn(err);
      return null;
    }
  }

  public async set(key: string, value: any): Promise<any> {
    const setConfigAsync = promisify(this.ipfs.config.set);
    try {
      const result = setConfigAsync(key, value);
      this.ctx.logger.debug(result);
      return result;
    } catch (err) {
      this.ctx.logger.warn(err);
      return null;
    }
  }
}
