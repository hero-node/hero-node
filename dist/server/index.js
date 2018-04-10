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
const ETH_SIDE_WEB3 = process.env.ETH_SIDE_WEB3 || 'http://localhost:9002';
const server = new Koa();
server.use(convert(body()));
server.use(cors());
server.use(view(path_1.join(__dirname, '../..', '/public/views')));
server.use(kstatic(path_1.join(__dirname, '../..', '/public/assets')));
// server.use(bodyparser());
server.use(router_1.default.routes());
server.use(router_1.default.allowedMethods());
server.use(router_1.default.middleware());
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
// side chain rpc proxy
server.use(proxy_1.default('/eth/zeus', {
    target: ETH_SIDE_WEB3,
    changeOrigin: true,
}));
exports.default = server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUE0QjtBQUM1QiwyQkFBMkI7QUFDM0Isd0NBQXdDO0FBQ3hDLDhCQUE4QjtBQUM5QixpQ0FBaUM7QUFDakMsc0NBQXNDO0FBQ3RDLHVDQUF1QztBQUN2QyxtQ0FBMkM7QUFDM0MscUNBQTZDO0FBRTdDLE1BQU0sa0JBQWtCLEdBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLElBQUksdUJBQXVCLENBQUM7QUFDNUQsTUFBTSxpQkFBaUIsR0FDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSx1QkFBdUIsQ0FBQztBQUMzRCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSx1QkFBdUIsQ0FBQztBQUMzRSxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRXpCLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRWhFLDRCQUE0QjtBQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztBQUVoQywyQkFBMkI7QUFDM0IsTUFBTSxDQUFDLEdBQUcsQ0FDUixlQUFLLENBQUMsZUFBZSxFQUFFO0lBQ3JCLE1BQU0sRUFBRSxrQkFBa0I7SUFDMUIsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUM7SUFDMUQsWUFBWSxFQUFFLElBQUk7Q0FDbkIsQ0FBQyxDQUNILENBQUM7QUFFRix5QkFBeUI7QUFDekIsTUFBTSxDQUFDLEdBQUcsQ0FDUixlQUFLLENBQUMsYUFBYSxFQUFFO0lBQ25CLE1BQU0sRUFBRSxpQkFBaUI7SUFDekIsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUM7SUFDbkQsWUFBWSxFQUFFLElBQUk7Q0FDbkIsQ0FBQyxDQUNILENBQUM7QUFFRix1QkFBdUI7QUFDdkIsTUFBTSxDQUFDLEdBQUcsQ0FDUixlQUFLLENBQUMsV0FBVyxFQUFFO0lBQ2pCLE1BQU0sRUFBRSxhQUFhO0lBQ3JCLFlBQVksRUFBRSxJQUFJO0NBQ25CLENBQUMsQ0FDSCxDQUFDO0FBRUYsa0JBQWUsTUFBTSxDQUFDIn0=