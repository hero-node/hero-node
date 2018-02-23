import { Context, Service } from 'egg';
import * as IPFS from 'ipfs-api';
import { promisify } from 'util';

export interface IIpfsNodeKeyService {
  gen: (name, options?) => Promise<any>;
  list: (options?) => Promise<any>;
  rm: (name) => Promise<any>;
  rename: (oldName, newName) => Promise<any>;
  export: (name, password) => Promise<any>;
}

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

  public async gen(name: string, options?: any): Promise<any> {
    const genAsync = promisify(this.ipfs.key.gen);
    try {
      const result = genAsync(name, options);
      this.ctx.logger.debug(result);
      return result;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }

  public async list(options?: any): Promise<any> {
    const listAsync = promisify(this.ipfs.key.list);
    try {
      const result = listAsync(options);
      this.ctx.logger.debug(result);
      return result;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }

  public async rm(name: string): Promise<any> {
    const rmAsync = promisify(this.ipfs.key.rm);
    try {
      const result = rmAsync(name);
      this.ctx.logger.debug(result);
      return result;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }

  public async rename(oldName: string, newName: string): Promise<any> {
    const rnameAsync = promisify(this.ipfs.key.rm);
    try {
      const result = rnameAsync(oldName, newName);
      this.ctx.logger.debug(result);
      return result;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }

  public async export(name: string, password: string): Promise<any> {
    const exportAsync = promisify(this.ipfs.key.export);
    try {
      const result = exportAsync(name, password);
      this.ctx.logger.debug(result);
      return result;
    } catch (err) {
      this.ctx.logger.warn(err);
      return;
    }
  }
}
