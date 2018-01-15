import { Controller } from 'egg';
import * as _ from 'lodash';
import { IPeer } from '../service/storage/files';

export interface IFileController {
  upload: () => void;
  getNodesList: () => void;
}

export default class FileController extends Controller
  implements IFileController {
  private DEFAULT_PEER_COUNT = 10;

  public async upload() {
    const stream = await this.ctx.getFileStream();
    const result = await this.ctx.service.storage.files.upload(stream);
    this.ctx.body = result;
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
