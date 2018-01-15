import { Context, Service } from 'egg';
import * as IPFS from 'ipfs-api';
import * as _ from 'lodash';
import { promisify } from 'util';
// import { promisify } from 'util';

export interface IPeer {
  addr: Buffer;
  peer: any;
  muxer: string;
  latency: string;
  stream: any;
}

export default class FileService extends Service {
  private ipfs: any;
  // private peers: string[];

  constructor(ctx: Context) {
    super(ctx);
    this.ipfs = IPFS({
      host: this.config.ipfs.host,
      port: this.config.ipfs.port,
      protocol: this.config.ipfs.protocol,
    });
  }

  public async upload(data) {
    const ipfsFileAddAsync = promisify(this.ipfs.files.add);
    try {
      const files = await ipfsFileAddAsync(data);
      this.ctx.logger.debug(files);
      return files;
    } catch (err) {
      this.ctx.logger.error(err);
    }
  }

  public async getTopPeers(count?: number) {
    const allPeers = await this.getAvailablePeers();
    const sortedPeerList = _.sortBy(allPeers, (peerInfo: IPeer) => {
      const latencyStr = peerInfo.latency;
      let latency;
      if (_.endsWith(latencyStr, 'ms')) {
        latency = +_.join(_.slice(latencyStr, 0, latencyStr.length - 2), '');
      } else if (_.endsWith(latencyStr, 's')) {
        latency =
          +_.join(_.slice(latencyStr, 0, latencyStr.length - 1), '') * 1000;
      } else {
        latency = Infinity;
      }
      return latency;
    });
    if (count <= 0) {
      count = sortedPeerList.length;
    }
    const formatedPeersList = _.map(
      _.slice(sortedPeerList, 0, count),
      (peerInfo: IPeer) => {
        return this.formatPeerInfo(peerInfo.addr);
      },
    );
    return formatedPeersList;
  }

  private formatPeerInfo(peerInfo: Buffer) {
    const infoArr = _.split(peerInfo.toString(), '/');
    const formated = {
      ipType: infoArr[1],
      protocol: infoArr[3],
      ip: infoArr[2],
      port: +infoArr[4],
    };
    return formated;
  }

  private async getAvailablePeers(): Promise<[IPeer]> {
    const peerInfos: [IPeer] = await this.ipfs.swarm.peers({
      verbose: true,
    });
    return peerInfos;
  }
}
