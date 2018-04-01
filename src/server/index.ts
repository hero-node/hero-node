import { join } from 'path';
import * as Koa from 'koa';
import * as body from 'koa-better-body';
import * as cors from 'kcors';
import * as view from 'koa-view';
import * as kstatic from 'koa-static';
import * as convert from 'koa-convert';
import { default as proxy } from './proxy';
import { default as router } from './router';
// import { request, RequestOptions } from 'urllib';
import * as _ from 'lodash';
import { LoggerFactory } from '../utils/logger';
import dotenv from 'dotenv';
// import * as Proxy from 'koa-proxy';

const MAX_TIMEOUT = 3000000;
const logger = LoggerFactory.getLabeledInstance('server');
const server = new Koa();
// server.use(Proxy({
//   host: 'http://localhost:5001',
//   match: /^\/static\//
// }))

server.use(convert(body()));
server.use(cors());
server.use(view(join(__dirname, '../..', '/public/views')));
server.use(kstatic(join(__dirname, '../..', '/public/assets')));

// server.use(bodyparser());
server.use(router.routes());
server.use(router.allowedMethods());
server.use(router.middleware());

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
server.use(
  proxy('/_/ipfs/files', {
    target: 'http://localhost:8080',
    rewrite: path => path.replace(/\/_\/ipfs\/files/, '/ipfs'),
  }),
);
server.use(
  proxy('/_/ipfs/api', {
    target: 'http://localhost:5001',
    rewrite: path => path.replace(/\/_\/ipfs\/api/, '/'),
  }),
);

export default server;
