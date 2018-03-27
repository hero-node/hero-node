import * as Koa from 'koa';
// import * as bodyparser from 'koa-bodyparser';
import * as body from 'koa-better-body';
import * as cors from 'kcors';
import { default as router } from './router';
import { request, RequestOptions } from 'urllib';
import * as _ from 'lodash';
import { LoggerFactory } from '../utils/logger';
// import * as Proxy from 'koa-proxy';

const MAX_TIMEOUT = 300000;
const logger = LoggerFactory.getLabeledInstance('server', 'index');
const server = new Koa();
// server.use(Proxy({
//   host: 'http://localhost:5001',
//   match: /^\/static\//
// }))

server.use(body());
server.use(cors());

server.use(async (ctx, next) => {
  if (ctx.path.startsWith('/ipfsapi')) {
    const handledPath = ctx.path.replace('/ipfsapi', '');
    const query = ctx.querystring;
    const ipfsApiUrl = `http://localhost:5001${handledPath}?${query}`;
    logger.info(`proxy to ipfs:5001 with ${ipfsApiUrl}`);
    const resp = await request(ipfsApiUrl, { timeout: MAX_TIMEOUT });
    const data = _.get(resp, 'data').toString();
    ctx.body = data;
  } else if (ctx.path.startsWith('/ipfs')) {
    const ipfsFileUrl = `http://localhost:8080${ctx.path}`;
    logger.info(`proxy to ipfs:8080 with ${ipfsFileUrl}`);
    const resp = await request(ipfsFileUrl, { timeout: MAX_TIMEOUT });
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
