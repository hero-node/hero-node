import * as Program from 'commander';
import { default as pkgReader } from './utils/pkgReader';
import { add, helper, server, upload } from './processor';

const pkgInfo = pkgReader();
Program.version(pkgInfo.version || '1.0.0');

Program.command('add <name>')
  .description('add specific chain support')
  .action(add);

Program.command('upload <file>')
  // .option('-t --type [name]', 'select which kind of payload you want to upload')
  .description('choose file to upload')
  .action(upload);

Program.command('run')
  .description('start the heronode server')
  .action(server);

Program.on('--help', () => {
  helper();
});

Program.parse(process.argv);
