"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class FileController extends egg_1.Controller {
    async upload() {
        this.app.logger.info('update mocker');
        this.ctx.body = '1';
    }
    async list() {
        this.ctx.body = '12313';
    }
}
exports.default = FileController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMuanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvZmlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBaUM7QUFFakMsb0JBQW9DLFNBQVEsZ0JBQVU7SUFDN0MsS0FBSyxDQUFDLE1BQU07UUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUN0QixDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUk7UUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7SUFDMUIsQ0FBQztDQUNGO0FBVEQsaUNBU0MifQ==