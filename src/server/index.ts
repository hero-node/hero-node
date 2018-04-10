import { join } from 'path';
import * as Koa from 'koa';
import * as body from 'koa-better-body';
import * as cors from 'kcors';
import * as view from 'koa-view';
import * as kstatic from 'koa-static';
import * as convert from 'koa-convert';
import { default as proxy } from './proxy';
import { default as router } from './router';

const IPFS_FILE_ENDPOINT =
  process.env.IPFS_FILE_ENDPOINT || 'http://localhost:8080';
const IPFS_API_ENDPOINT =
  process.env.IPFS_API_ENDPOINT || 'http://localhost:5001';
const ETH_SIDE_WEB3 = process.env.ETH_SIDE_WEB3 || 'http://localhost:9002';
const server = new Koa();

server.use(convert(body()));
server.use(cors());
server.use(view(join(__dirname, '../..', '/public/views')));
server.use(kstatic(join(__dirname, '../..', '/public/assets')));

// server.use(bodyparser());
server.use(router.routes());
server.use(router.allowedMethods());
server.use(router.middleware());

// The proxy for ipfs files
server.use(
  proxy('/_/ipfs/files', {
    target: IPFS_FILE_ENDPOINT,
    rewrite: path => path.replace(/\/_\/ipfs\/files/, '/ipfs'),
    changeOrigin: true,
  }),
);

// The proxy for ipfs api
server.use(
  proxy('/_/ipfs/api', {
    target: IPFS_API_ENDPOINT,
    rewrite: path => path.replace(/\/_\/ipfs\/api/, ''),
    changeOrigin: true,
  }),
);

// side chain rpc proxy
server.use(
  proxy('/eth/zeus', {
    target: ETH_SIDE_WEB3,
    changeOrigin: true,
  }),
);

export default server;
