"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
// import * as bodyparser from 'koa-bodyparser';
const body = require("koa-better-body");
const cors = require("kcors");
const router_1 = require("./router");
const urllib_1 = require("urllib");
const _ = require("lodash");
const logger_1 = require("../utils/logger");
// import * as Proxy from 'koa-proxy';
const MAX_TIMEOUT = 300000;
const logger = logger_1.LoggerFactory.getLabeledInstance('server', 'index');
const server = new Koa();
// server.use(Proxy({
//   host: 'http://localhost:5001',
//   match: /^\/static\//
// }))
server.use(body());
server.use(cors());
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
// server.use(bodyparser());
server.use(router_1.default.routes());
server.use(router_1.default.allowedMethods());
server.use(router_1.default.middleware());
exports.default = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUEyQjtBQUMzQixnREFBZ0Q7QUFDaEQsd0NBQXdDO0FBQ3hDLDhCQUE4QjtBQUM5QixxQ0FBNkM7QUFDN0MsbUNBQWlEO0FBQ2pELDRCQUE0QjtBQUM1Qiw0Q0FBZ0Q7QUFDaEQsc0NBQXNDO0FBRXRDLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQztBQUMzQixNQUFNLE1BQU0sR0FBRyxzQkFBYSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNuRSxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLHFCQUFxQjtBQUNyQixtQ0FBbUM7QUFDbkMseUJBQXlCO0FBQ3pCLE1BQU07QUFFTixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRW5CLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUM3QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDOUIsTUFBTSxVQUFVLEdBQUcsd0JBQXdCLFdBQVcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sSUFBSSxHQUFHLE1BQU0sZ0JBQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNqRSxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxNQUFNLFdBQVcsR0FBRyx3QkFBd0IsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDdEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxnQkFBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sT0FBTyxHQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sYUFBYSxHQUFHLHVCQUF1QixDQUFDO1FBQzlDLE1BQU0sT0FBTyxHQUFtQjtZQUM5QixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07WUFDbEIsV0FBVyxFQUFFLE1BQU07WUFDbkIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTTtTQUN6QixDQUFDO1FBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxnQkFBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuRCxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNELE1BQU0sSUFBSSxDQUFDO0FBQ2IsQ0FBQyxDQUFDLENBQUM7QUFFSCw0QkFBNEI7QUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7QUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFFaEMsa0JBQWUsTUFBTSxDQUFDIn0=