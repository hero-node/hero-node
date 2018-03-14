import { readFile } from 'fs';
import { promisify } from 'util';
import * as _ from 'lodash';

const Router = require('koa-router');
const IPFS = require('ipfs-api');

const router = new Router();
const ipfs = IPFS({
  host: 'localhost',
  port: 5001,
  protocol: 'http',
});
const uploadAsync = promisify(ipfs.files.add);
const readFileAsync = promisify(readFile);

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello, Heronode!';
  await next();
});

router.post('/api/ipfs/upload/raw', async (ctx, next) => {
  const body = ctx.request.fields;
  const content = _.get(body, 'content');
  if (!content) {
    console.log('body content is empty!');
    ctx.status = 500;
    ctx.body = 'please make sure content field is not empty';
    await next;
    return;
  }
  console.log(`uploading content: ${content}`);
  const resp = await uploadAsync(Buffer.from(content));
  ctx.body = resp;
  await next;
});

router.post('/api/ipfs/upload/file', async (ctx, next) => {
  const body = _.head(_.values(ctx.request.fields));
  const filePath = _.get(_.head(body), 'path');
  console.log(`uploading content with path: ${filePath}`);
  const fileContent = await readFileAsync(filePath);
  const resp = await uploadAsync(fileContent);
  ctx.body = resp;
  await next;
});

export default router;
