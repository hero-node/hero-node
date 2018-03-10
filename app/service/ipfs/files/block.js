"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const IPFS = require("ipfs-api");
const util_1 = require("util");
class IpfsFilesBlockService extends egg_1.Service {
    constructor(ctx) {
        super(ctx);
        if (!this.ctx.service.ipfs) {
            this.ipfs = IPFS({
                host: this.config.ipfs.host,
                port: this.config.ipfs.port,
                protocol: this.config.ipfs.protocol,
            });
        }
    }
    async get(cid) {
        try {
            const getSync = util_1.promisify(this.ipfs.blcok.get);
            const res = await getSync(cid);
            this.ctx.logger.debug(res);
            return res;
        }
        catch (err) {
            this.ctx.logger.warn(err);
            return;
        }
    }
    async put(block, options) {
        try {
            const putSync = util_1.promisify(this.ipfs.blcok.put);
            const res = await putSync(block, options);
            this.ctx.logger.debug(res);
            return res;
        }
        catch (err) {
            this.ctx.logger.warn(err);
            return;
        }
    }
    async stat(cid) {
        try {
            const statSync = util_1.promisify(this.ipfs.blcok.stat);
            const res = await statSync(cid);
            this.ctx.logger.debug(res);
            return res;
        }
        catch (err) {
            this.ctx.logger.warn(err);
            return;
        }
    }
}
exports.default = IpfsFilesBlockService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2suanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZpY2UvaXBmcy9maWxlcy9ibG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUF1QztBQUN2QyxpQ0FBaUM7QUFDakMsK0JBQWlDO0FBUWpDLDJCQUEyQyxTQUFRLGFBQU87SUFHeEQsWUFBWSxHQUFZO1FBQ3RCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTtnQkFDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7Z0JBQzNCLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO2FBQ3BDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHO1FBQ2xCLElBQUksQ0FBQztZQUNILE1BQU0sT0FBTyxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0MsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDYixDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUM7UUFDVCxDQUFDO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQVE7UUFDOUIsSUFBSSxDQUFDO1lBQ0gsTUFBTSxPQUFPLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQyxNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDYixDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUM7UUFDVCxDQUFDO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRztRQUNuQixJQUFJLENBQUM7WUFDSCxNQUFNLFFBQVEsR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELE1BQU0sR0FBRyxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2IsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztJQUNILENBQUM7Q0FDRjtBQWpERCx3Q0FpREMifQ==