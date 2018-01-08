import { FileService } from './storage/files';

declare module 'egg' {
  export interface IService {
    storage: {
      files: Files;
    };
  }
}
