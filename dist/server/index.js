"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
// import * as bodyparser from 'koa-bodyparser';
const body = require("koa-better-body");
const cors = require("kcors");
const router_1 = require("./router");
const urllib_1 = require("urllib");
const _ = require("lodash");
// import * as Proxy from 'koa-proxy';
const server = new Koa();
// server.use(Proxy({
//   host: 'http://localhost:5001',
//   match: /^\/static\//
// }))
server.use(body());
server.use(cors());
server.use(async (ctx, next) => {
    if (ctx.path.startsWith('/ipfs')) {
        const ipfsFileUrl = `http://localhost:8080${ctx.path}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUEyQjtBQUMzQixnREFBZ0Q7QUFDaEQsd0NBQXdDO0FBQ3hDLDhCQUE4QjtBQUM5QixxQ0FBNkM7QUFDN0MsbUNBQWlEO0FBQ2pELDRCQUE0QjtBQUM1QixzQ0FBc0M7QUFFdEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN6QixxQkFBcUI7QUFDckIsbUNBQW1DO0FBQ25DLHlCQUF5QjtBQUN6QixNQUFNO0FBRU4sTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUVuQixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDN0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sV0FBVyxHQUFHLHdCQUF3QixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkQsTUFBTSxJQUFJLEdBQUcsTUFBTSxnQkFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sT0FBTyxHQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sYUFBYSxHQUFHLHVCQUF1QixDQUFDO1FBQzlDLE1BQU0sT0FBTyxHQUFtQjtZQUM5QixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07WUFDbEIsV0FBVyxFQUFFLE1BQU07WUFDbkIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTTtTQUN6QixDQUFDO1FBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxnQkFBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuRCxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNELE1BQU0sSUFBSSxDQUFDO0FBQ2IsQ0FBQyxDQUFDLENBQUM7QUFFSCw0QkFBNEI7QUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7QUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFFaEMsa0JBQWUsTUFBTSxDQUFDIn0=