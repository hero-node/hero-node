import { readFileSync } from 'fs';
import { join } from 'path';

export default () => {
  const pkgFile = readFileSync(join(__dirname, '../../package.json'));
  const pkgInfo = JSON.parse(pkgFile.toString('utf8'));

  return pkgInfo;
};
