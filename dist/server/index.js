"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const Koa = require("koa");
const body = require("koa-better-body");
const cors = require("kcors");
const view = require("koa-view");
const kstatic = require("koa-static");
const convert = require("koa-convert");
const proxy_1 = require("./proxy");
const router_1 = require("./router");
const IPFS_FILE_ENDPOINT = process.env.IPFS_FILE_ENDPOINT || 'http://localhost:8080';
const IPFS_API_ENDPOINT = process.env.IPFS_API_ENDPOINT || 'http://localhost:5001';
const server = new Koa();
server.use(convert(body()));
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
// The proxy for ipfs files
server.use(proxy_1.default('/_/ipfs/files', {
    target: IPFS_FILE_ENDPOINT,
    rewrite: path => path.replace(/\/_\/ipfs\/files/, '/ipfs'),
    changeOrigin: true,
}));
// The proxy for ipfs api
server.use(proxy_1.default('/_/ipfs/api', {
    target: IPFS_API_ENDPOINT,
    rewrite: path => path.replace(/\/_\/ipfs\/api/, ''),
    changeOrigin: true,
}));
exports.default = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUE0QjtBQUM1QiwyQkFBMkI7QUFDM0Isd0NBQXdDO0FBQ3hDLDhCQUE4QjtBQUM5QixpQ0FBaUM7QUFDakMsc0NBQXNDO0FBQ3RDLHVDQUF1QztBQUN2QyxtQ0FBMkM7QUFDM0MscUNBQTZDO0FBRTdDLE1BQU0sa0JBQWtCLEdBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLElBQUksdUJBQXVCLENBQUM7QUFDNUQsTUFBTSxpQkFBaUIsR0FDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSx1QkFBdUIsQ0FBQztBQUMzRCxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRXpCLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRWhFLDRCQUE0QjtBQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztBQUVoQyxvQ0FBb0M7QUFDcEMsMkNBQTJDO0FBQzNDLDREQUE0RDtBQUM1RCxxQ0FBcUM7QUFDckMseUVBQXlFO0FBQ3pFLDREQUE0RDtBQUM1RCx3RUFBd0U7QUFDeEUsbURBQW1EO0FBQ25ELHVCQUF1QjtBQUN2QixvREFBb0Q7QUFDcEQsbUVBQW1FO0FBQ25FLGtFQUFrRTtBQUNsRSxxREFBcUQ7QUFDckQsMkNBQTJDO0FBQzNDLG1DQUFtQztBQUNuQyxlQUFlO0FBQ2Ysd0RBQXdEO0FBQ3hELGtDQUFrQztBQUNsQywwQ0FBMEM7QUFDMUMsa0RBQWtEO0FBQ2xELHFEQUFxRDtBQUNyRCx3Q0FBd0M7QUFDeEMsNEJBQTRCO0FBQzVCLDZCQUE2QjtBQUM3QixrQ0FBa0M7QUFDbEMsU0FBUztBQUNULDBEQUEwRDtBQUMxRCxtREFBbUQ7QUFDbkQsbUNBQW1DO0FBQ25DLE1BQU07QUFDTixnQkFBZ0I7QUFDaEIsTUFBTTtBQUVOLDJCQUEyQjtBQUMzQixNQUFNLENBQUMsR0FBRyxDQUNSLGVBQUssQ0FBQyxlQUFlLEVBQUU7SUFDckIsTUFBTSxFQUFFLGtCQUFrQjtJQUMxQixPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQztJQUMxRCxZQUFZLEVBQUUsSUFBSTtDQUNuQixDQUFDLENBQ0gsQ0FBQztBQUVGLHlCQUF5QjtBQUN6QixNQUFNLENBQUMsR0FBRyxDQUNSLGVBQUssQ0FBQyxhQUFhLEVBQUU7SUFDbkIsTUFBTSxFQUFFLGlCQUFpQjtJQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQztJQUNuRCxZQUFZLEVBQUUsSUFBSTtDQUNuQixDQUFDLENBQ0gsQ0FBQztBQUVGLGtCQUFlLE1BQU0sQ0FBQyJ9