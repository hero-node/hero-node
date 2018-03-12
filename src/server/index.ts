import * as Koa from 'koa';

const server = new Koa();
server.use(async (ctx, next) => {
  ctx.body = 'hello, heronode!';
  await next();
});

export default server;
