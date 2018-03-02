import { Context, Service } from 'egg';
import * as IPFS from 'ipfs-api';
import { promisify } from 'util';

export interface IIpfsGraphDagService {
  put(dagNode: any, options: any): Promise<any>;
  get(cid: string, path?: string, options?: any): Promise<any>;
  tree(cid: string, path?: string, options?: any): Promise<any>;
}

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

  public async get(cid: string, path?: string, options?: any): Promise<any> {
    const getAsync = promisify(this.ipfs.graph.dag.get);
    try {
      const data = getAsync(cid, path, options);
      this.ctx.logger.debug(data);
      return data;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }

  public async tree(cid: string, path?: string, options?: any): Promise<any> {
    const treeAsync = promisify(this.ipfs.graph.dag.tree);
    try {
      const data = treeAsync(cid, path, options);
      this.ctx.logger.debug(data);
      return data;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }
}
