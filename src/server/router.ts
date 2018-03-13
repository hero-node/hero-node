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

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello, Heronode!';
  await next();
});

router.post('/api/ipfs/upload/raw', async (ctx, next) => {
  const body = ctx.request.body;
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
  console.log(resp);
  ctx.body = resp;
  await next;
});

export default router;
