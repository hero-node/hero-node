import FileController from './files';
import IndexController from './index';

declare module 'egg' {
  export interface IController {
    files: FileController;
    index: IndexController;
  }
}
