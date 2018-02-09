import { FileService } from './storage/files';
import { QRService } from './misc/qr';
import { IIpfsNetworkBootstrapService } from './ipfs/network/bootstrap';
import { IIpfsNetworkSwarmService } from './ipfs/network/swarm';
import { IIpfsNodeConfigService } from './ipfs/node/config';
import { IIpfsNodeMiscService } from './ipfs/node/misc';
import { IIpfsNodeStatService } from './ipfs/node/stat';
import { IIpfsFilesFilesService } from './ipfs/files/files';
import { IIpfsFilesBlockService } from './ipfs/files/block';

declare module 'egg' {
  export interface IService {
    ipfs: {
      files: {
        block: IIpfsFilesBlockService;
        files: IIpfsFilesFilesService;
      };
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
