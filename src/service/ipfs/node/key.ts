import { Context, Service } from 'egg';
import * as IPFS from 'ipfs-api';
import { promisify } from 'util';

export interface IIpfsNodeKeyService {}

export default class IpfsNodeKeyService extends Service
  implements IIpfsNodeKeyService {
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
