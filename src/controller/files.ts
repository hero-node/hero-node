import { Controller } from 'egg';
import * as _ from 'lodash';
import { IPeer } from '../service/storage/files';

export interface IFileController {
  uploadFile: () => void;
  uploadRaw: () => Promise<any>;
  getNodesList: () => void;
}

export default class FileController extends Controller
  implements IFileController {
  private DEFAULT_PEER_COUNT = 10;

  public async uploadFile() {
    const stream = await this.ctx.getFileStream();
    const result = await this.ctx.service.storage.files.upload(stream);
    this.ctx.body = result;
  }

  public async uploadRaw(): Promise<any> {
    const body = this.ctx.request.body;
    const content = _.get(body, 'content');
    if (!content) {
      this.ctx.logger.warn('body content is empty!');
      this.ctx.status = 500;
      this.ctx.body = 'please make sure content field is not empty';
      return;
    }
    this.ctx.logger.info(`uploading content: ${content}`);
    const resp = await this.service.storage.files.upload(Buffer.from(content));
    this.ctx.body = resp;
  }

  public async cat(): Promise<any> {
    const hashId = this.ctx.params.hashId;
    if (!hashId) {
      this.ctx.logger.warn('hashId must be provided');
      this.ctx.status = 500;
      this.ctx.body = 'please provide the hash id';
      return;
    }
    this.ctx.logger.info(`cat content with hash: ${hashId}`);
    const data = await this.service.storage.files.cat(hashId);
    this.ctx.body = data;
  }

  public async getNodesList() {
    const peersList = await this.ctx.service.storage.files.getTopPeers(
      this.DEFAULT_PEER_COUNT,
    );
    const addrsList = _.map(peersList, (peerInfo: IPeer) => {
      // TODO: some handler on raw data
      return peerInfo;
    });
    this.ctx.body = addrsList;
  }
}
