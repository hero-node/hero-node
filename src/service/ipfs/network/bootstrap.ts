import { Context, Service } from 'egg';
// import * as IPFS from 'ipfs-api';
// import { promisify } from 'util';

export interface IIpfsNetworkBootstrapService {}

export default class IpfsNetworkBootstrapService extends Service
  implements IIpfsNetworkBootstrapService {
  // private ipfs: any;
  constructor(ctx: Context) {
    super(ctx);
    // if (!this.ctx.service.ipfs) {
    //   this.ipfs = IPFS({
    //     host: this.config.ipfs.host,
    //     port: this.config.ipfs.port,
    //     protocol: this.config.ipfs.protocol,
    //   });
    // }
  }
}
