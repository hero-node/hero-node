import { Context, Service } from 'egg';
import * as IPFS from 'ipfs-api';
import { promisify } from 'util';

export interface IIpfsGraphObjectService {
  new(template?: string): Promise<any>;
  put(obj: any, options?: any): Promise<any>;
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

  public async new(template?: string): Promise<any> {
    const newAsync = promisify(this.ipfs.graph.object.new);
    try {
      const result = newAsync(template);
      this.ctx.logger.debug(result);
      return result;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }

  public async put(obj: any, options?: any): Promise<any> {
    const putAsync = promisify(this.ipfs.graph.object.put);
    try {
      const result = putAsync(obj, options);
      this.ctx.logger.debug(result);
      return result;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }
}
