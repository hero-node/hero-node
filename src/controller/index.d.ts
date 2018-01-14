import { IFileController } from './files';
import { IHomeController } from './home';

declare module 'egg' {
  export interface IController {
    files: IFileController;
    home: IHomeController;
  }
}
