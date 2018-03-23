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
server.use(async (ctx, next) => {
    if (ctx.path.startsWith('/ipfs')) {
        const ipfsFileUrl = `http://localhost:8080${ctx.path}`;
        const resp = await urllib_1.request(ipfsFileUrl);
        const rawFile = _.get(resp, 'data');
        ctx.body = rawFile.toString();
    }
    else if (ctx.path.startsWith('/ethzeus')) {
        const ethWeb3ApiUrl = `http://106.14.187.240:9002`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUEyQjtBQUMzQixnREFBZ0Q7QUFDaEQsd0NBQXdDO0FBQ3hDLHFDQUE2QztBQUM3QyxtQ0FBaUQ7QUFDakQsNEJBQTRCO0FBQzVCLHNDQUFzQztBQUV0QyxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLHFCQUFxQjtBQUNyQixtQ0FBbUM7QUFDbkMseUJBQXlCO0FBQ3pCLE1BQU07QUFFTixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFFbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQzdCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxNQUFNLFdBQVcsR0FBRyx3QkFBd0IsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZELE1BQU0sSUFBSSxHQUFHLE1BQU0sZ0JBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4QyxNQUFNLE9BQU8sR0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM1QyxHQUFHLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxNQUFNLGFBQWEsR0FBRyw0QkFBNEIsQ0FBQztRQUNuRCxNQUFNLE9BQU8sR0FBbUI7WUFDOUIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO1lBQ2xCLFdBQVcsRUFBRSxNQUFNO1lBQ25CLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU07U0FDekIsQ0FBQztRQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sZ0JBQU8sQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkQsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDRCxNQUFNLElBQUksQ0FBQztBQUNiLENBQUMsQ0FBQyxDQUFDO0FBRUgsNEJBQTRCO0FBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBRWhDLGtCQUFlLE1BQU0sQ0FBQyJ9