"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
// import * as bodyparser from 'koa-bodyparser';
const body = require("koa-better-body");
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
// server.use(bodyparser());
server.use(router_1.default.routes());
server.use(router_1.default.allowedMethods());
server.use(router_1.default.middleware());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUEyQjtBQUMzQixnREFBZ0Q7QUFDaEQsd0NBQXdDO0FBQ3hDLHFDQUE2QztBQUM3QyxtQ0FBaUM7QUFDakMsNEJBQTRCO0FBQzVCLHNDQUFzQztBQUV0QyxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLHFCQUFxQjtBQUNyQixtQ0FBbUM7QUFDbkMseUJBQXlCO0FBQ3pCLE1BQU07QUFDTixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDbkIsNEJBQTRCO0FBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQ2hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUM3QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsTUFBTSxXQUFXLEdBQUcsd0JBQXdCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2RCxNQUFNLElBQUksR0FBRyxNQUFNLGdCQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEMsTUFBTSxPQUFPLEdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUMsR0FBRyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUNELE1BQU0sSUFBSSxDQUFDO0FBQ2IsQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBZSxNQUFNLENBQUMifQ==