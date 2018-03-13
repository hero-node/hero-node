import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import { default as router } from './router';
import { request } from 'urllib';
import * as _ from 'lodash';
// import * as Proxy from 'koa-proxy';

const server = new Koa();
// server.use(Proxy({
//   host: 'http://localhost:5001',
//   match: /^\/static\//
// }))
server.use(bodyparser());
server.use(router.routes());
server.use(router.allowedMethods());
server.use(async (ctx, next) => {
  if (ctx.path.startsWith('/ipfs')) {
    const ipfsFileUrl = `http://localhost:8080${ctx.path}`;
    const resp = await request(ipfsFileUrl);
    const rawFile: Buffer = _.get(resp, 'data');
    ctx.body = rawFile.toString();
  }
  await next;
});

export default server;
