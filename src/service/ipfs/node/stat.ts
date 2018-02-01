import { Context, Service } from 'egg';
import * as IPFS from 'ipfs-api';
import { promisify } from 'util';

export interface IIpfsNodeStatService {
  bitswap: () => Promise<any>;
  bw: (options: any) => Promise<any>;
  stat: (options: any) => Promise<any>;
}

export default class IpfsNodeStatService extends Service
  implements IIpfsNodeStatService {
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

  public async bitswap(): Promise<any> {
    const getIpfsNodeBitswap = promisify(this.ipfs.bitswap);
    try {
      const bitswap = getIpfsNodeBitswap();
      this.ctx.logger.debug(bitswap);
      return bitswap;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }

  public async bw(options: any): Promise<any> {
    const getBw = promisify(this.ipfs.bw);
    try {
      const result = getBw(options);
      this.ctx.logger.debug(result);
      return result;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }
}
