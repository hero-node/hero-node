"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const Koa = require("koa");
const body = require("koa-better-body");
const cors = require("kcors");
const view = require("koa-view");
const kstatic = require("koa-static");
const proxy_1 = require("./proxy");
const router_1 = require("./router");
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
// server.use(async (ctx, next) => {
//   if (ctx.path.startsWith('/ipfsapi')) {
//     const handledPath = ctx.path.replace('/ipfsapi', '');
//     const query = ctx.querystring;
//     const ipfsApiUrl = `http://localhost:5001${handledPath}?${query}`;
//     logger.info(`proxy to ipfs:5001 with ${ipfsApiUrl}`);
//     const resp = await request(ipfsApiUrl, { timeout: MAX_TIMEOUT });
//     const data = _.get(resp, 'data').toString();
//     ctx.body = data;
//     // } else if (ctx.path.startsWith('/ipfs')) {
//     //   const ipfsFileUrl = `http://localhost:8080${ctx.path}`;
//     //   logger.info(`proxy to ipfs:8080 with ${ipfsFileUrl}`);
//     //   const resp = await request(ipfsFileUrl, {
//     //     headers: ctx.request.headers,
//     //     timeout: MAX_TIMEOUT,
//     //   });
//     //   const rawFile: Buffer = _.get(resp, 'data');
//     //   ctx.set(resp.headers);
//     //   ctx.body = rawFile.toString();
//   } else if (ctx.path.startsWith('/ethzeus')) {
//     const ethWeb3ApiUrl = `http://localhost:9002`;
//     const options: RequestOptions = {
//       method: ctx.method,
//       contentType: 'json',
//       data: ctx.request.fields,
//     };
//     const resp = await request(ethWeb3ApiUrl, options);
//     const data = _.get(resp, 'data').toString();
//     ctx.body = JSON.parse(data);
//   }
//   await next;
// });
server.use(proxy_1.default('/_/ipfs/files', {
    target: 'http://localhost:8080',
    rewrite: path => path.replace(/\/_\/ipfs\/files/, '/ipfs'),
}));
server.use(proxy_1.default('/_/ipfs/api', {
    target: 'http://localhost:5001',
    rewrite: path => path.replace(/\/_\/ipfs\/api/, '/'),
}));
exports.default = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUE0QjtBQUM1QiwyQkFBMkI7QUFDM0Isd0NBQXdDO0FBQ3hDLDhCQUE4QjtBQUM5QixpQ0FBaUM7QUFDakMsc0NBQXNDO0FBQ3RDLG1DQUEyQztBQUMzQyxxQ0FBNkM7QUFHN0MsNENBQWdEO0FBRWhELHNDQUFzQztBQUV0QyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUM7QUFDNUIsTUFBTSxNQUFNLEdBQUcsc0JBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxRCxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLHFCQUFxQjtBQUNyQixtQ0FBbUM7QUFDbkMseUJBQXlCO0FBQ3pCLE1BQU07QUFFTixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1RCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUVoRSw0QkFBNEI7QUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7QUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFFaEMsb0NBQW9DO0FBQ3BDLDJDQUEyQztBQUMzQyw0REFBNEQ7QUFDNUQscUNBQXFDO0FBQ3JDLHlFQUF5RTtBQUN6RSw0REFBNEQ7QUFDNUQsd0VBQXdFO0FBQ3hFLG1EQUFtRDtBQUNuRCx1QkFBdUI7QUFDdkIsb0RBQW9EO0FBQ3BELG1FQUFtRTtBQUNuRSxrRUFBa0U7QUFDbEUscURBQXFEO0FBQ3JELDJDQUEyQztBQUMzQyxtQ0FBbUM7QUFDbkMsZUFBZTtBQUNmLHdEQUF3RDtBQUN4RCxrQ0FBa0M7QUFDbEMsMENBQTBDO0FBQzFDLGtEQUFrRDtBQUNsRCxxREFBcUQ7QUFDckQsd0NBQXdDO0FBQ3hDLDRCQUE0QjtBQUM1Qiw2QkFBNkI7QUFDN0Isa0NBQWtDO0FBQ2xDLFNBQVM7QUFDVCwwREFBMEQ7QUFDMUQsbURBQW1EO0FBQ25ELG1DQUFtQztBQUNuQyxNQUFNO0FBQ04sZ0JBQWdCO0FBQ2hCLE1BQU07QUFDTixNQUFNLENBQUMsR0FBRyxDQUNSLGVBQUssQ0FBQyxlQUFlLEVBQUU7SUFDckIsTUFBTSxFQUFFLHVCQUF1QjtJQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQztDQUMzRCxDQUFDLENBQ0gsQ0FBQztBQUNGLE1BQU0sQ0FBQyxHQUFHLENBQ1IsZUFBSyxDQUFDLGFBQWEsRUFBRTtJQUNuQixNQUFNLEVBQUUsdUJBQXVCO0lBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDO0NBQ3JELENBQUMsQ0FDSCxDQUFDO0FBRUYsa0JBQWUsTUFBTSxDQUFDIn0=