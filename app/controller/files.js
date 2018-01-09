"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const _ = require("lodash");
class FileController extends egg_1.Controller {
    constructor() {
        super(...arguments);
        this.DEFAULT_PEER_COUNT = 10;
    }
    async upload() {
        this.app.logger.info('update mocker');
        this.ctx.body = '1';
    }
    async getNodesList() {
        const peersList = await this.ctx.service.storage.files.getTopPeers(this.DEFAULT_PEER_COUNT);
        const addrsList = _.map(peersList, (peerInfo) => {
            // TODO: some handler on raw data
            return peerInfo;
        });
        this.ctx.body = addrsList;
    }
}
exports.default = FileController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMuanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvZmlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBaUM7QUFDakMsNEJBQTRCO0FBRzVCLG9CQUFvQyxTQUFRLGdCQUFVO0lBQXREOztRQUNVLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztJQWlCbEMsQ0FBQztJQWZRLEtBQUssQ0FBQyxNQUFNO1FBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDdEIsQ0FBQztJQUVNLEtBQUssQ0FBQyxZQUFZO1FBQ3ZCLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQ2hFLElBQUksQ0FBQyxrQkFBa0IsQ0FDeEIsQ0FBQztRQUNGLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBZSxFQUFFLEVBQUU7WUFDckQsaUNBQWlDO1lBQ2pDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBbEJELGlDQWtCQyJ9