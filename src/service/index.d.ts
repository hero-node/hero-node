import { FileService } from './storage/files';
import { QRService } from './misc/qr';

declare module 'egg' {
  export interface IService {
    misc: {
      qr: QRService;
    };
    storage: {
      files: Files;
    };
  }
}
