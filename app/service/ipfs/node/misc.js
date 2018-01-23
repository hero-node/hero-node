"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const IPFS = require("ipfs-api");
const util_1 = require("util");
class IpfsNodeMiscService extends egg_1.Service {
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
    async getId() {
        const getIpfsIdAsync = util_1.promisify(this.ipfs.id);
        try {
            const identity = getIpfsIdAsync();
            this.ctx.logger.debug(identity);
            return identity;
        }
        catch (err) {
            this.ctx.logger.warn(err);
            return null;
        }
    }
    async getVersion() {
        const getIpfsVersion = util_1.promisify(this.ipfs.version);
        try {
            const version = getIpfsVersion();
            this.ctx.logger.debug(version);
            return version;
        }
        catch (err) {
            this.ctx.logger.warn(err);
            return null;
        }
    }
    async getDns() {
        const getIpfsDns = util_1.promisify(this.ipfs.dns);
        try {
            const dns = getIpfsDns();
            this.ctx.logger.debug(dns);
            return dns;
        }
        catch (err) {
            this.ctx.logger.warn(err);
            return null;
        }
    }
}
exports.IpfsNodeMiscService = IpfsNodeMiscService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzYy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjLyIsInNvdXJjZXMiOlsic2VydmljZS9pcGZzL25vZGUvbWlzYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUF1QztBQUN2QyxpQ0FBaUM7QUFDakMsK0JBQWlDO0FBUWpDLHlCQUFpQyxTQUFRLGFBQU87SUFJOUMsWUFBWSxHQUFZO1FBQ3RCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTtnQkFDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7Z0JBQzNCLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO2FBQ3BDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUFDLEtBQUs7UUFDaEIsTUFBTSxjQUFjLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFHLGNBQWMsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2xCLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVO1FBQ3JCLE1BQU0sY0FBYyxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUM7WUFDSCxNQUFNLE9BQU8sR0FBRyxjQUFjLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQixDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTTtRQUNqQixNQUFNLFVBQVUsR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDO1lBQ0gsTUFBTSxHQUFHLEdBQUcsVUFBVSxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDYixDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7Q0FDRjtBQWxERCxrREFrREMifQ==