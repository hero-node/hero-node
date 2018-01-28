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
}
