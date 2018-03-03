import { Context, Service } from 'egg';
import * as IPFS from 'ipfs-api';
import { promisify } from 'util';

export interface IIpfsGraphObjectService {
  put(dagNode: any, options: any): Promise<any>;
  get(cid: string, path?: string, options?: any): Promise<any>;
  tree(cid: string, path?: string, options?: any): Promise<any>;
}

export default class IpfsGraphObjectService extends Service
  implements IIpfsGraphObjectService {
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
