"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Program = require("commander");
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
Program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXFDO0FBQ3JDLGlEQUF5RDtBQUN6RCwyQ0FBdUQ7QUFFdkQsTUFBTSxPQUFPLEdBQUcsbUJBQVMsRUFBRSxDQUFDO0FBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQztBQUU1QyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztLQUMxQixXQUFXLENBQUMsNEJBQTRCLENBQUM7S0FDekMsTUFBTSxDQUFDLGVBQUcsQ0FBQyxDQUFDO0FBRWYsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7S0FFN0IsV0FBVyxDQUFDLHVCQUF1QixDQUFDO0tBQ3BDLE1BQU0sQ0FBQyxrQkFBTSxDQUFDLENBQUM7QUFFbEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7S0FDbkIsV0FBVyxDQUFDLDJCQUEyQixDQUFDO0tBQ3hDLE1BQU0sQ0FBQyxlQUFHLENBQUMsQ0FBQztBQUVmLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtJQUN4QixrQkFBTSxFQUFFLENBQUM7QUFDWCxDQUFDLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDIn0=