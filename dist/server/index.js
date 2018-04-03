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
    target: 'http://localhost:8080',
    rewrite: path => path.replace(/\/_\/ipfs\/files/, '/ipfs'),
    changeOrigin: true,
}));
// The proxy for ipfs api
server.use(proxy_1.default('/_/ipfs/api', {
    target: 'http://localhost:5001',
    rewrite: path => path.replace(/\/_\/ipfs\/api/, ''),
    changeOrigin: true,
}));
exports.default = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUE0QjtBQUM1QiwyQkFBMkI7QUFDM0Isd0NBQXdDO0FBQ3hDLDhCQUE4QjtBQUM5QixpQ0FBaUM7QUFDakMsc0NBQXNDO0FBQ3RDLHVDQUF1QztBQUN2QyxtQ0FBMkM7QUFDM0MscUNBQTZDO0FBRzdDLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFFekIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNuQixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFaEUsNEJBQTRCO0FBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBRWhDLG9DQUFvQztBQUNwQywyQ0FBMkM7QUFDM0MsNERBQTREO0FBQzVELHFDQUFxQztBQUNyQyx5RUFBeUU7QUFDekUsNERBQTREO0FBQzVELHdFQUF3RTtBQUN4RSxtREFBbUQ7QUFDbkQsdUJBQXVCO0FBQ3ZCLG9EQUFvRDtBQUNwRCxtRUFBbUU7QUFDbkUsa0VBQWtFO0FBQ2xFLHFEQUFxRDtBQUNyRCwyQ0FBMkM7QUFDM0MsbUNBQW1DO0FBQ25DLGVBQWU7QUFDZix3REFBd0Q7QUFDeEQsa0NBQWtDO0FBQ2xDLDBDQUEwQztBQUMxQyxrREFBa0Q7QUFDbEQscURBQXFEO0FBQ3JELHdDQUF3QztBQUN4Qyw0QkFBNEI7QUFDNUIsNkJBQTZCO0FBQzdCLGtDQUFrQztBQUNsQyxTQUFTO0FBQ1QsMERBQTBEO0FBQzFELG1EQUFtRDtBQUNuRCxtQ0FBbUM7QUFDbkMsTUFBTTtBQUNOLGdCQUFnQjtBQUNoQixNQUFNO0FBRU4sMkJBQTJCO0FBQzNCLE1BQU0sQ0FBQyxHQUFHLENBQ1IsZUFBSyxDQUFDLGVBQWUsRUFBRTtJQUNyQixNQUFNLEVBQUUsdUJBQXVCO0lBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDO0lBQzFELFlBQVksRUFBRSxJQUFJO0NBQ25CLENBQUMsQ0FDSCxDQUFDO0FBRUYseUJBQXlCO0FBQ3pCLE1BQU0sQ0FBQyxHQUFHLENBQ1IsZUFBSyxDQUFDLGFBQWEsRUFBRTtJQUNuQixNQUFNLEVBQUUsdUJBQXVCO0lBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDO0lBQ25ELFlBQVksRUFBRSxJQUFJO0NBQ25CLENBQUMsQ0FDSCxDQUFDO0FBRUYsa0JBQWUsTUFBTSxDQUFDIn0=