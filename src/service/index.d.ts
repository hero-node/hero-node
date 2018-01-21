import { FileService } from './storage/files';
import { QRService } from './misc/qr';
import { IIpfsNodeMiscServiceIIpfsService } from './ipfs/node/misc';
import { IIpfsNodeConfigService } from './ipfs/node/config';

declare module 'egg' {
  export interface IService {
    ipfs: {
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
