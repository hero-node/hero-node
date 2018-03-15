"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Program = require("commander");
exports.Program = Program;
const pkgReader_1 = require("./utils/pkgReader");
const processor_1 = require("./processor");
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
    .action(processor_1.run);
Program.on('--help', () => {
    processor_1.helper();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXFDO0FBd0I1QiwwQkFBTztBQXZCaEIsaURBQXlEO0FBQ3pELDJDQUF1RDtBQUV2RCxNQUFNLE9BQU8sR0FBRyxtQkFBUyxFQUFFLENBQUM7QUFDNUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDO0FBRTVDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO0tBQzFCLFdBQVcsQ0FBQyw0QkFBNEIsQ0FBQztLQUN6QyxNQUFNLENBQUMsZUFBRyxDQUFDLENBQUM7QUFFZixPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQztLQUU3QixXQUFXLENBQUMsdUJBQXVCLENBQUM7S0FDcEMsTUFBTSxDQUFDLGtCQUFNLENBQUMsQ0FBQztBQUVsQixPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztLQUNuQixXQUFXLENBQUMsMkJBQTJCLENBQUM7S0FDeEMsTUFBTSxDQUFDLGVBQUcsQ0FBQyxDQUFDO0FBRWYsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO0lBQ3hCLGtCQUFNLEVBQUUsQ0FBQztBQUNYLENBQUMsQ0FBQyxDQUFDIn0=