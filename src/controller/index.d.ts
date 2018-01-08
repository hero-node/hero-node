import { FileController } from './files';

declare module 'egg' {
  export interface IController {
    files: FileController;
  }
}
