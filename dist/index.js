"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Program = require("commander");
exports.Program = Program;
const dotenv = require("dotenv");
const pkgReader_1 = require("./utils/pkgReader");
const processor_1 = require("./processor");
dotenv.config();
const pkgInfo = pkgReader_1.default();
Program.version(pkgInfo.version || '1.0.0');
Program.command('add <name>')
    .description('add specific chain support')
    .action(processor_1.add);
Program.command('upload <file>')
    .description('choose file to upload')
    .action(processor_1.upload);
Program.command('run')
    .description('start the heronode server')
    .option('-p, --port <number>', 'use alternative port to run')
    .action(processor_1.run);
Program.on('--help', () => {
    processor_1.helper();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXFDO0FBMkI1QiwwQkFBTztBQTFCaEIsaUNBQWlDO0FBQ2pDLGlEQUF5RDtBQUN6RCwyQ0FBdUQ7QUFFdkQsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2hCLE1BQU0sT0FBTyxHQUFHLG1CQUFTLEVBQUUsQ0FBQztBQUM1QixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUM7QUFFNUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7S0FDMUIsV0FBVyxDQUFDLDRCQUE0QixDQUFDO0tBQ3pDLE1BQU0sQ0FBQyxlQUFHLENBQUMsQ0FBQztBQUVmLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO0tBRTdCLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQztLQUNwQyxNQUFNLENBQUMsa0JBQU0sQ0FBQyxDQUFDO0FBRWxCLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0tBQ25CLFdBQVcsQ0FBQywyQkFBMkIsQ0FBQztLQUN4QyxNQUFNLENBQUMscUJBQXFCLEVBQUUsNkJBQTZCLENBQUM7S0FDNUQsTUFBTSxDQUFDLGVBQUcsQ0FBQyxDQUFDO0FBRWYsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO0lBQ3hCLGtCQUFNLEVBQUUsQ0FBQztBQUNYLENBQUMsQ0FBQyxDQUFDIn0=