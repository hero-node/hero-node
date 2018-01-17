import { FileService } from './storage/files';
import { QRService } from './misc/qr';
import { IIpfsService } from './ipfs';

declare module 'egg' {
  export interface IService {
    ipfs: IIpfsService;
    misc: {
      qr: QRService;
    };
    storage: {
      files: Files;
    };
  }
}
