import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { head } from 'lodash';
import { default as Ipfs } from '../adapter/ipfs';

const fileExistAsync = promisify(fs.exists);
const readFileAsync = promisify(fs.readFile);

export default async filepath => {
  let fullpath;
  if (path.isAbsolute(filepath)) {
    fullpath = filepath;
  } else {
    fullpath = path.join(process.cwd(), filepath);
  }
  const existed = await fileExistAsync(fullpath);
  if (!existed) {
    console.error('[ERROR] file does not exist, please check the path!');
    return;
  }
  const ipfs = Ipfs();
  try {
    const payload = await readFileAsync(fullpath);
    ipfs.on('ready', async () => {
      const ipfsFileAdd = promisify(ipfs.files.add);
      const res = await ipfsFileAdd(payload);
      const firstObj = head(res);
      console.log('[INFO] uploaded successfully');
      console.log(
        `[INFO] path: ${firstObj['path']}, size: ${firstObj['size']}`,
      );
      ipfs.stop(() => {
        console.log('[INFO] disconnecting...');
        return;
      });
    });
  } catch (err) {
    console.error(err);
  }
};
