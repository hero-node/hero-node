import { Context, Service } from 'egg';
import * as IPFS from 'ipfs-api';
import { promisify } from 'util';

export interface IIpfsGraphDagService {}

export default class IpfsGraphDagService extends Service
  implements IIpfsGraphDagService {
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

  public async put(dagNode: any, options: any): Promise<any> {
    const putAsync = promisify(this.ipfs.graph.dag.put);
    try {
      const result = putAsync(dagNode, options);
      this.ctx.logger.debug(result);
      return result;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }
}
