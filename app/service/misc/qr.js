"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const qr = require("qr-image");
class QRService extends egg_1.Service {
    constructor(ctx) {
        super(ctx);
    }
    genImgByText(text, options) {
        return qr.image(text, options);
    }
}
exports.default = QRService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXIuanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZpY2UvbWlzYy9xci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUF1QztBQUN2QywrQkFBK0I7QUFFL0IsZUFBK0IsU0FBUSxhQUFPO0lBQzVDLFlBQVksR0FBWTtRQUN0QixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRU0sWUFBWSxDQUNqQixJQUFZLEVBQ1osT0FBOEM7UUFFOUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Q0FDRjtBQVhELDRCQVdDIn0=