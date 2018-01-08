import { Context, Service } from 'egg';
import * as IPFS from 'ipfs-api';
import * as _ from 'lodash';
// import { promisify } from 'util';

export class FileService extends Service {
  private ipfs: any;
  private peers: string[];

  constructor(ctx: Context) {
    super(ctx);
    this.ipfs = IPFS({
      host: 'localhost',
      port: '65001',
      protocol: 'http',
    });
  }

  async getNodes() {
    const peerInfos = await this.ipfs.peers({ verbose: true });
    this.app.logger.info(peerInfos);
    this.peers = _.map(peerInfos, (info: any) => {
      return info.addr;
    });
  }
}
