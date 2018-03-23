import * as Koa from 'koa';
// import * as bodyparser from 'koa-bodyparser';
import * as body from 'koa-better-body';
import * as cors from 'kcors';
import { default as router } from './router';
import { request, RequestOptions } from 'urllib';
import * as _ from 'lodash';
// import * as Proxy from 'koa-proxy';

const server = new Koa();
// server.use(Proxy({
//   host: 'http://localhost:5001',
//   match: /^\/static\//
// }))

server.use(body());
server.use(cors());

server.use(async (ctx, next) => {
  if (ctx.path.startsWith('/ipfs')) {
    const ipfsFileUrl = `http://localhost:8080${ctx.path}`;
    const resp = await request(ipfsFileUrl);
    const rawFile: Buffer = _.get(resp, 'data');
    ctx.body = rawFile.toString();
  } else if (ctx.path.startsWith('/ethzeus')) {
    const ethWeb3ApiUrl = `http://localhost:9002`;
    const options: RequestOptions = {
      method: ctx.method,
      contentType: 'json',
      data: ctx.request.fields,
    };
    const resp = await request(ethWeb3ApiUrl, options);
    const data = _.get(resp, 'data').toString();
    ctx.body = JSON.parse(data);
  }
  await next;
});

// server.use(bodyparser());
server.use(router.routes());
server.use(router.allowedMethods());
server.use(router.middleware());

export default server;
