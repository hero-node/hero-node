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
        const ipfsApiUrl = `http://localhost:5001${handledPath}`;
        logger.info(`proxy to ipfs:5001 with ${ipfsApiUrl}`);
        const resp = await urllib_1.request(ipfsApiUrl);
        const data = _.get(resp, 'data').toString();
        ctx.body = data;
    }
    else if (ctx.path.startsWith('/ipfs')) {
        const ipfsFileUrl = `http://localhost:8080${ctx.path}`;
        logger.info(`proxy to ipfs:8080 with ${ipfsFileUrl}`);
        const resp = await urllib_1.request(ipfsFileUrl);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUEyQjtBQUMzQixnREFBZ0Q7QUFDaEQsd0NBQXdDO0FBQ3hDLDhCQUE4QjtBQUM5QixxQ0FBNkM7QUFDN0MsbUNBQWlEO0FBQ2pELDRCQUE0QjtBQUM1Qiw0Q0FBZ0Q7QUFDaEQsc0NBQXNDO0FBRXRDLE1BQU0sTUFBTSxHQUFHLHNCQUFhLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ25FLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDekIscUJBQXFCO0FBQ3JCLG1DQUFtQztBQUNuQyx5QkFBeUI7QUFDekIsTUFBTTtBQUVOLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNuQixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFFbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQzdCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckQsTUFBTSxVQUFVLEdBQUcsd0JBQXdCLFdBQVcsRUFBRSxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDckQsTUFBTSxJQUFJLEdBQUcsTUFBTSxnQkFBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sV0FBVyxHQUFHLHdCQUF3QixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkQsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUN0RCxNQUFNLElBQUksR0FBRyxNQUFNLGdCQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEMsTUFBTSxPQUFPLEdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUMsR0FBRyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsTUFBTSxhQUFhLEdBQUcsdUJBQXVCLENBQUM7UUFDOUMsTUFBTSxPQUFPLEdBQW1CO1lBQzlCLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtZQUNsQixXQUFXLEVBQUUsTUFBTTtZQUNuQixJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNO1NBQ3pCLENBQUM7UUFDRixNQUFNLElBQUksR0FBRyxNQUFNLGdCQUFPLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0QsTUFBTSxJQUFJLENBQUM7QUFDYixDQUFDLENBQUMsQ0FBQztBQUVILDRCQUE0QjtBQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztBQUVoQyxrQkFBZSxNQUFNLENBQUMifQ==