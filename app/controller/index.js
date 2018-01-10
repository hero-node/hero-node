"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class IndexController extends egg_1.Controller {
    async welcome() {
        this.ctx.body = 'Welcome to Hero Node!';
    }
    async generateQrImg() {
        const payload = this.ctx.query;
        const imgStream = this.ctx.service.misc.qr.genImgByText(payload);
    }
}
exports.default = IndexController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBaUM7QUFFakMscUJBQXFDLFNBQVEsZ0JBQVU7SUFDOUMsS0FBSyxDQUFDLE9BQU87UUFDbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsdUJBQXVCLENBQUM7SUFDMUMsQ0FBQztJQUVNLEtBQUssQ0FBQyxhQUFhO1FBQ3hCLE1BQU0sT0FBTyxHQUFXLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBZSxDQUFDO1FBQ2pELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FDRjtBQVRELGtDQVNDIn0=