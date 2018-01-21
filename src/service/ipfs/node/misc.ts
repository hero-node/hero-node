import { Context, Service } from 'egg';
import * as IPFS from 'ipfs-api';
import { promisify } from 'util';

export interface IIpfsNodeMiscService {
  getId: () => any;
  getVersion: () => any;
  getDns: () => any;
}

export class IpfsNodeMiscService extends Service
  implements IIpfsNodeMiscService {
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

  public async getId(): Promise<any> {
    const getIpfsIdAsync = promisify(this.ipfs.id);
    try {
      const identity = getIpfsIdAsync();
      this.ctx.logger.debug(identity);
      return identity;
    } catch (err) {
      this.ctx.logger.warn(err);
      return null;
    }
  }

  public async getVersion(): Promise<any> {
    const getIpfsVersion = promisify(this.ipfs.version);
    try {
      const version = getIpfsVersion();
      this.ctx.logger.debug(version);
      return version;
    } catch (err) {
      this.ctx.logger.warn(err);
      return null;
    }
  }

  public async getDns(): Promise<any> {
    const getIpfsDns = promisify(this.ipfs.dns);
    try {
      const dns = getIpfsDns();
      this.ctx.logger.debug(dns);
      return dns;
    } catch (err) {
      this.ctx.logger.warn(err);
      return null;
    }
  }
}
