import * as Program from 'commander';
import { default as pkgReader } from './utils/pkgReader';
import { add, helper, upload } from './processor';

const pkgInfo = pkgReader();
Program.version(pkgInfo.version || '1.0.0');

Program.command('add <name>')
  .description('add specific chain support')
  .action(add);

Program.command('upload <file>')
  .description('choose file to upload')
  .action(upload);

Program.on('--help', () => {
  helper();
});
Program.parse(process.argv);
