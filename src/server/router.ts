const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello, Heronode!';
  await next();
});

export default router;
