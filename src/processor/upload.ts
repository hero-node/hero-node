import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { head } from 'lodash';
import { default as Ipfs } from '../adapter/ipfs';
import { LoggerFactory } from '../utils/logger';

const fileExistAsync = promisify(fs.exists);
const readFileAsync = promisify(fs.readFile);

export default async filepath => {
  const logger = LoggerFactory.getLabeledInstance('processor', 'upload');
  let fullpath;
  if (path.isAbsolute(filepath)) {
    fullpath = filepath;
  } else {
    fullpath = path.join(process.cwd(), filepath);
  }
  const existed = await fileExistAsync(fullpath);
  if (!existed) {
    logger.warn('file does not exist, please check the path!');
    return;
  }
  const ipfs = Ipfs();
  try {
    const payload = await readFileAsync(fullpath);
    ipfs.on('ready', async () => {
      const ipfsFileAdd = promisify(ipfs.files.add);
      const res = await ipfsFileAdd(payload);
      const firstObj = head(res);
      logger.info('uploaded successfully');
      logger.info(`path: ${firstObj['path']}, size: ${firstObj['size']}`);
      ipfs.stop(() => {
        logger.info('disconnecting...');
        return;
      });
    });
  } catch (err) {
    logger.error(err);
  }
};
