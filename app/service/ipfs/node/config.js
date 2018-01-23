"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const IPFS = require("ipfs-api");
const util_1 = require("util");
class IpfsNodeConfigService extends egg_1.Service {
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
    async get(key) {
        const getConfigAsync = util_1.promisify(this.ipfs.config.get);
        try {
            const val = getConfigAsync(key);
            this.ctx.logger.debug(val);
            return val;
        }
        catch (err) {
            this.ctx.logger.warn(err);
            return null;
        }
    }
    async set(key, value) {
        const setConfigAsync = util_1.promisify(this.ipfs.config.set);
        try {
            const result = setConfigAsync(key, value);
            this.ctx.logger.debug(result);
            return result;
        }
        catch (err) {
            this.ctx.logger.warn(err);
            return null;
        }
    }
}
exports.default = IpfsNodeConfigService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIiwic291cmNlcyI6WyJzZXJ2aWNlL2lwZnMvbm9kZS9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBdUM7QUFDdkMsaUNBQWlDO0FBQ2pDLCtCQUFpQztBQU9qQywyQkFBMkMsU0FBUSxhQUFPO0lBR3hELFlBQVksR0FBWTtRQUN0QixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7Z0JBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO2dCQUMzQixRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUTthQUNwQyxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBVztRQUMxQixNQUFNLGNBQWMsR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQztZQUNILE1BQU0sR0FBRyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNiLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBVyxFQUFFLEtBQVU7UUFDdEMsTUFBTSxjQUFjLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUM7WUFDSCxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBckNELHdDQXFDQyJ9