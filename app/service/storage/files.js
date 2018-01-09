"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const IPFS = require("ipfs-api");
const _ = require("lodash");
class FileService extends egg_1.Service {
    // private peers: string[];
    constructor(ctx) {
        super(ctx);
        this.ipfs = IPFS({
            host: 'localhost',
            port: '25001',
            protocol: 'http',
        });
    }
    async getTopPeers(count) {
        const allPeers = await this.getAvailablePeers();
        const sortedPeerList = _.sortBy(allPeers, (peerInfo) => {
            const latencyStr = peerInfo.latency;
            let latency;
            if (_.endsWith(latencyStr, 'ms')) {
                latency = +_.join(_.slice(latencyStr, 0, latencyStr.length - 2), '');
            }
            else if (_.endsWith(latencyStr, 's')) {
                latency =
                    +_.join(_.slice(latencyStr, 0, latencyStr.length - 1), '') * 1000;
            }
            else {
                latency = Infinity;
            }
            return latency;
        });
        if (count <= 0) {
            count = sortedPeerList.length;
        }
        const formatedPeersList = _.map(_.slice(sortedPeerList, 0, count), (peerInfo) => {
            return this.formatPeerInfo(peerInfo.addr);
        });
        return formatedPeersList;
    }
    formatPeerInfo(peerInfo) {
        const infoArr = _.split(peerInfo.toString(), '/');
        const formated = {
            ipType: infoArr[1],
            protocol: infoArr[3],
            ip: infoArr[2],
            port: +infoArr[4],
        };
        return formated;
    }
    async getAvailablePeers() {
        const peerInfos = await this.ipfs.swarm.peers({
            verbose: true,
        });
        return peerInfos;
    }
}
exports.default = FileService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMuanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZpY2Uvc3RvcmFnZS9maWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUF1QztBQUN2QyxpQ0FBaUM7QUFDakMsNEJBQTRCO0FBVzVCLGlCQUFpQyxTQUFRLGFBQU87SUFFOUMsMkJBQTJCO0lBRTNCLFlBQVksR0FBWTtRQUN0QixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNmLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxPQUFPO1lBQ2IsUUFBUSxFQUFFLE1BQU07U0FDakIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBYztRQUNyQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ2hELE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBZSxFQUFFLEVBQUU7WUFDNUQsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNwQyxJQUFJLE9BQU8sQ0FBQztZQUNaLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2RSxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsT0FBTztvQkFDTCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3RFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLEdBQUcsUUFBUSxDQUFDO1lBQ3JCLENBQUM7WUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixLQUFLLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztRQUNoQyxDQUFDO1FBQ0QsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUM3QixDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQ2pDLENBQUMsUUFBZSxFQUFFLEVBQUU7WUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FDRixDQUFDO1FBQ0YsTUFBTSxDQUFDLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7SUFFTyxjQUFjLENBQUMsUUFBZ0I7UUFDckMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbEQsTUFBTSxRQUFRLEdBQUc7WUFDZixNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNsQixRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNwQixFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDbEIsQ0FBQztRQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVPLEtBQUssQ0FBQyxpQkFBaUI7UUFDN0IsTUFBTSxTQUFTLEdBQVksTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDckQsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ25CLENBQUM7Q0FDRjtBQXpERCw4QkF5REMifQ==