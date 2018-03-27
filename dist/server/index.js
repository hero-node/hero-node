"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const Koa = require("koa");
const body = require("koa-better-body");
const cors = require("kcors");
const view = require("koa-view");
const kstatic = require("koa-static");
const router_1 = require("./router");
const urllib_1 = require("urllib");
const _ = require("lodash");
const logger_1 = require("../utils/logger");
// import * as Proxy from 'koa-proxy';
const MAX_TIMEOUT = 3000000;
const logger = logger_1.LoggerFactory.getLabeledInstance('server');
const server = new Koa();
// server.use(Proxy({
//   host: 'http://localhost:5001',
//   match: /^\/static\//
// }))
server.use(body());
server.use(cors());
server.use(view(path_1.join(__dirname, '../..', '/public/views')));
server.use(kstatic(path_1.join(__dirname, '../..', '/public/assets')));
// server.use(bodyparser());
server.use(router_1.default.routes());
server.use(router_1.default.allowedMethods());
server.use(router_1.default.middleware());
server.use(async (ctx, next) => {
    if (ctx.path.startsWith('/ipfsapi')) {
        const handledPath = ctx.path.replace('/ipfsapi', '');
        const query = ctx.querystring;
        const ipfsApiUrl = `http://localhost:5001${handledPath}?${query}`;
        logger.info(`proxy to ipfs:5001 with ${ipfsApiUrl}`);
        const resp = await urllib_1.request(ipfsApiUrl, { timeout: MAX_TIMEOUT });
        const data = _.get(resp, 'data').toString();
        ctx.body = data;
    }
    else if (ctx.path.startsWith('/ipfs')) {
        const ipfsFileUrl = `http://localhost:8080${ctx.path}`;
        logger.info(`proxy to ipfs:8080 with ${ipfsFileUrl}`);
        const resp = await urllib_1.request(ipfsFileUrl, { timeout: MAX_TIMEOUT });
        const rawFile = _.get(resp, 'data');
        ctx.body = rawFile.toString();
    }
    else if (ctx.path.startsWith('/ethzeus')) {
        const ethWeb3ApiUrl = `http://localhost:9002`;
        const options = {
            method: ctx.method,
            contentType: 'json',
            data: ctx.request.fields,
        };
        const resp = await urllib_1.request(ethWeb3ApiUrl, options);
        const data = _.get(resp, 'data').toString();
        ctx.body = JSON.parse(data);
    }
    await next;
});
exports.default = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUE0QjtBQUM1QiwyQkFBMkI7QUFDM0Isd0NBQXdDO0FBQ3hDLDhCQUE4QjtBQUM5QixpQ0FBaUM7QUFDakMsc0NBQXNDO0FBQ3RDLHFDQUE2QztBQUM3QyxtQ0FBaUQ7QUFDakQsNEJBQTRCO0FBQzVCLDRDQUFnRDtBQUNoRCxzQ0FBc0M7QUFFdEMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDO0FBQzVCLE1BQU0sTUFBTSxHQUFHLHNCQUFhLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN6QixxQkFBcUI7QUFDckIsbUNBQW1DO0FBQ25DLHlCQUF5QjtBQUN6QixNQUFNO0FBRU4sTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNuQixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFaEUsNEJBQTRCO0FBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUM3QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDOUIsTUFBTSxVQUFVLEdBQUcsd0JBQXdCLFdBQVcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sSUFBSSxHQUFHLE1BQU0sZ0JBQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNqRSxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxNQUFNLFdBQVcsR0FBRyx3QkFBd0IsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDdEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxnQkFBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sT0FBTyxHQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sYUFBYSxHQUFHLHVCQUF1QixDQUFDO1FBQzlDLE1BQU0sT0FBTyxHQUFtQjtZQUM5QixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07WUFDbEIsV0FBVyxFQUFFLE1BQU07WUFDbkIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTTtTQUN6QixDQUFDO1FBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxnQkFBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuRCxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNELE1BQU0sSUFBSSxDQUFDO0FBQ2IsQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBZSxNQUFNLENBQUMifQ==