"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const router_1 = require("./router");
const urllib_1 = require("urllib");
const _ = require("lodash");
// import * as Proxy from 'koa-proxy';
const server = new Koa();
// server.use(Proxy({
//   host: 'http://localhost:5001',
//   match: /^\/static\//
// }))
server.use(bodyparser());
server.use(router_1.default.routes());
server.use(router_1.default.allowedMethods());
server.use(async (ctx, next) => {
    if (ctx.path.startsWith('/ipfs')) {
        const ipfsFileUrl = `http://localhost:8080${ctx.path}`;
        const resp = await urllib_1.request(ipfsFileUrl);
        const rawFile = _.get(resp, 'data');
        ctx.body = rawFile.toString();
    }
    await next;
});
exports.default = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUEyQjtBQUMzQiw2Q0FBNkM7QUFDN0MscUNBQTZDO0FBQzdDLG1DQUFpQztBQUNqQyw0QkFBNEI7QUFDNUIsc0NBQXNDO0FBRXRDLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDekIscUJBQXFCO0FBQ3JCLG1DQUFtQztBQUNuQyx5QkFBeUI7QUFDekIsTUFBTTtBQUNOLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztBQUN6QixNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDN0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sV0FBVyxHQUFHLHdCQUF3QixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkQsTUFBTSxJQUFJLEdBQUcsTUFBTSxnQkFBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sT0FBTyxHQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFDRCxNQUFNLElBQUksQ0FBQztBQUNiLENBQUMsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsTUFBTSxDQUFDIn0=