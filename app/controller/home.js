"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class HomeController extends egg_1.Controller {
    async welcome() {
        this.ctx.body = 'Welcome to Hero Node!';
    }
    async generateQrImg() {
        const payload = this.ctx.query.payload;
        const imgStream = this.ctx.service.misc.qr.genImgByText(payload);
        this.ctx.set('Content-type', 'image/png');
        this.ctx.body = imgStream;
    }
}
exports.default = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9ob21lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQWlDO0FBT2pDLG9CQUFvQyxTQUFRLGdCQUFVO0lBQzdDLEtBQUssQ0FBQyxPQUFPO1FBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLHVCQUF1QixDQUFDO0lBQzFDLENBQUM7SUFFTSxLQUFLLENBQUMsYUFBYTtRQUN4QixNQUFNLE9BQU8sR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFpQixDQUFDO1FBQ3pELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBWEQsaUNBV0MifQ==