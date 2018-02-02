import { FileService } from './storage/files';
import { QRService } from './misc/qr';
import { IIpfsNetworkBootstrapService } from './ipfs/network/bootstrap';
import { IIpfsNetworkSwarmService } from './ipfs/network/swarm';
import { IIpfsNodeConfigService } from './ipfs/node/config';
import { IIpfsNodeMiscService } from './ipfs/node/misc';
import { IIpfsNodeStatService } from './ipfs/node/stat';

declare module 'egg' {
  export interface IService {
    ipfs: {
      network: {
        bootstrap: IIpfsNetworkBootstrapService;
        swarm: IIpfsNetworkSwarmService;
      };
      node: {
        misc: IIpfsNodeMiscService;
        config: IIpfsNodeConfigService;
        stat: IIpfsNodeStatService;
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
