"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const _ = require("lodash");
class FileController extends egg_1.Controller {
    constructor() {
        super(...arguments);
        this.DEFAULT_PEER_COUNT = 10;
    }
    async uploadFile() {
        const stream = await this.ctx.getFileStream();
        const result = await this.ctx.service.storage.files.upload(stream);
        this.ctx.body = result;
    }
    async uploadRaw() {
        const body = this.ctx.request.body;
        const content = _.get(body, 'content');
        if (!content) {
            this.ctx.logger.warn('body content is empty!');
            this.ctx.status = 500;
            this.ctx.body = 'please make sure content field is not empty';
            return;
        }
        this.ctx.logger.info(`uploading content: ${content}`);
        const resp = await this.service.storage.files.upload(Buffer.from(content));
        this.ctx.body = resp;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMuanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvZmlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBaUM7QUFDakMsNEJBQTRCO0FBUzVCLG9CQUFvQyxTQUFRLGdCQUFVO0lBQXREOztRQUVVLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztJQWdDbEMsQ0FBQztJQTlCUSxLQUFLLENBQUMsVUFBVTtRQUNyQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDOUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVNLEtBQUssQ0FBQyxTQUFTO1FBQ3BCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNuQyxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsNkNBQTZDLENBQUM7WUFDOUQsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN0RCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRU0sS0FBSyxDQUFDLFlBQVk7UUFDdkIsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FDaEUsSUFBSSxDQUFDLGtCQUFrQixDQUN4QixDQUFDO1FBQ0YsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFlLEVBQUUsRUFBRTtZQUNyRCxpQ0FBaUM7WUFDakMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFsQ0QsaUNBa0NDIn0=