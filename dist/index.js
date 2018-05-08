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
    // .option('-t --type [name]', 'select which kind of payload you want to upload')
    .description('choose file to upload')
    .action(processor_1.upload);
Program.command('run')
    .description('start the heronode server')
    .option('-p, --port <number>', 'use alternative port to run')
    .action(processor_1.run);
Program.on('--help', () => {
    processor_1.helper();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXFDO0FBMkI1QiwwQkFBTztBQTFCaEIsaUNBQWlDO0FBQ2pDLGlEQUF5RDtBQUN6RCwyQ0FBdUQ7QUFFdkQsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2hCLE1BQU0sT0FBTyxHQUFHLG1CQUFTLEVBQUUsQ0FBQztBQUM1QixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUM7QUFFNUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7S0FDMUIsV0FBVyxDQUFDLDRCQUE0QixDQUFDO0tBQ3pDLE1BQU0sQ0FBQyxlQUFHLENBQUMsQ0FBQztBQUVmLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO0lBQzlCLGlGQUFpRjtLQUNoRixXQUFXLENBQUMsdUJBQXVCLENBQUM7S0FDcEMsTUFBTSxDQUFDLGtCQUFNLENBQUMsQ0FBQztBQUVsQixPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztLQUNuQixXQUFXLENBQUMsMkJBQTJCLENBQUM7S0FDeEMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLDZCQUE2QixDQUFDO0tBQzVELE1BQU0sQ0FBQyxlQUFHLENBQUMsQ0FBQztBQUVmLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtJQUN4QixrQkFBTSxFQUFFLENBQUM7QUFDWCxDQUFDLENBQUMsQ0FBQyJ9