"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const router_1 = require("./router");
const urllib_1 = require("urllib");
const _ = require("lodash");
// import * as Proxy from 'koa-proxy';
const server = new Koa();
// server.use(Proxy({
//   host: 'http://localhost:5001',
//   match: /^\/static\//
// }))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUEyQjtBQUMzQixxQ0FBNkM7QUFDN0MsbUNBQWlDO0FBQ2pDLDRCQUE0QjtBQUM1QixzQ0FBc0M7QUFFdEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN6QixxQkFBcUI7QUFDckIsbUNBQW1DO0FBQ25DLHlCQUF5QjtBQUN6QixNQUFNO0FBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7QUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQzdCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxNQUFNLFdBQVcsR0FBRyx3QkFBd0IsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZELE1BQU0sSUFBSSxHQUFHLE1BQU0sZ0JBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4QyxNQUFNLE9BQU8sR0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM1QyxHQUFHLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsTUFBTSxJQUFJLENBQUM7QUFDYixDQUFDLENBQUMsQ0FBQztBQUVILGtCQUFlLE1BQU0sQ0FBQyJ9