import { FileService } from './storage/files';
import { QRService } from './misc/qr';
import { IIpfsFilesBlockService } from './ipfs/files/block';
import { IIpfsFilesFilesService } from './ipfs/files/files';
import { IIpfsNetworkBootstrapService } from './ipfs/network/bootstrap';
import { IIpfsNetworkSwarmService } from './ipfs/network/swarm';
import { IIpfsNodeConfigService } from './ipfs/node/config';
import { IIpfsNodeKeyService } from './ipfs/node/key';
import { IIpfsNodeMiscService } from './ipfs/node/misc';
import { IIpfsNodeRepoService } from './ipfs/node/repo';
import { IIpfsNodeStatService } from './ipfs/node/stat';

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
        config: IIpfsNodeConfigService;
        key: IIpfsNodeKeyService;
        misc: IIpfsNodeMiscService;
        repo: IIpfsNodeRepoService;
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
