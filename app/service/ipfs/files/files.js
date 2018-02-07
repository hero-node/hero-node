"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const IPFS = require("ipfs-api");
const util_1 = require("util");
class IpfsNetworkBootstrapService extends egg_1.Service {
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
    async add(data, options) {
        try {
            const addSync = util_1.promisify(this.ipfs.files.files.add);
            const res = await addSync(data, options);
            this.ctx.logger.debug(res);
            return res;
        }
        catch (err) {
            this.ctx.logger.warn(err);
            return;
        }
    }
    async cat(path) {
        try {
            const catSync = util_1.promisify(this.ipfs.files.files.cat);
            const res = await catSync(path);
            this.ctx.logger.debug(res);
            return res;
        }
        catch (err) {
            this.ctx.logger.warn(err);
            return;
        }
    }
    async get(path) {
        try {
            const getAsync = util_1.promisify(this.ipfs.files.files.get);
            const res = await getAsync(path);
            this.ctx.logger.debug(res);
            return res;
        }
        catch (err) {
            this.ctx.logger.warn(err);
            return;
        }
    }
}
exports.default = IpfsNetworkBootstrapService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMuanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZpY2UvaXBmcy9maWxlcy9maWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUF1QztBQUN2QyxpQ0FBaUM7QUFDakMsK0JBQWlDO0FBUWpDLGlDQUFpRCxTQUFRLGFBQU87SUFHOUQsWUFBWSxHQUFZO1FBQ3RCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTtnQkFDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7Z0JBQzNCLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO2FBQ3BDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBUTtRQUM3QixJQUFJLENBQUM7WUFDSCxNQUFNLE9BQU8sR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRCxNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDYixDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUM7UUFDVCxDQUFDO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSTtRQUNuQixJQUFJLENBQUM7WUFDSCxNQUFNLE9BQU8sR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRCxNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNiLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQztRQUNULENBQUM7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJO1FBQ25CLElBQUksQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sR0FBRyxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2IsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztJQUNILENBQUM7Q0FDRjtBQWpERCw4Q0FpREMifQ==