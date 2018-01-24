import { FileService } from './storage/files';
import { QRService } from './misc/qr';
import { IIpfsNodeMiscServiceIIpfsService } from './ipfs/node/misc';
import { IIpfsNodeConfigService } from './ipfs/node/config';
import { IIpfsNetworkSwarmService } from './ipfs/network/swarm';

declare module 'egg' {
  export interface IService {
    ipfs: {
      network: {
        swarm: IIpfsNetworkSwarmService;
      };
      node: {
        misc: IIpfsNodeMiscService;
        config: IIpfsNodeConfigService;
      };
    };
    misc: {
      qr: QRService;
    };
    storage: {
      files: Files;
    };
  }
}
